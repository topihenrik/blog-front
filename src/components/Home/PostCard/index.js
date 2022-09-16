import React from "react";
import { DateTime } from "luxon";


export default function PostCard(props) {
    const {post} = props;
    return(
        <div className="postCard">
            <a href={"/posts/"+post._id}>
                <div className="post-box-left">
                    <div className="info-box">
                        <div className="author-box">
                            <img className="author-avatar-card" src={"http://localhost:3000/"+post.author.avatar.path}/>
                            <h3>{post.author.first_name + " " + post.author.last_name}</h3>
                        </div>
                        
                        <h3>{DateTime.fromJSDate(new Date(post.timestamp)).toLocaleString(DateTime.DATE_MED)}</h3>
                    </div>
                    <h2>{post.title}</h2>
                    <p>{post.description.split(' ').slice(0, 50).join(' ') + "..."}</p>
                    <p>{post.count + " comments"}</p>
                </div>
                <div className="post-box-right">
                    <img className="photo-thumbnail" src={"http://localhost:3000/"+post.photo.path}/>
                </div>
            </a>
        </div>
    )
}