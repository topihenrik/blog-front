import React, { useState } from "react";
import {DateTime} from "luxon";

export default function Comment(props) {
    const { postid, comment, user, updateComments, setUpdateComments } = props;
    const [edit, setEdit] = useState(false);

    const handleClickEdit = () => {
        (edit === false?setEdit(true):setEdit(false))
    }

    const handleClickDelete = () => {

        const bearer = "Bearer " + localStorage.getItem("token");
        fetch(`http://localhost:3000/auth/posts/${postid}/comments/${comment._id}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": bearer
                }
            })
            .then((res) => res.json())
            .then((result) => {
                if (result.status === 200) {
                    setUpdateComments(updateComments+1);
                }
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const bearer = "Bearer " + localStorage.getItem("token");
        fetch(`http://localhost:3000/auth/posts/${postid}/comments/${comment._id}`,
            {
                method: "PUT",
                headers: {
                    "Authorization": bearer
                },
                body: new URLSearchParams({content: e.target.content.value})
            })
            .then((res) => res.json())
            .then((result) => {
                if (result.status === 200) {
                    setEdit(false);
                    setUpdateComments(updateComments+1);
                }
            })
    }

    const handleCancel = (e) => {
        setEdit(false);
    }

    if (!edit) {
        return(
            <div className="comment">
                <div className="info-box">
                    <div className="author-box">
                        <img className="author-avatar-comment" src={"http://localhost:3000/"+comment.author.avatar.path}/>
                        <h3>{comment.author.first_name + " " + comment.author.last_name}</h3>
                    </div>
                    <h4>{DateTime.fromJSDate(new Date(comment.timestamp)).toLocaleString(DateTime.DATETIME_SHORT)}</h4>
                </div>
                <p>{comment.content}</p>
                {(user?._id === comment.author._id)&&
                <div className="comment-modification-buttons">
                    <button onClick={handleClickEdit}>Edit</button>
                    <button onClick={handleClickDelete}>Delete</button>
                </div>}  
            </div>
        )
    } else {
        return(
            <div className="comment">
                <div className="info-box">
                    <div className="author-box">
                        <img className="author-avatar-comment" src={"http://localhost:3000/"+comment.author.avatar.path}/>
                        <h3>{comment.author.first_name + " " + comment.author.last_name}</h3>
                    </div>
                    <h4>{DateTime.fromJSDate(new Date(comment.timestamp)).toLocaleString(DateTime.DATETIME_SHORT)}</h4>
                </div>
                <form className="comment-creator-form" onSubmit={handleSubmit}>
                    <textarea name="content" defaultValue={comment.content} id="comment-creator-textarea"></textarea>
                    <div className="comment-creator-buttons">
                        <button type="submit">Update</button>
                        <button type="button" onClick={handleCancel}>Cancel</button>
                    </div>   
                </form>
            </div>
        )

    }

    
}