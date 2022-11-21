import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import PostCardDel from "./PostCardDel";
import LoadingIcon from "../../icons/loading.svg"

export default function DeletePost(props) {
    const { user } = props;
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
                setPost(result.post_list);
                setCount(result.count);
            },
            (error) => {
                setIsLoaded1(true);
                setError1(error);
            }
        )
    }, [])

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
            .then((res) => res.json())
            .then((result) => {
                setIsLoaded2(true);
                setResult(result);
                if (result.status === 200) {
                    navigate("/", {replace: true});
                }
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
                    <PostCardDel post={post} count={count}/>
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
