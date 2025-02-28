import React, {useEffect, useState} from "react";
import LoadingIcon from "../../../icons/loading.svg";
import {useNavigate} from "react-router";
import {CommentCreator} from "./CommentCreator.jsx";
import {Comment} from "./Comment.jsx";

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
