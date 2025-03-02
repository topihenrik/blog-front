import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import LoadingIcon from '../../icons/loading.svg';
import { usePostByIdQuery, usePostDeleteMutation } from '../../api/queries/postqueries.ts';
import { Errors } from '../General/Errors.tsx';
import { PostCard } from '../Home/PostCard.tsx';
import { useUserContext } from '../../hooks/useUserContext.tsx';

export function DeletePost() {
    const navigate = useNavigate();
    const { postid } = useParams();
    const userContext = useUserContext();
    const postDelete = usePostDeleteMutation();
    const post = usePostByIdQuery(postid);
    const [confirmation, setConfirmation] = useState('');

    useEffect(() => {
        if (!userContext.token) {
            navigate('/login', { replace: true });
        }
    }, [navigate, userContext.token]);

    function handleSubmit() {
        postDelete.mutate(
            {
                postId: postid ?? '',
                confirmation,
            },
            {
                onSuccess: () => {
                    navigate('/edit', { replace: true });
                },
            }
        );
    }

    const isLoading = useMemo(() => post.isPending || postDelete.isPending, [post.isPending, postDelete.isPending]);

    if (post.error) {
        return (
            <div className="error-main">
                <div className="error-container">
                    <h2>Error has occurred</h2>
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
            <main className="delete-post">
                <div className="delete-post-box">
                    <h2>Are you sure you want to delete this post?</h2>
                    <PostCard post={post.data} />
                    <form className="delete-form">
                        <label className="delete-label" htmlFor="confirmation">
                            To delete the post, type the title to confirm
                        </label>
                        <Errors errors={postDelete.error} />
                        <div className="delete-form-div">
                            <input
                                value={confirmation}
                                onChange={({ target }) => {
                                    setConfirmation(target.value);
                                }}
                                className="delete-input"
                                name="confirmation"
                                id="confirmation"
                                type="text"
                            />
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="delete-button"
                                disabled={isLoading}
                                style={isLoading ? { cursor: 'wait' } : {}}>
                                Delete
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        );
    }
}
