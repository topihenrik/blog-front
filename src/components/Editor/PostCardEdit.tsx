import { DateTime } from 'luxon';
import ViewIcon from '../../icons/view.png';
import EditIcon from '../../icons/edit.png';
import DeleteIcon from '../../icons/delete.png';
import { PostOutputModel } from '../../types/postmodel.ts';
import { useNavigate } from 'react-router';

interface PostCardEditProps {
    post: PostOutputModel;
}

export function PostCardEdit({ post }: PostCardEditProps) {
    const navigate = useNavigate();
    return (
        <div className="edit-post-card">
            <div className="edit-post-card-container">
                <div className="edit-post-box-left">
                    <div className="edit-info-box">
                        <div className="edit-author-box">
                            <img className="edit-author-avatar-card" src={post.author.avatar.url} />
                            <h4>{post.author.first_name + ' ' + post.author.last_name}</h4>
                        </div>
                        <h4>{DateTime.fromJSDate(new Date(post.timestamp)).toLocaleString(DateTime.DATE_MED)}</h4>
                    </div>
                    <h2>{post.title}</h2>
                    <p className="edit-post-description">
                        {post.description.split(' ').slice(0, 28).join(' ') + ' ...'}
                    </p>
                    <p className="edit-post-comments-count">{post.count + ' comments'}</p>
                    {post.published ? (
                        <p className="edit-post-published-true">Published</p>
                    ) : (
                        <p className="edit-post-published-false">Not published</p>
                    )}
                    <div className="edit-post-modification-buttons">
                        {post.published && (
                            <a className="edit-post-modification-anchor">
                                <button
                                    onClick={() => navigate('/post/' + post._id)}
                                    className="edit-post-modification-button">
                                    <img className="icon" src={ViewIcon} />
                                    View
                                </button>
                            </a>
                        )}
                        <a className="edit-post-modification-anchor">
                            <button
                                onClick={() => navigate('/post/update/' + post._id)}
                                className="edit-post-modification-button">
                                <img className="icon" src={EditIcon} />
                                Edit
                            </button>
                        </a>
                        <a className="edit-post-modification-anchor">
                            <button
                                onClick={() => navigate('/post/delete/' + post._id)}
                                className="edit-post-modification-button">
                                <img className="icon" src={DeleteIcon} />
                                Delete
                            </button>
                        </a>
                    </div>
                </div>
                <div className="edit-post-box-right">
                    <img className="edit-photo-thumbnail" src={post.photo.url} />
                </div>
            </div>
        </div>
    );
}
