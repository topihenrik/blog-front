import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import PostFull from "./PostFull";
import CommentSection from "./CommentSection";

export default function BlogMain(props) {
    const { user } = props;
    const { postid } = useParams();
    const [postExists, setPostExists] = useState(false);
    return(
        <main className="blog-main">
            <PostFull postid={postid} setPostExists={setPostExists}/>
            <CommentSection postid={postid} user={user} postExists={postExists}/>
        </main>
    )
}