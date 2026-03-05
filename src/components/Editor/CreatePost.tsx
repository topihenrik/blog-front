import { useEffect, useRef, useState } from 'react';
import { Editor as TinyMCEEditor } from 'tinymce';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from 'react-router';
import uploadIcon from '../../icons/file_upload.png';
import { usePostPostMutation } from '../../api/queries/postqueries.ts';
import { Errors } from '../General/Errors.tsx';
import { useUserContext } from '../../hooks/useUserContext.tsx';

export function CreatePost() {
    const navigate = useNavigate();
    const userContext = useUserContext();
    const postPost = usePostPostMutation();
    const editorRef = useRef<TinyMCEEditor>(null);
    const [isPublished, setIsPublished] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (!userContext.token) {
            navigate('/login', { replace: true });
        }
    }, [navigate, userContext.token]);

    function handleFileChange(value: File | null) {
        setFile(value);
    }

    function handleSubmit() {
        if (editorRef.current) {
            postPost.mutate(
                {
                    title: title ?? '',
                    content: editorRef.current.getContent(),
                    isPublished,
                    image: file,
                },
                {
                    onSuccess: () => {
                        navigate('/edit', { replace: true });
                    },
                }
            );
        }
    }

    return (
        <main className="editor-main">
            <div className="editor-box">
                <div className="more-info">
                    <form className="editor-form">
                        <input
                            onChange={({ target }) => setTitle(target.value)}
                            value={title}
                            className="text-input title"
                            id="title"
                            name="title"
                            required={true}
                            type="text"
                            placeholder="Title"
                        />
                        <Editor
                            tinymceScriptSrc={'/tinymce/tinymce.min.js'}
                            onInit={(_, editor) => (editorRef.current = editor)}
                            init={{
                                height: 500,
                                plugins:
                                    'advlist anchor autolink charmap code codesample fullscreen help link lists paste preview searchreplace table visualblocks wordcount',
                            }}
                        />
                        <Errors errors={postPost.error} />
                        <div className="editor-bottom-area">
                            <div className="editor-photo-box">
                                <label className="editor-photo-label" htmlFor="photo">
                                    <img id="upload-icon" src={uploadIcon} />
                                    <span className="editor-photo-span">{file ? file.name : 'Cover image'}</span>
                                </label>
                                <input
                                    id="photo"
                                    name="photo"
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    onChange={({ target }) => {
                                        handleFileChange(target.files ? target.files[0] : null);
                                    }}
                                />
                            </div>
                            <div className="published-box">
                                <label htmlFor="published">Publish: </label>
                                <input
                                    checked={isPublished}
                                    onChange={({ target }) => setIsPublished(target.checked)}
                                    id="published"
                                    name="published"
                                    type="checkbox"
                                />
                            </div>
                            <p className="editor-author">
                                <strong>{'Author: ' + userContext.fullName}</strong>
                            </p>
                            <div className="editor-submit-box">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="editor-btn-submit"
                                    disabled={postPost.isPending}
                                    style={postPost.isPending ? { cursor: 'wait' } : {}}>
                                    Submit Post
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
