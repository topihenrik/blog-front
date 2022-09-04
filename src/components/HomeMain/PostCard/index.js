import React from "react";


export default function PostCard(props) {
    const {post} = props;
    return(
        <div className="postCard" style={{backgroundColor: "gray"}}>
            <a href={"/posts/"+post._id}>
                <h3>{post.author.first_name + " " + post.author.last_name}</h3>
                <h2>{post.title}</h2>
                <p>{post.content.split(' ').slice(0, 20).join(' ') + "..."}</p>
            </a>
        </div>
    )
}