import { Fragment } from 'react';
import LoadingIcon from '../../../icons/loading.svg';
import { useNavigate, useParams } from 'react-router';
import { CommentCreator } from './CommentCreator.jsx';
import { Comment } from './Comment.jsx';
import { useCommentsByPostIdQuery } from '../../../api/queries/commentqueries.ts';
import { usePostByIdQuery } from '../../../api/queries/postqueries.ts';

export function CommentSection() {
    const navigate = useNavigate();
    const { postid } = useParams();
    const comments = useCommentsByPostIdQuery(postid);
    const posts = usePostByIdQuery(postid);

    if (comments.error) {
        return (
            <div className="error-main">
                <div className="error-container">
                    <h2>Error has occurred</h2>
                </div>
            </div>
        );
    } else if (comments.isPending) {
        return (
            <div className="loading-main">
                <div className="loading-container">
                    <div className="loading-icon-box">
                        <img id="loading-icon" src={LoadingIcon} />
                    </div>
                    <p>Loading Comments...</p>
                </div>
            </div>
        );
    } else {
        if (posts.data && comments.data) {
            return (
                <div className="comment-section">
                    <h2>Responses</h2>
                    {comments.data ? (
                        comments.data.map((comment) => {
                            return (
                                <Fragment key={comment._id}>
                                    <Comment comment={comment} />
                                    <hr className="comment-hr" />
                                </Fragment>
                            );
                        })
                    ) : (
                        <></>
                    )}

                    {localStorage.getItem('token') !== null ? (
                        <CommentCreator />
                    ) : (
                        <div className="new-comment">
                            <button onClick={() => navigate('/login')}>
                                <h3>Log In to Create a New Comment</h3>
                            </button>
                        </div>
                    )}
                </div>
            );
        }
        return null;
    }
}
