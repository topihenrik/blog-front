import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import PostFull from "./PostFull";
import CommentSection from "./CommentSection";

export default function BlogMain(props) {
    const { user } = props;
    const { postid } = useParams();
    return(
        <main className="blogMain">
            <PostFull postid={postid}/>
            <CommentSection postid={postid} user={user}/>
        </main>
    )
}