import React from "react";
import {DateTime} from "luxon";

export default function Comment(props) {
    const { comment } = props;
    return(
        <div className="comment">
            <div className="info-box">
                <h3>{comment.author.first_name + " " + comment.author.last_name}</h3>
                <h4>{DateTime.fromJSDate(new Date(comment.timestamp)).toLocaleString(DateTime.DATETIME_SHORT)}</h4>
            </div>
            <p>{comment.content}</p>
        </div>
    )
}