import React, {useEffect, useRef, useState} from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from 'react-router-dom';
import uploadIcon from "../../icons/file_upload.png";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import LoadingIcon from "../../icons/loading.svg"

export default function UpdatePost(props) {
    const { user } = props;
    const editorRef = useRef(null);
    const navigate = useNavigate();
    const { postid } = useParams();

    const [error1, setError1] = useState(null);
    const [isLoaded1, setIsLoaded1] = useState(false);
    const [post, setPost] = useState([]);
    
    const [error2, setError2] = useState(null);
    const [isLoaded2, setIsLoaded2] = useState(false);
    const [result, setResult] = useState({});
    const [resultErrors, setResultErrors] = useState({});
    const [file, setFile] = useState(null);

    const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false); // During fetch request -> disable submit button
    
    useEffect(() => {
        if (!user) {
            navigate("../login", {replace: true});
        }

        const bearer = "Bearer " + localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}/auth/posts/${postid}/edit`,
            {
                headers: {
                    "Authorization": bearer
                }
            })
            .then((res) => res.json())
            .then((result) => {
                setIsLoaded1(true);
                setPost(result.post_list);
            },
            (error) => {
                setIsLoaded1(true);
                setError1(error);
            }
        )

    }, [])

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitBtnDisabled(true);
        if (editorRef.current) {
            if (file?.size >= 2097152) {
                setResultErrors({errors:[{msg: "File too large, max size is 2MB"}]});
                setSubmitBtnDisabled(false);
                return;
            }
            const bearer = "Bearer " + localStorage.getItem("token");
            const formData = new FormData();
            formData.append("postID", postid);
            formData.append("title", editorRef.current.dom.select('h1')[0]?.innerText??"");
            formData.append("content", editorRef.current.getContent());
            formData.append("description", editorRef.current.dom.select('p')[0]?.innerText??"");
            formData.append("photo", file);
            formData.append("published", e.target.published.checked);
            fetch(`${process.env.REACT_APP_API_URL}/auth/posts`, 
                {
                    method: "PUT",
                    headers: {
                        "Authorization": bearer
                    },
                    body: formData
                })
                .then((res) => res.json())
                .then((result) => {
                    setIsLoaded2(true);
                    setResultErrors(result);
                    if (result.status === 201) {
                        navigate("/", {replace: true});
                    }
                    setSubmitBtnDisabled(false);
                },
                (error) => {
                    setIsLoaded2(true);
                    setError2(error);
                    setSubmitBtnDisabled(false);
                })
        } else {
            setSubmitBtnDisabled(false);
        }
    }



    if (error1) {
        return (
            <div className="error-main">
                <div className="error-container">
                    <h2>Error</h2>
                    <p>{error1.message}</p>
                </div>
            </div>
        )
    } else if (!isLoaded1) {
        return (
            <div className="loading-main">
                <div className="loading-container">
                    <div className="loading-icon-box">
                        <img id="loading-icon" src={LoadingIcon}/>
                    </div>
                    <p>Loading Post...</p>
                </div>
            </div>
        )
    } else if (post === undefined) {
        return (
            <div className="no-content-main">
                <div className="no-content-container">
                    <h2>No post found</h2>
                </div>
            </div>
        )
    } else {
        return(
            <main className="editor-main">
                <div className="editor-box">
                    <div className="more-info">
                        <form className="editor-form" onSubmit={handleSubmit}>
                            <Editor
                                tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
                                initialValue={post.content}
                                onInit={(evt, editor) => {
                                    editorRef.current = editor;
                                }}
                                init={{
                                    selector: "textarea",
                                    height: 500,
                                    plugins:
                                      'advlist anchor autolink charmap code codesample fullscreen help link lists paste preview searchreplace table visualblocks wordcount',
                                  }}
                                />
                            <div className="editor-error-box">
                                {(resultErrors.status >= 400 && resultErrors.status <= 451) &&
                                <div className="error-box">
                                    <p className="error-message">{resultErrors.message}</p>
                                </div>}
                                {resultErrors.errors &&
                                resultErrors.errors.map((error) => {
                                    return(
                                        <div className="error-box" key={nanoid()}>
                                            <p className="error-message">{error.msg}</p>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="editor-bottom-area">
                                    <div className="editor-photo-box">
                                        <label className="editor-photo-label" htmlFor="photo"><img id="upload-icon" src={uploadIcon}/><span className="editor-photo-span">{file?file.name:post.photo.originalName?post.photo.originalName:"Cover image"}</span><span className="editor-photo-span max-size">{"(max: 2MB)"}</span></label>
                                        <input id="photo" name="photo" type="file" accept="image/png, image/jpeg" onChange={handleChange}/>
                                    </div>
                                    <div className="published-box">
                                        {!post.published?
                                        <>
                                            <label htmlFor="published">Publish: </label>
                                            <input id="published" name="published" type="checkbox"/>
                                        </>:
                                        <>
                                            <input id="published" name="published" type="hidden" checked={true}/>
                                        </>}
                                    </div>
                                    <p className="editor-author">{"Author: " + post?.author?.first_name + " " + post?.author?.last_name}</p>
                                    <div className="editor-submit-box">
                                        <button className="editor-btn-submit" disabled={submitBtnDisabled} style={submitBtnDisabled?{cursor: "wait"}:{}}>Update Post</button>
                                    </div>
                            </div>
                        </form>                    
                    </div>               
                </div>
            </main>
        )
    }



    

}