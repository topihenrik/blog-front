import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { DateTime } from "luxon";
import LoadingIcon from "../../icons/loading.svg"

function PostCard({post, count}) {
    return(
        <div className="post-card-del">
            <div className="post-card-del-container">
                <div className="del-post-box-left">
                    <div className="del-info-box">
                        <div className="del-author-box">
                            <img className="del-author-avatar-card" src={post.author.avatar.url}/>
                            <h3>{post.author.first_name + " " + post.author.last_name}</h3>
                        </div>
                        
                        <h3>{DateTime.fromJSDate(new Date(post.timestamp)).toLocaleString(DateTime.DATE_MED)}</h3>
                    </div>
                    <h2>{post.title}</h2>
                    <p className="del-post-description">{post.description.split(' ').slice(0, 28).join(' ') + "..."}</p>
                    <p className="del-post-comments-count">{count + " comments"}</p>
                </div>
                <div className="del-post-box-right">
                    <img className="del-photo-thumbnail" src={post.photo.url}/>
                </div>
            </div>
        </div>
    )
}

export default function DeletePost({user}) {
    const { postid } = useParams();
    const navigate = useNavigate();
    
    const [error1, setError1] = useState(null);
    const [isLoaded1, setIsLoaded1] = useState(false);
    const [post, setPost] = useState([]);
    const [count, setCount] = useState(0);
    
    const [error2, setError2] = useState(null);
    const [isLoaded2, setIsLoaded2] = useState(false);
    const [result, setResult] = useState({});

    const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false); // During fetch request -> disable submit button

    useEffect(() => {
        if (!user) {
            navigate("../login", {replace: true});
        }

        const bearer = "Bearer " + localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}/auth/posts/${postid}`,
            {
                headers: {
                    "Authorization": bearer
                }
            })
            .then((res) => res.json())
            .then((result) => {
                setIsLoaded1(true);
                setPost(result);
                setCount(result.count);
            },
            (error) => {
                setIsLoaded1(true);
                setError1(error);
            }
        )
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitBtnDisabled(true);
        const bearer = "Bearer " + localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}/auth/posts/${postid}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": bearer
                },
                body: new URLSearchParams({confirmation: e.target.confirmation.value})
            })
            .then((res) => {
                if (res.status === 200) {
                    navigate("/edit", {replace: true});
                }
                return res.json();
            })
            .then((result) => {
                setIsLoaded2(true);
                setResult(result);
                setSubmitBtnDisabled(false);
            },
            (error) => {
                setIsLoaded2(true);
                setError2(error);
                setSubmitBtnDisabled(false);
            })
    }

    if (error1) {
        return (
            <div className="error-main">
                <div className="error-container">
                    <h2>Error</h2>
                    <p>{error1.message}</p>
                </div>
            </div>
        )
    } else if (!isLoaded1) {
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
            <main className="delete-post">
                <div className="delete-post-box">
                    <h2>Are you sure you want to delete this post?</h2>
                    <PostCard post={post} count={count}/>
                    <form className="delete-form" onSubmit={handleSubmit}>
                        <label className="delete-label" htmlFor="confirmation">To delete the post, type the title to confirm</label>
                        {(result.status >= 400 && result.status <= 451)  &&
                        <div className="error-box">
                            <p>{result.message}</p>
                        </div>}
                        <div className="delete-form-div">
                            <input className="delete-input" name="confirmation" id="confirmation" type="text"/>
                            <button className="delete-button" disabled={submitBtnDisabled} style={submitBtnDisabled?{cursor: "wait"}:{}}>Delete</button>
                        </div>
                    </form>
                </div>
            </main>
        )
    }
}
