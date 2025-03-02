import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import EditIcon from '../../icons/edit.png';
import DeleteIcon from '../../icons/delete.png';
import LoadingIcon from '../../icons/loading.svg';
import { DateTime } from 'luxon';
import { useUserQuery } from '../../api/queries/userqueries.ts';
import { useTokenLocalStorage } from '../../hooks/useTokenLocalStorage.ts';

export function Profile() {
    const navigate = useNavigate();
    const [token] = useTokenLocalStorage();

    const user = useUserQuery();

    useEffect(() => {
        if (!token) {
            navigate('/login', { replace: true });
        }
    }, [navigate, token]);

    if (user.error) {
        return (
            <div className="error-main">
                <div className="error-container">
                    <h2>Error has occurred</h2>
                </div>
            </div>
        );
    } else if (user.isPending) {
        return (
            <div className="loading-main">
                <div className="loading-container">
                    <div className="loading-icon-box">
                        <img id="loading-icon" src={LoadingIcon} />
                    </div>
                    <p>Loading...</p>
                </div>
            </div>
        );
    } else if (!user.data) {
        return (
            <div className="no-content-main">
                <div className="no-content-container">
                    <h2>No profile found</h2>
                    <p>Something went wrong.</p>
                </div>
            </div>
        );
    } else {
        return (
            <main className="profile-main">
                <div className="profile-container">
                    <div className="profile-title-box">
                        <h2>{'Hello, ' + user.data.user.first_name + ' ' + user.data.user.last_name + '! 👋'}</h2>
                    </div>
                    <div className="profile-content-box">
                        <p>
                            {'Since the creation of your account ' +
                                Math.floor(
                                    -1 *
                                        DateTime.fromJSDate(new Date(user.data.user.creation_date)).diffNow('days').days
                                ) +
                                ' days ago, you have created ' +
                                user.data.postCount +
                                ' posts and ' +
                                user.data.commentCount +
                                ' comments.'}
                        </p>
                        <div className="profile-personal-information">
                            <h2>Personal Information</h2>
                            <div className="profile-personal-box">
                                <div className="profile-personal-text">
                                    <p>{'First Name: ' + user.data.user.first_name}</p>
                                    <p>{'Last Name: ' + user.data.user.last_name}</p>
                                    <p>{'Email: ' + user.data.user.email}</p>
                                    <p>
                                        {'Date of Birth: ' +
                                            DateTime.fromJSDate(new Date(user.data.user.dob)).toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <img id="author-avatar-profile" src={user.data.user?.avatar?.url} />
                                </div>
                            </div>
                        </div>
                        <div className="profile-action-buttons">
                            <a>
                                <button onClick={() => navigate('/profile/edit')} className="profile-action-button">
                                    <img className="icon" src={EditIcon} />
                                    Edit Information
                                </button>
                            </a>
                            <a>
                                <button onClick={() => navigate('/profile/delete')} className="profile-action-button">
                                    <img className="icon" src={DeleteIcon} />
                                    Delete Account
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}
