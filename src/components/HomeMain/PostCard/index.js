import React from "react";
import { DateTime } from "luxon";


export default function PostCard(props) {
    const {post} = props;
    return(
        <div className="postCard">
            <a href={"/posts/"+post._id}>
                <div className="info-box">
                    <h3>{post.author.first_name + " " + post.author.last_name}</h3>
                    <h3>{DateTime.fromJSDate(new Date(post.timestamp)).toLocaleString(DateTime.DATE_MED)}</h3>
                </div>
                <h2>{post.title}</h2>
                <p>{post.content.split(' ').slice(0, 20).join(' ') + "..."}</p>
            </a>
        </div>
    )
}