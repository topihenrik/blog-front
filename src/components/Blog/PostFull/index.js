import React, { useEffect, useState } from "react";
import {DateTime} from "luxon";
import LoadingIcon from "../../../icons/loading.svg"

export default function PostFull(props) {
    const { postid, setPostExists } = props;
    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [post, setPost] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/posts/${postid}`)
            .then((res) => res.json())
            .then((result) => {
                setIsLoaded(true);
                setPost(result.post_list);
                if (result.post_list !== undefined) {
                    setPostExists(true);
                }
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [])


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
                    <p>Loading Post...</p>
                </div>
            </div>
        )
    } else if (post === undefined) {
        return (
            <div className="noContentMain">
                <div className="no-content-container">
                    <h2>No post found</h2>
                </div>
            </div>
        )
    } else {
        console.log(post);
        return(
            <div className="postFull">
                <div className="info-box">
                    <div className="author-box">
                        <img className="author-avatar-full" src={"http://localhost:3000/"+post.author.avatar.path}/>
                        <h4>{post.author.first_name + " " + post.author.last_name}</h4>
                    </div>
                    <h4 className="post-timestamp">
                        <span className="post-timestamp-original">{DateTime.fromJSDate(new Date(post.timestamp)).toLocaleString(DateTime.DATE_MED)}</span>
                        {post.edit_timestamp&&"*"}
                        {post.edit_timestamp&&<span className="post-timestamp-edit-tooltip"><p className="p-edit-timestamp">{"Edited: "+DateTime.fromJSDate(new Date(post.edit_timestamp)).toLocaleString(DateTime.DATETIME_SHORT)}</p></span>}
                    </h4>
                </div>
                <img src={"http://localhost:3000/"+post.photo.path}/>
                <div dangerouslySetInnerHTML={{__html: post.content}}></div>
            </div>
        )

    }


    
}