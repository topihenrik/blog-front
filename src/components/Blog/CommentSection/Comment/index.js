import React, { useState } from "react";
import {DateTime} from "luxon";
import EditIcon from "../../../../icons/edit.png"
import DeleteIcon from "../../../../icons/delete.png"
import CancelIcon from "../../../../icons/cancel.png";

export default function Comment(props) {
    const { postid, comment, user, updateComments, setUpdateComments } = props;
    const [edit, setEdit] = useState(false);

    const handleClickEdit = () => {
        (edit === false?setEdit(true):setEdit(false))
    }

    const handleClickDelete = () => {

        const bearer = "Bearer " + localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}/auth/posts/${postid}/comments/${comment._id}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": bearer
                }
            })
            .then((res) => res.json())
            .then((result) => {
                if (result.status === 200) {
                    setUpdateComments(updateComments+1);
                }
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const bearer = "Bearer " + localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}/auth/posts/${postid}/comments/${comment._id}`,
            {
                method: "PUT",
                headers: {
                    "Authorization": bearer
                },
                body: new URLSearchParams({content: e.target.content.value})
            })
            .then((res) => res.json())
            .then((result) => {
                if (result.status === 200) {
                    setEdit(false);
                    setUpdateComments(updateComments+1);
                }
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
                        <img className="author-avatar-comment" src={`${process.env.REACT_APP_API_URL}/`+comment.author.avatar.path}/>
                        <h4>{comment.author.first_name + " " + comment.author.last_name}</h4>
                    </div>
                    <h4 className="comment-timestamp">
                        <span className="comment-timestamp-original">{DateTime.fromJSDate(new Date(comment.timestamp)).toLocaleString(DateTime.DATETIME_SHORT)}</span>
                        {comment.edit_timestamp&&"*"}
                        {comment.edit_timestamp?<span className="comment-timestamp-edit-tooltip"><p className="p-edit-timestamp">{"Edited: "+DateTime.fromJSDate(new Date(comment.edit_timestamp)).toLocaleString(DateTime.DATETIME_SHORT)}</p></span>:<></>}
                    </h4>
                </div>
                <p>{comment.content}</p>
                {(user?._id === comment.author._id)&&
                <div className="comment-modification-buttons">
                    <button className="comment-modification-button" onClick={handleClickEdit}><img className="icon" src={EditIcon}/>Edit</button>
                    <button className="comment-modification-button" onClick={handleClickDelete}><img className="icon" src={DeleteIcon}/>Delete</button>
                </div>}  
            </div>
        )
    } else {
        return(
            <div className="comment">
                <div className="info-box">
                    <div className="author-box">
                        <img className="author-avatar-comment" src={`${process.env.REACT_APP_API_URL}/`+comment.author.avatar.path}/>
                        <h3>{comment.author.first_name + " " + comment.author.last_name}</h3>
                    </div>
                    <h4>{DateTime.fromJSDate(new Date(comment.timestamp)).toLocaleString(DateTime.DATETIME_SHORT)}</h4>
                </div>
                <form className="comment-creator-form" onSubmit={handleSubmit}>
                    <textarea name="content" defaultValue={comment.content} id="comment-creator-textarea"></textarea>
                    <div className="comment-creator-buttons">
                        <button className="comment-modification-button" type="submit"><img className="icon" src={EditIcon}/>Update</button>
                        <button className="comment-modification-button" type="button" onClick={handleCancel}><img className="icon" src={CancelIcon}/>Cancel</button>
                    </div>   
                </form>
            </div>
        )

    }

    
}