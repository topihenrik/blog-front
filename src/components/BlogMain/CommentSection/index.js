import React, {useEffect, useState} from "react";
import Comment from "./Comment";

export default function CommentSection(props) {
    const { postid } = props;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [comments, setComments] = useState([]);
    

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
    }, [])



    if (error) {
        return <div>Error: {error.message}</div>
    } else if (comments === undefined) {
        return <div>No comments!</div>
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else {
        return(
            <div className="commentSection">
                {comments.map((comment) => {
                    return(
                        <section key={comment._id}>
                            <Comment comment={comment}/>
                        </section>
                    )
                })}
            </div>
        )
    }


    
}