import React, {useState} from "react";


export default function CommentCreator(props) {
    const { postid, user, updateComments, setUpdateComments } = props;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [result, setResult] = useState({});



    const handleSubmit = (e) => {
        e.preventDefault();
        const bearer = "Bearer " + localStorage.getItem("token");
        fetch(`http://localhost:3000/auth/posts/${postid}/comments`, 
            {
                method: "POST",
                headers: {
                    "Authorization": bearer,
                    "Content-Type": "application/x-www-form-urlencoded"},
                body: new URLSearchParams({content: e.target.content.value, author: e.target.author.value})
            })
            .then((res) => res.json())
            .then((result) => {
                setIsLoaded(true);
                setResult(result);
                if (result.status == 201) {
                    setUpdateComments(updateComments+1);
                }
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            })
    }

    return(
        <div className="commentCreator">
            <h3>Author: {user.full_name}</h3>
            <form className="comment-creator-form" onSubmit={handleSubmit}>
                <textarea name="content" placeholder="Comment"></textarea>
                <input name="author" type="hidden" required={true} value={user._id}/>
                <button>Submit</button>
            </form>
        </div>
    )
}