import React, {useState} from "react";
import AddIcon from "../../../icons/add.png";

export function CommentCreator({postid, user, updateComments, setUpdateComments}) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [result, setResult] = useState({});
    const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false); // During fetch request -> disable submit button

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitBtnDisabled(true);
        const bearer = "Bearer " + localStorage.getItem("token");
        fetch(`${import.meta.env.VITE_API_URL}/auth/posts/${postid}/comments`,
            {
                method: "POST",
                headers: {
                    "Authorization": bearer,
                    "Content-Type": "application/x-www-form-urlencoded"},
                body: new URLSearchParams({content: e.target.content.value})
            })
            .then((res) => {
                if (res.status === 201) {
                    setUpdateComments(updateComments+1);
                    e.target.reset();
                }
                return res.json()
            })
            .then((result) => {
                    setIsLoaded(true);
                    setResult(result);
                    setSubmitBtnDisabled(false);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                    setSubmitBtnDisabled(false);
                })
    }

    return(
        <div className="comment-creator">
            <h3>Author: {user.full_name}</h3>
            <form className="comment-creator-form" onSubmit={handleSubmit}>
                <textarea name="content" placeholder="Comment" id="comment-creator-textarea"></textarea>
                <button className="comment-creator-button" disabled={submitBtnDisabled} style={submitBtnDisabled?{cursor: "wait"}:{}}><img className="icon" src={AddIcon}/>Submit</button>
            </form>
        </div>
    )
}
