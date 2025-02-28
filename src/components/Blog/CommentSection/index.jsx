import React, {useEffect, useState} from "react";
import { DateTime } from "luxon";
import LoadingIcon from "../../../icons/loading.svg";
import EditIcon from "../../../icons/edit.png"
import DeleteIcon from "../../../icons/delete.png"
import CancelIcon from "../../../icons/cancel.png";
import AddIcon from "../../../icons/add.png";
import {useNavigate} from "react-router";

function Comment({postid, comment, user, updateComments, setUpdateComments}) {
    const [edit, setEdit] = useState(false);
    const [submitDelBtnDisabled, setSubmitDelBtnDisabled] = useState(false); // During fetch request -> disable submit button
    const [submitEditBtnDisabled, setSubmitEditBtnDisabled] = useState(false); // During fetch request -> disable submit button

    const handleClickEdit = () => {
        (edit === false?setEdit(true):setEdit(false))
    }

    const handleClickDelete = () => {
        setSubmitDelBtnDisabled(true);
        const bearer = "Bearer " + localStorage.getItem("token");
        fetch(`${import.meta.env.VITE_API_URL}/auth/posts/${postid}/comments/${comment._id}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": bearer
                }
            })
            .then((res) => {
                if (res.status === 200) {
                    setUpdateComments(updateComments+1);
                }
                return res.json()
            })
            .then(() => {
                setSubmitDelBtnDisabled(false);
            }, (error) => {
                console.error(error);
                setSubmitDelBtnDisabled(false);
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitEditBtnDisabled(true);
        const bearer = "Bearer " + localStorage.getItem("token");
        fetch(`${import.meta.env.VITE_API_URL}/auth/posts/${postid}/comments/${comment._id}`,
            {
                method: "PUT",
                headers: {
                    "Authorization": bearer
                },
                body: new URLSearchParams({content: e.target.content.value})
            })
            .then((res) => {
                if (res.status === 200) {
                    setEdit(false);
                    setUpdateComments(updateComments+1);
                }
                return res.json()
            })
            .then(() => {
                setSubmitEditBtnDisabled(false);
            }, (error) => {
                console.error(error);
                setSubmitEditBtnDisabled(false);
            })
    }

    const handleCancel = (e) => {
        setEdit(false);
    }

    if (!edit) {
        return(
            <div className="comment">
                <div className="info-box">
                    <div className="author-box">
                        <img className="author-avatar-comment" src={comment.author.avatar.url}/>
                        <h4>{comment.author.first_name + " " + comment.author.last_name}</h4>
                    </div>
                    <h4 className="comment-timestamp">
                        <span className="comment-timestamp-original">{DateTime.fromJSDate(new Date(comment.timestamp)).toLocaleString(DateTime.DATETIME_SHORT)}</span>
                        {comment.edit_timestamp&&"*"}
                        {comment.edit_timestamp?<span className="comment-timestamp-edit-tooltip"><p className="p-edit-timestamp">{"Edited: "+DateTime.fromJSDate(new Date(comment.edit_timestamp)).toLocaleString(DateTime.DATETIME_SHORT)}</p></span>:<></>}
                    </h4>
                </div>
                <p className="comment-text">{comment.content}</p>
                {(user?._id === comment.author._id)&&
                <div className="comment-modification-buttons">
                    <button className="comment-modification-button" onClick={handleClickEdit}><img className="icon" src={EditIcon}/>Edit</button>
                    <button className="comment-modification-button" onClick={handleClickDelete} disabled={submitDelBtnDisabled} style={submitDelBtnDisabled?{cursor: "wait"}:{}}><img className="icon" src={DeleteIcon}/>Delete</button>
                </div>}
            </div>
        )
    } else {
        return(
            <div className="comment">
                <div className="info-box">
                    <div className="author-box">
                        <img className="author-avatar-comment" src={comment.author.avatar.url}/>
                        <h3>{comment.author.first_name + " " + comment.author.last_name}</h3>
                    </div>
                    <h4>{DateTime.fromJSDate(new Date(comment.timestamp)).toLocaleString(DateTime.DATETIME_SHORT)}</h4>
                </div>
                <form className="comment-creator-form" onSubmit={handleSubmit}>
                    <textarea name="content" defaultValue={comment.content} id="comment-creator-textarea"></textarea>
                    <div className="comment-creator-buttons">
                        <button className="comment-modification-button" type="submit" disabled={submitEditBtnDisabled} style={submitEditBtnDisabled?{cursor: "wait"}:{}}><img className="icon" src={EditIcon}/>Update</button>
                        <button className="comment-modification-button" type="button" onClick={handleCancel} disabled={submitEditBtnDisabled} style={submitEditBtnDisabled?{cursor: "wait"}:{}}><img className="icon" src={CancelIcon}/>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}

function CommentCreator({postid, user, updateComments, setUpdateComments}) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [result, setResult] = useState({});
    const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false); // During fetch request -> disable submit button

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitBtnDisabled(true);
        const bearer = "Bearer " + localStorage.getItem("token");
        fetch(`${import.meta.env.VITE_API_URL}/auth/posts/${postid}/comments`,
            {
                method: "POST",
                headers: {
                    "Authorization": bearer,
                    "Content-Type": "application/x-www-form-urlencoded"},
                body: new URLSearchParams({content: e.target.content.value})
            })
            .then((res) => {
                if (res.status === 201) {
                    setUpdateComments(updateComments+1);
                    e.target.reset();
                }
                return res.json()
            })
            .then((result) => {
                setIsLoaded(true);
                setResult(result);
                setSubmitBtnDisabled(false);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
                setSubmitBtnDisabled(false);
            })
    }

    return(
        <div className="comment-creator">
            <h3>Author: {user.full_name}</h3>
            <form className="comment-creator-form" onSubmit={handleSubmit}>
                <textarea name="content" placeholder="Comment" id="comment-creator-textarea"></textarea>
                <button className="comment-creator-button" disabled={submitBtnDisabled} style={submitBtnDisabled?{cursor: "wait"}:{}}><img className="icon" src={AddIcon}/>Submit</button>
            </form>
        </div>
    )
}

export function CommentSection({postid, user, postExists}) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [comments, setComments] = useState();
    const [updateComments, setUpdateComments] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/posts/${postid}/comments`)
            .then((res) => res.json())
            .then((result) => {
                setIsLoaded(true);
                setComments(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error)
            }
        )
    }, [updateComments]);

    if (error) {
        return (
            <div className="error-main">
                <div className="error-container">
                    <h2>Error</h2>
                    <p>{error.message}</p>
                </div>
            </div>
        )
    } else if (!isLoaded) {
        return (
            <div className="loading-main">
                <div className="loading-container">
                    <div className="loading-icon-box">
                        <img id="loading-icon" src={LoadingIcon}/>
                    </div>
                    <p>Loading Comments...</p>
                </div>
            </div>
        )
    } else {
        if (postExists) {
            return(
                <div className="comment-section">
                    <h2>Responses</h2>
                    {comments?
                    comments.map((comment) => {
                        return(
                            <React.Fragment key={comment._id}>
                                <Comment postid={postid} comment={comment} user={user} updateComments={updateComments} setUpdateComments={setUpdateComments}/>
                                <hr className="comment-hr"/>
                            </React.Fragment>
                        )
                    }):<></>}

                    {localStorage.getItem("token")!==null ?
                        <CommentCreator postid={postid} user={user} updateComments={updateComments} setUpdateComments={setUpdateComments}/> :
                        <div className="new-comment">
                            <button onClick={() => navigate('/login')}><h3>Log In to Create a New Comment</h3></button>
                        </div>
                    }
                </div>
            )
        } else {
            return(<></>)
        }
    }
}
