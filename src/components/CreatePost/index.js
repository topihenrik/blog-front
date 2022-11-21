import React, {useEffect, useRef, useState} from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from 'react-router-dom';
import uploadIcon from "../../icons/file_upload.png";
import { nanoid } from "nanoid";


export default function CreatePost(props) {
    const { user } = props;
    const editorRef = useRef(null);
    const navigate = useNavigate();


    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [file, setFile] = useState(null);

    const [resultErrors, setResultErrors] = useState({});
    const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false); // During fetch request -> disable submit button

    useEffect(() => {
        if (!user) {
            navigate("../login", {replace: true});
        }
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
            formData.append("title", editorRef.current.dom.select('h1')[0]?.innerText??"");
            formData.append("content", editorRef.current.getContent());
            formData.append("description", editorRef.current.dom.select('p')[0]?.innerText??"");
            formData.append("photo", file);
            formData.append("published", e.target.published.checked);
            fetch(`${process.env.REACT_APP_API_URL}/auth/posts`, 
                {
                    method: "POST",
                    headers: {
                        "Authorization": bearer
                    },
                    body: formData
                })
                .then((res) => res.json())
                .then((result) => {
                    setIsLoaded(true);
                    setResultErrors(result);
                    if (result.status === 201) {
                        navigate("/", {replace: true});
                    }
                    setSubmitBtnDisabled(false);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                    setSubmitBtnDisabled(false);
                })
        } else {
            setSubmitBtnDisabled(false);
        }
    }

    return(
        <main className="editor-main">
            <div className="editor-box">
                <div className="more-info">
                    <form className="editor-form" onSubmit={handleSubmit}>
                        <Editor
                            tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
                            onInit={(evt, editor) => editorRef.current = editor}
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
                                <label className="editor-photo-label" htmlFor="photo"><img id="upload-icon" src={uploadIcon}/><span className="editor-photo-span">{file?file.name:"Cover image"}</span></label>
                                <input id="photo" name="photo" type="file" accept="image/png, image/jpeg" onChange={handleChange}/>
                            </div>
                            <div className="published-box">
                                <label htmlFor="published">Publish: </label>
                                <input id="published" name="published" type="checkbox"/>
                            </div>
                            <p className="editor-author"><strong>{"Author: " + user?.full_name}</strong></p>
                            <div className="editor-submit-box">
                                <button className="editor-btn-submit" disabled={submitBtnDisabled} style={submitBtnDisabled?{cursor: "wait"}:{}}>Submit Post</button>
                            </div>
                        </div>
                    </form>                    
                </div>               
            </div>
        </main>
    )

}