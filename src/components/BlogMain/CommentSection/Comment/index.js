import React from "react";


export default function Comment(props) {
    const { comment } = props;
    return(
        <div className="comment">
            <div className="info-box">
                <h3>{comment.author.first_name + " " + comment.author.last_name}</h3>
                <h4>{comment.timestamp}</h4>
            </div>
            <p>{comment.content}</p>
        </div>
    )
}