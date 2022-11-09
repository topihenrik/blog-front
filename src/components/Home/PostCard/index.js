import React from "react";
import { DateTime } from "luxon";


export default function PostCard(props) {
    const {post} = props;
    return(
        <div className="post-card">
            <a href={"/posts/"+post._id}>
                <div className="post-box-left">
                    <div className="info-box">
                        <div className="author-box">
                            <img className="author-avatar-card" src={post.author.avatar.url}/>
                            <h4>{post.author.first_name + " " + post.author.last_name}</h4>
                        </div>
                        <h4>{DateTime.fromJSDate(new Date(post.timestamp)).toLocaleString(DateTime.DATE_MED)}</h4>
                    </div>
                    <h2>{post.title}</h2>
                    <p className="post-description">{post.description.split(' ').slice(0, 28).join(' ') + " ..."}</p>
                    <p className="post-comments-count">{post.count + " comments"}</p>
                </div>
                <div className="post-box-right">
                    <img className="photo-thumbnail" src={post.photo.url}/>
                </div>
            </a>
        </div>
    )
}