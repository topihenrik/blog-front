import { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router';
import addIcon from '../../icons/add.png';
import LoadingIcon from '../../icons/loading.svg';
import { HeroScreen } from './HeroScreen.jsx';
import { PostCardEdit } from './PostCardEdit.jsx';
import { usePostsByAuthorQuery } from '../../api/queries/postqueries.ts';
import { useTokenLocalStorage } from '../../hooks/useTokenLocalStorage.ts';

export function YourStories() {
    const navigate = useNavigate();
    const [token] = useTokenLocalStorage();
    const posts = usePostsByAuthorQuery();

    useEffect(() => {
        if (!token) {
            navigate('/login', { replace: false });
        }
    }, [navigate, token]);

    if (posts.error) {
        return (
            <div className="error-main">
                <div className="error-container">
                    <h2>Error has occurred</h2>
                </div>
            </div>
        );
    } else if (posts.isPending) {
        return (
            <div className="loading-main">
                <HeroScreen />
                <div className="loading-container">
                    <div className="loading-icon-box">
                        <img id="loading-icon" src={LoadingIcon} />
                    </div>
                    <p>Loading Posts...</p>
                </div>
            </div>
        );
    } else if (!posts.data) {
        return (
            <div className="no-content-main">
                <HeroScreen />
                <div className="no-content-container">
                    <div className="post-create-box">
                        <a>
                            <button onClick={() => navigate('/post/create')} id="newPostBtn">
                                <img id="add-icon" src={addIcon} />
                                New Post
                            </button>
                        </a>
                    </div>
                    <h2>No posts found</h2>
                    <p>🥇 Share your ideas and make your first post!</p>
                </div>
            </div>
        );
    } else {
        return (
            <main className="edit-home-main">
                <HeroScreen />
                <div className="edit-posts-box">
                    <div className="edit-post-create-box">
                        <a>
                            <button onClick={() => navigate('/post/create')} id="newPostBtn">
                                <img id="add-icon" src={addIcon} />
                                New Post
                            </button>
                        </a>
                    </div>
                    {posts.data.map((post) => {
                        return (
                            <Fragment key={post._id}>
                                <PostCardEdit post={post} />
                            </Fragment>
                        );
                    })}
                </div>
            </main>
        );
    }
}
