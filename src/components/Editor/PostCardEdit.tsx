import { DateTime } from 'luxon';
import ViewIcon from '../../icons/view.png';
import EditIcon from '../../icons/edit.png';
import DeleteIcon from '../../icons/delete.png';
import { PostResponse } from '../../types/postmodel.ts';
import { useNavigate } from 'react-router';
import { stripHtml } from 'string-strip-html';

interface PostCardEditProps {
    post: PostResponse;
}

export function PostCardEdit({ post }: PostCardEditProps) {
    const navigate = useNavigate();
    return (
        <div className="edit-post-card">
            <div className="edit-post-card-container">
                <div className="edit-post-box-left">
                    <div className="edit-info-box">
                        <div className="edit-author-box">
                            <img className="edit-author-avatar-card" src={post.author.avatar?.url} />
                            <h4>{post.author.firstName + ' ' + post.author.lastName}</h4>
                        </div>
                        <h4>{DateTime.fromJSDate(new Date(post.createdAt)).toLocaleString(DateTime.DATE_MED)}</h4>
                    </div>
                    <h2>{post.title}</h2>
                    <p className="edit-post-description">
                        {stripHtml(post.content).result.split(' ').slice(0, 28).join(' ') + ' ...'}
                    </p>
                    <p className="edit-post-comments-count">{post.commentCount + ' comments'}</p>
                    {post.isPublished ? (
                        <p className="edit-post-published-true">Published</p>
                    ) : (
                        <p className="edit-post-published-false">Not published</p>
                    )}
                    <div className="edit-post-modification-buttons">
                        {post.isPublished && (
                            <a className="edit-post-modification-anchor">
                                <button
                                    onClick={() => navigate('/post/' + post.id)}
                                    className="edit-post-modification-button">
                                    <img className="icon" src={ViewIcon} />
                                    View
                                </button>
                            </a>
                        )}
                        <a className="edit-post-modification-anchor">
                            <button
                                onClick={() => navigate('/post/update/' + post.id)}
                                className="edit-post-modification-button">
                                <img className="icon" src={EditIcon} />
                                Edit
                            </button>
                        </a>
                        <a className="edit-post-modification-anchor">
                            <button
                                onClick={() => navigate('/post/delete/' + post.id)}
                                className="edit-post-modification-button">
                                <img className="icon" src={DeleteIcon} />
                                Delete
                            </button>
                        </a>
                    </div>
                </div>
                <div className="edit-post-box-right">
                    <img className="edit-photo-thumbnail" src={post.image?.url} />
                </div>
            </div>
        </div>
    );
}
