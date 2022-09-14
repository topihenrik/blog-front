import React, {useEffect, useState} from "react";
import Comment from "./Comment";
import CommentCreator from "./CommentCreator";

export default function CommentSection(props) {
    const { postid, user } = props;
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
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else {
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
    }
}