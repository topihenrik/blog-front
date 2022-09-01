import React from "react";
import PostFull from "./PostFull";
import CommentSection from "./CommentSection";

export default function BlogMain(props) {
    return(
        <main>
            <PostFull/>
            <CommentSection/>
        </main>
    )
}