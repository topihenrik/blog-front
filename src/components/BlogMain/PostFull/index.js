import React, { useEffect, useState } from "react";
import {DateTime} from "luxon";

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
                    <div className="author-box">
                        <img className="author-avatar-full" src={"http://localhost:3000/"+post.author.avatar.path}/>
                        <h3>{post.author.first_name + " " + post.author.last_name}</h3>
                    </div>
                    <h3>{DateTime.fromJSDate(new Date(post.timestamp)).toLocaleString(DateTime.DATETIME_SHORT)}</h3>
                </div>
                <img src={"http://localhost:3000/"+post.photo.path}/>
                {post.edit_timestamp?<p>{"Edited: "+DateTime.fromJSDate(new Date(post.edit_timestamp)).toLocaleString(DateTime.DATETIME_SHORT)}</p>:<></>}
                <div dangerouslySetInnerHTML={{__html: post.content}}></div>
            </div>
        )

    }


    
}