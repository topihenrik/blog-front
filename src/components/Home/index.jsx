import React, {useState, useEffect} from "react";
import { DateTime } from "luxon";
import LoadingIcon from "../../icons/loading.svg"

function HeroScreen() {
    return(
        <div className="hero-screen" style={
            {
                backgroundImage: `url("https://res.cloudinary.com/dqcnxy51g/image/upload/v1668987801/${import.meta.env.VITE_CLOUDINARY_FOLDER}/static/blog-bg_tmdcsm.jpg")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }
        }>
            <div className="hero-box">
                <h1>Share your ideas.</h1>
                <p>Discover and share different perspectives with other participants from around the world.</p>
            </div>
        </div>
    )
}

function PostCard({post}) {
    return(
        <div className="post-card">
            <a href={"/post/"+post._id}>
                <div className="post-box-left">
                    <div className="info-box">
                        <div className="author-box">
                            <img className="author-avatar-card" src={post.author.avatar.url}/>
                            <h4>{post.author.first_name + " " + post.author.last_name}</h4>
                        </div>
                        <h4>{DateTime.fromJSDate(new Date(post.timestamp)).toLocaleString(DateTime.DATE_MED)}</h4>
                    </div>
                    <h2>{post.title}</h2>
                    <p className="post-description">{post.description.split(' ').slice(0, 28).join(' ') + " ..."}</p>
                    <p className="post-comments-count">{post.count + " comments"}</p>
                </div>
                <div className="post-box-right">
                    <img className="photo-thumbnail" src={post.photo.url}/>
                </div>
            </a>
        </div>
    )
}

export function Home({user}) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/posts`)
            .then((res) => res.json())
            .then((result) => {
                    setIsLoaded(true);
                    setPosts(result);
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
                <HeroScreen/>
                <div className="loading-container">
                    <div className="loading-icon-box">
                        <img id="loading-icon" src={LoadingIcon}/>
                    </div>
                    <p>Loading...</p>
                </div>
            </div>
        )
    } else if (posts.length === 0) {
        return (
            <div className="no-content-main">
                <HeroScreen/>
                <div className="no-content-container">
                    <h2>No posts found</h2>
                    <p>🥇 Be the first creator to make a post!</p>
                    {user?
                    <div>
                        <a href="/edit"><button className="action-button">Your Stories 📖</button></a>
                    </div>:
                    <div>
                        <a href="/signup"><button className="action-button">Join now</button></a>
                    </div>}
                </div>
            </div>
        )
    } else {
        return(
            <main className="home-main">
                <HeroScreen/>
                <div className="posts-box">
                    <div className="posts-title-box">
                        <h2 className="posts-title">Shared ideas</h2>
                        {user?
                        <div>
                            <a href="/edit"><button className="action-button">Your Stories 📖</button></a>
                        </div>:
                        <div>
                            <a href="/signup"><button className="action-button">Join now</button></a>
                        </div>}
                    </div>
                    {posts.map((post, i) => {
                        if (i+1 === posts.length) {
                            return(
                                <React.Fragment key={post._id}>
                                    <PostCard post={post}/>
                                </React.Fragment>
                            )
                        } else {
                            return(
                                <React.Fragment key={post._id}>
                                    <PostCard post={post}/>
                                    <hr className="post-hr"/>
                                </React.Fragment>
                            )
                        }
                    })}
                </div>
            </main>
        )
    }
}
