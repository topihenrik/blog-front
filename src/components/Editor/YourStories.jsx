import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router';
import addIcon from "../../icons/add.png";
import LoadingIcon from "../../icons/loading.svg"
import {HeroScreen} from "./HeroScreen.jsx";

export function YourStories({user}) {
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState({});

    useEffect(() => {
        if (!user) {
            navigate("/login", {replace: false});
        }

        const bearer = "Bearer " + localStorage.getItem("token");
        fetch(`${import.meta.env.VITE_API_URL}/auth/posts/author`,
            {
                method: "GET",
                headers: {
                    "Authorization": bearer
                }
            })
            .then((res) => res.json())
            .then((result) => {
                setIsLoaded(true);
                setPosts(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            })
    }, [])

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
                <HeroScreen/>
                <div className="loading-container">
                    <div className="loading-icon-box">
                        <img id="loading-icon" src={LoadingIcon}/>
                    </div>
                    <p>Loading Posts...</p>
                </div>
            </div>
        )
    } else if (posts.length === 0) {
        return (
            <div className="no-content-main">
                <HeroScreen/>
                <div className="no-content-container">
                    <div className="post-create-box">
                        <a><button onClick={() => navigate('/post/create')} id="newPostBtn"><img id="add-icon" src={addIcon}/>New Post</button></a>
                    </div>
                    <h2>No posts found</h2>
                    <p>🥇 Share your ideas and make your first post!</p>
                </div>
            </div>
        )
    } else {
        return(
            <main className="edit-home-main">
                <HeroScreen/>
                <div className="edit-posts-box">
                    <div className="edit-post-create-box">
                        <a><button onClick={() => navigate('/post/create')} id="newPostBtn"><img id="add-icon" src={addIcon}/>New Post</button></a>
                    </div>
                    {posts.map((post) => {
                        return(
                            <React.Fragment key={post._id}>
                                <PostCardEdit post={post}/>
                            </React.Fragment>
                        )
                    })}
                </div>
            </main>
        )
    }
}
