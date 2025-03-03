import { useEffect, useMemo, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate, useParams } from 'react-router';
import uploadIcon from '../../icons/file_upload.png';
import LoadingIcon from '../../icons/loading.svg';
import { Editor as TinyMCEEditor } from 'tinymce';
import { usePostByIdQuery, usePostPutMutation } from '../../api/queries/postqueries.ts';
import { Errors } from '../General/Errors.tsx';
import { useUserContext } from '../../hooks/useUserContext.tsx';

export function UpdatePost() {
    const navigate = useNavigate();
    const { postid } = useParams();
    const userContext = useUserContext();
    const post = usePostByIdQuery(postid);
    const postPut = usePostPutMutation();
    const editorRef = useRef<TinyMCEEditor>(null);
    const [published, setPublished] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (post.data?.published) {
            setPublished(post.data.published);
        }
    }, [post.data?.published]);

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
            postPut.mutate(
                {
                    title: editorRef.current.dom.select('h1')[0]?.innerText ?? '',
                    content: editorRef.current.getContent(),
                    description: editorRef.current.dom.select('p')[0]?.innerText ?? '',
                    published,
                    photo: file,
                    postId: post.data?._id ?? '',
                },
                {
                    onSuccess: () => {
                        navigate('/edit', { replace: true });
                    },
                }
            );
        }
    }

    const isLoading = useMemo(() => post.isPending || postPut.isPending, [post.isPending, postPut.isPending]);

    if (post.error) {
        return (
            <div className="error-main">
                <div className="error-container">
                    <h2>Error occurred</h2>
                </div>
            </div>
        );
    } else if (post.isPending) {
        return (
            <div className="loading-main">
                <div className="loading-container">
                    <div className="loading-icon-box">
                        <img id="loading-icon" src={LoadingIcon} />
                    </div>
                    <p>Loading Post...</p>
                </div>
            </div>
        );
    } else if (!post.data) {
        return (
            <div className="no-content-main">
                <div className="no-content-container">
                    <h2>No post found</h2>
                </div>
            </div>
        );
    } else {
        return (
            <main className="editor-main">
                <div className="editor-box">
                    <div className="more-info">
                        <form className="editor-form">
                            <Editor
                                tinymceScriptSrc={'/tinymce/tinymce.min.js'}
                                initialValue={post.data.content}
                                onInit={(_, editor) => (editorRef.current = editor)}
                                init={{
                                    // selector: 'textarea',
                                    height: 500,
                                    plugins:
                                        'advlist anchor autolink charmap code codesample fullscreen help link lists paste preview searchreplace table visualblocks wordcount',
                                }}
                            />
                            <Errors errors={postPut.error} />
                            <div className="editor-bottom-area">
                                <div className="editor-photo-box">
                                    <label className="editor-photo-label" htmlFor="photo">
                                        <img id="upload-icon" src={uploadIcon} />
                                        <span className="editor-photo-span">
                                            {file
                                                ? file.name
                                                : post.data.photo.originalName
                                                  ? post.data.photo.originalName
                                                  : 'Cover image'}
                                        </span>
                                        <span className="editor-photo-span max-size">{'(max: 2MB)'}</span>
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
                                    {!post.data.published ? (
                                        <>
                                            <label htmlFor="published">Publish: </label>
                                            <input
                                                checked={published}
                                                onChange={({ target }) => setPublished(target.checked)}
                                                id="published"
                                                name="published"
                                                type="checkbox"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <input id="published" name="published" type="hidden" checked={true} />
                                        </>
                                    )}
                                </div>
                                <p className="editor-author">
                                    {'Author: ' + post.data?.author?.first_name + ' ' + post.data?.author?.last_name}
                                </p>
                                <div className="editor-submit-box">
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="editor-btn-submit"
                                        disabled={isLoading}
                                        style={isLoading ? { cursor: 'wait' } : {}}>
                                        Update Post
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        );
    }
}
