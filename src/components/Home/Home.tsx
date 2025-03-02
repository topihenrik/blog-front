import LoadingIcon from '../../icons/loading.svg';
import { useNavigate } from 'react-router';
import { HeroScreen } from './HeroScreen.jsx';
import { PostCard } from './PostCard.jsx';
import { usePostsQuery } from '../../api/queries/postqueries.ts';
import { Fragment } from 'react';
import { useUserContext } from '../../hooks/useUserContext.tsx';

export function Home() {
    const navigate = useNavigate();
    const userContext = useUserContext();
    const posts = usePostsQuery();

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
                    <p>Loading...</p>
                </div>
            </div>
        );
    } else if (!posts.data) {
        return (
            <div className="no-content-main">
                <HeroScreen />
                <div className="no-content-container">
                    <h2>No posts found</h2>
                    <p>🥇 Be the first creator to make a post!</p>
                    {userContext.token ? (
                        <div>
                            <a>
                                <button onClick={() => navigate('/edit')} className="action-button">
                                    Your Stories 📖
                                </button>
                            </a>
                        </div>
                    ) : (
                        <div>
                            <a>
                                <button onClick={() => navigate('/signup')} className="action-button">
                                    Join now
                                </button>
                            </a>
                        </div>
                    )}
                </div>
            </div>
        );
    } else {
        return (
            <main className="home-main">
                <HeroScreen />
                <div className="posts-box">
                    <div className="posts-title-box">
                        <h2 className="posts-title">Shared ideas</h2>
                        {userContext.token ? (
                            <div>
                                <a>
                                    <button onClick={() => navigate('/edit')} className="action-button">
                                        Your Stories 📖
                                    </button>
                                </a>
                            </div>
                        ) : (
                            <div>
                                <a>
                                    <button onClick={() => navigate('/signup')} className="action-button">
                                        Join now
                                    </button>
                                </a>
                            </div>
                        )}
                    </div>
                    {posts.data.map((post, i) => {
                        if (i + 1 === posts.data.length) {
                            return (
                                <Fragment key={post._id}>
                                    <PostCard post={post} />
                                </Fragment>
                            );
                        } else {
                            return (
                                <Fragment key={post._id}>
                                    <PostCard post={post} />
                                    <hr className="post-hr" />
                                </Fragment>
                            );
                        }
                    })}
                </div>
            </main>
        );
    }
}
