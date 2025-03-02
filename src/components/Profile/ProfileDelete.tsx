import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import LoadingIcon from '../../icons/loading.svg';
import { useUserDeleteMutation, useUserQuery } from '../../api/queries/userqueries.ts';
import { Errors } from '../General/Errors.tsx';
import { useUserContext } from '../../hooks/useUserContext.tsx';

export function ProfileDelete() {
    const navigate = useNavigate();
    const userContext = useUserContext();
    const user = useUserQuery();
    const userDelete = useUserDeleteMutation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (!userContext.token) {
            navigate('/login', { replace: true });
        }
    }, [navigate, userContext.token]);

    function handleSubmit() {
        userDelete.mutate(
            {
                password,
                email,
            },
            {
                onSuccess: () => {
                    userContext.clear();
                    navigate('/login', { replace: true });
                },
            }
        );
    }

    const isLoading = useMemo(() => user.isPending || userDelete.isPending, [user.isPending, userDelete.isPending]);

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
            <main className="profile-delete-main">
                <div className="profile-delete-container">
                    <div className="profile-delete-title-box">
                        <h2>Delete Account</h2>
                    </div>
                    <div className="profile-delete-content-box">
                        <div className="profile-delete-information">
                            <p>
                                {user.data.user.first_name +
                                    ' ' +
                                    user.data.user.last_name +
                                    ', you have made ' +
                                    user.data.postCount +
                                    ' posts and ' +
                                    user.data.commentCount +
                                    ' comments and when you delete this account they will be deleted aswell.'}
                            </p>
                        </div>
                        <form className="profile-delete-form">
                            <h3>Account deletion is an irreversible action.</h3>
                            <p>Write your creditentials address to confirm the deletion:</p>
                            <div className="profile-delete-form-div">
                                <input
                                    value={email}
                                    onChange={({ target }) => setEmail(target.value)}
                                    name="email"
                                    type="text"
                                    placeholder="Email"
                                    id="confirmation"
                                    className="profile-delete-input"
                                />
                                <input
                                    value={password}
                                    onChange={({ target }) => setPassword(target.value)}
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    className="profile-delete-input"
                                />
                            </div>
                            <Errors errors={userDelete.error} />
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="profile-delete-button"
                                disabled={isLoading}
                                style={isLoading ? { cursor: 'wait' } : {}}>
                                Delete
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        );
    }
}
