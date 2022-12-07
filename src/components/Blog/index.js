import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import {DateTime} from "luxon";
import LoadingIcon from "../../icons/loading.svg";
import CommentSection from "./CommentSection";

function PostFull({postid, setPostExists}) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [post, setPost] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/posts/${postid}`)
            .then((res) => res.json())
            .then((result) => {
                setIsLoaded(true);
                setPost(result);
                if (result !== null) {
                    setPostExists(true);
                }
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, []);

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
                    <p>Loading Post...</p>
                </div>
            </div>
        )
    } else if (post === undefined) {
        return (
            <div className="no-content-main">
                <div className="no-content-container">
                    <h2>No post found</h2>
                </div>
            </div>
        )
    } else {
        return(
            <div className="post-full">
                <div className="info-box">
                    <div className="author-box">
                        <img className="author-avatar-full" src={post.author.avatar.url}/>
                        <h4>{post.author.first_name + " " + post.author.last_name}</h4>
                    </div>
                    <h4 className="post-timestamp">
                        <span className="post-timestamp-original">{DateTime.fromJSDate(new Date(post.timestamp)).toLocaleString(DateTime.DATE_MED)}</span>
                        {post.edit_timestamp&&"*"}
                        {post.edit_timestamp&&<span className="post-timestamp-edit-tooltip"><p className="p-edit-timestamp">{"Edited: "+DateTime.fromJSDate(new Date(post.edit_timestamp)).toLocaleString(DateTime.DATETIME_SHORT)}</p></span>}
                    </h4>
                </div>
                <img className="post-cover-photo" src={post.photo.url}/>
                <div className="post-text-container" dangerouslySetInnerHTML={{__html: post.content}}></div>
            </div>
        )
    }
}

export default function BlogMain({user}) {
    const { postid } = useParams();
    const [postExists, setPostExists] = useState(false);

    return(
        <main className="blog-main">
            <PostFull postid={postid} setPostExists={setPostExists}/>
            <CommentSection postid={postid} user={user} postExists={postExists}/>
        </main>
    )
}