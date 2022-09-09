import React from "react";
import {DateTime} from "luxon";

export default function Comment(props) {
    const { comment } = props;
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
        </div>
    )
}