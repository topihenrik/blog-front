import React, {useState} from "react";
import AddIcon from "../../../../icons/add.png"


export default function CommentCreator(props) {
    const { postid, user, updateComments, setUpdateComments } = props;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [result, setResult] = useState({});
 


    const handleSubmit = (e) => {
        e.preventDefault();
        const bearer = "Bearer " + localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}/auth/posts/${postid}/comments`, 
            {
                method: "POST",
                headers: {
                    "Authorization": bearer,
                    "Content-Type": "application/x-www-form-urlencoded"},
                body: new URLSearchParams({content: e.target.content.value})
            })
            .then((res) => res.json())
            .then((result) => {
                setIsLoaded(true);
                setResult(result);
                if (result.status == 201) {
                    setUpdateComments(updateComments+1);
                    e.target.reset();
                }
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            })
    }

    return(
        <div className="comment-creator">
            <h3>Author: {user.full_name}</h3>
            <form className="comment-creator-form" onSubmit={handleSubmit}>
                <textarea name="content" placeholder="Comment" id="comment-creator-textarea"></textarea>
                <button className="comment-creator-button"><img className="icon" src={AddIcon}/>Submit</button>
            </form>
        </div>
    )
}