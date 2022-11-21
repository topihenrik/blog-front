import React, {useState, useEffect} from "react";
import HeroScreen from "./HeroScreen";
import PostCard from "./PostCard";
import LoadingIcon from "../../icons/loading.svg"

export default function Home(props) {
    const { user } = props;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/posts`)
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
    } else if (posts === undefined) {
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