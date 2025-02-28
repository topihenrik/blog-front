import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router';
import { DateTime } from "luxon";
import addIcon from "../../icons/add.png";
import LoadingIcon from "../../icons/loading.svg"
import ViewIcon from "../../icons/view.png";
import EditIcon from "../../icons/edit.png";
import DeleteIcon from "../../icons/delete.png";

function HeroScreen() {
    return(
        <div className="hero-screen" style={
            {
                backgroundImage: `url("https://res.cloudinary.com/dqcnxy51g/image/upload/v1668989572/${import.meta.env.VITE_CLOUDINARY_FOLDER}/static/blog-bg2_uhn0x6.jpg")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }}>
            <div className="hero-box">
                <h1>Editor is your playground</h1>
                <p>Create new posts or update your older ones. Whatever you do, the editor is here to assist you.</p>
            </div>
        </div>
    )
}

function PostCard({post}) {
    return(
        <div className="edit-post-card">
            <div className="edit-post-card-container">
                <div className="edit-post-box-left">
                    <div className="edit-info-box">
                        <div className="edit-author-box">
                            <img className="edit-author-avatar-card" src={post.author.avatar.url}/>
                            <h4>{post.author.first_name + " " + post.author.last_name}</h4>
                        </div>
                        <h4>{DateTime.fromJSDate(new Date(post.timestamp)).toLocaleString(DateTime.DATE_MED)}</h4>
                    </div>
                    <h2>{post.title}</h2>
                    <p className="edit-post-description">{post.description.split(' ').slice(0, 28).join(' ') + " ..."}</p>
                    <p className="edit-post-comments-count">{post.count + " comments"}</p>
                    {post.published?<p className="edit-post-published-true">Published</p>:<p className="edit-post-published-false">Not published</p>}
                    <div className="edit-post-modification-buttons">
                        {post.published &&
                        <a className="edit-post-modification-anchor" href={"/post/"+post._id}><button className="edit-post-modification-button"><img className="icon" src={ViewIcon}/>View</button></a>}
                        <a className="edit-post-modification-anchor" href={"/post/update/"+post._id}><button className="edit-post-modification-button"><img className="icon" src={EditIcon}/>Edit</button></a>
                        <a className="edit-post-modification-anchor" href={"/post/delete/"+post._id}><button className="edit-post-modification-button"><img className="icon" src={DeleteIcon}/>Delete</button></a>
                    </div>
                </div>
                <div className="edit-post-box-right">
                    <img className="edit-photo-thumbnail" src={post.photo.url}/>
                </div>
            </div>
        </div>
    )
}

export function Edit({user}) {
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
                        <a href="/post/create">
                            <button id="newPostBtn"><img id="add-icon" src={addIcon}/>New Post</button>
                        </a>
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
                        <a href="/post/create">
                            <button id="newPostBtn"><img id="add-icon" src={addIcon}/>New Post</button>
                        </a>
                    </div>
                    {posts.map((post) => {
                        return(
                            <React.Fragment key={post._id}>
                                <PostCard post={post}/>
                            </React.Fragment>
                        )
                    })}
                </div>
            </main>
        )
    }
}
