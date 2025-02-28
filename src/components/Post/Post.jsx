import {useState} from "react";
import { useParams } from "react-router";
import {CommentSection} from "./Comment/CommentSection.jsx";
import {PostContent} from "./PostContent.jsx";

export function Post({user}) {
    const { postid } = useParams();
    const [postExists, setPostExists] = useState(false);

    return(
        <main className="blog-main">
            <PostContent postid={postid} setPostExists={setPostExists}/>
            <CommentSection postid={postid} user={user} postExists={postExists}/>
        </main>
    )
}
