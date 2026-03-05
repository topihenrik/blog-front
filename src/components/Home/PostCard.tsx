import { useNavigate } from 'react-router';
import { DateTime } from 'luxon';
import { stripHtml } from 'string-strip-html';
import { PostResponse } from '../../types/postmodel.ts';

interface PostCardProps {
    post: PostResponse;
}

export function PostCard({ post }: PostCardProps) {
    const navigate = useNavigate();

    return (
        <div className="post-card">
            <button className="post-card-clickable" onClick={() => navigate('/post/' + post.id)}>
                <div className="post-box-left">
                    <div className="info-box">
                        <div className="author-box">
                            <img className="author-avatar-card" src={post.author.avatar?.url} />
                            <h4>{post.author.firstName + ' ' + post.author.lastName}</h4>
                        </div>
                        <h4>{DateTime.fromJSDate(new Date(post.createdAt)).toLocaleString(DateTime.DATE_MED)}</h4>
                    </div>
                    <h2>{post.title}</h2>
                    <p className="post-description">
                        {stripHtml(post.content).result.split(' ').slice(0, 28).join(' ') + ' ...'}
                    </p>
                    <p className="post-comments-count">{post.commentCount + ' comments'}</p>
                </div>
                <div className="post-box-right">
                    <img className="photo-thumbnail" src={post.image?.url} />
                </div>
            </button>
        </div>
    );
}
