import LoadingIcon from '../../icons/loading.svg';
import { DateTime } from 'luxon';
import { useParams } from 'react-router';
import { usePostByIdQuery } from '../../api/queries/postqueries.ts';

export function PostContent() {
    const { postid } = useParams();
    const post = usePostByIdQuery(postid);

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
            <div className="post-full">
                <div className="info-box">
                    <div className="author-box">
                        <img className="author-avatar-full" src={post.data.author?.avatar?.url} />
                        <h4>{post.data.author.firstName + ' ' + post.data.author.lastName}</h4>
                    </div>
                    <h4 className="post-timestamp">
                        <span className="post-timestamp-original">
                            {DateTime.fromJSDate(new Date(post.data.createdAt)).toLocaleString(DateTime.DATE_MED)}
                        </span>
                        {post.data.updatedAt && '*'}
                        {post.data.updatedAt && (
                            <span className="post-timestamp-edit-tooltip">
                                <p className="p-edit-timestamp">
                                    {'Edited: ' +
                                        DateTime.fromJSDate(new Date(post.data.updatedAt)).toLocaleString(
                                            DateTime.DATETIME_SHORT
                                        )}
                                </p>
                            </span>
                        )}
                    </h4>
                </div>
                <img className="post-cover-photo" src={post.data.image?.url} />
                <h1>{post.data.title}</h1>
                <div className="post-text-container" dangerouslySetInnerHTML={{ __html: post.data.content }}></div>
            </div>
        );
    }
}
