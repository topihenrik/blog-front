import React, { useEffect, useState } from "react";

export default function PostFull(props) {
    const { postid } = props;
    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [post, setPost] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/posts/${postid}`)
            .then((res) => res.json())
            .then((result) => {
                setIsLoaded(true);
                setPost(result.post_list);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [])


    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else if (post === undefined) {
        return <div>No post!</div>
    } else {
        console.log(post);
        return(
            <div className="postFull">
                <h2>{post.title}</h2>
                <div className="info-box">
                    <h3>{post.author.first_name + " " + post.author.last_name}</h3>
                    <h3>{post.timestamp}</h3>
                </div>
                <p>{post.content}</p>
            </div>
        )

    }


    
}