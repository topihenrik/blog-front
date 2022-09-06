import React, {useState, useEffect} from "react";
import HeroScreen from "./HeroScreen";
import PostCard from "./PostCard";

export default function HomeMain(props) {
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
        return <div>Error: {error.message}</div>
    } else if (posts === undefined) {
        return <div>No posts!</div>
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else {
        return(
            <main className="homeMain">
                <HeroScreen/>
                <div className="posts-box">
                    <h2 className="posts-title">Shared ideas</h2>
                    {posts.map((post, i) => {
                        if (i+1 === posts.length) {
                            return(
                                <section key={post._id}>
                                    <PostCard post={post}/>
                                </section>
                            )
                        } else {
                            return(
                                <>
                                    <section key={post._id}>
                                        <PostCard post={post}/>
                                    </section>
                                    <hr className="post-hr"/>
                                </>
                            )
                        }
                    })}
                </div>
            </main>
        )
    }

    
}