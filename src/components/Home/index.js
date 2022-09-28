import React, {useState, useEffect} from "react";
import HeroScreen from "./HeroScreen";
import PostCard from "./PostCard";
import LoadingIcon from "../../icons/loading.svg"

export default function Home(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/posts")
            .then((res) => res.json())
            .then((result) => {
                    setIsLoaded(true);
                    setPosts(result.post_list);
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
                    <p>Loading...</p>
                </div>
            </div>
        )
    } else if (posts === undefined) {
        return (
            <div className="noContentMain">
                <div className="no-content-container">
                    <h2>No posts found</h2>
                    <p>🥇 Be the first creator to make a post!</p>
                </div>
            </div>
        )
    } else {
        return(
            <main className="homeMain">
                <HeroScreen/>
                <div className="posts-box">
                    <h2 className="posts-title">Shared ideas</h2>
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