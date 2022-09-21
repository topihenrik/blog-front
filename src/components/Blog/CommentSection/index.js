import React, {useEffect, useState} from "react";
import Comment from "./Comment";
import CommentCreator from "./CommentCreator";
import LoadingIcon from "../../../icons/loading.svg"

export default function CommentSection(props) {
    const { postid, user, postExists } = props;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [comments, setComments] = useState();

    const [updateComments, setUpdateComments] = useState(0);
    
    useEffect(() => {
        fetch(`http://localhost:3000/posts/${postid}/comments`)
            .then((res) => res.json())
            .then((result) => {
                setIsLoaded(true);
                setComments(result.comment_list);
            },
            (error) => {
                setIsLoaded(true);
                setError(error)
            }
        )
    }, [updateComments])

    if (error) {
        return (
            <div className="errorMain">
                <div className="error-container">
                    <h2>Error</h2>
                    <p>{error.message}</p>
                </div>
            </div>
        )
    } else if (!isLoaded) {
        return (
            <div className="loadingMain">
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
                <div className="commentSection">
                    <h2>Responses</h2>
                    {comments?
                    comments.map((comment) => {
                        return(
                            <>
                                <section key={comment._id}>
                                    <Comment postid={postid} comment={comment} user={user} updateComments={updateComments} setUpdateComments={setUpdateComments}/>
                                </section>
                                <hr className="comment-hr"/>
                            </>
                        )
                    }):<></>}
                    
                    {localStorage.getItem("token")!==null ?
                        <CommentCreator postid={postid} user={user} updateComments={updateComments} setUpdateComments={setUpdateComments}/> : 
                        <div className="new-comment">
                            <a href="/login"><h3>Log In to Create a New Comment</h3></a>
                        </div>
                    }
                </div>
            )
        } else {
            return(<></>)
        }
    }
}