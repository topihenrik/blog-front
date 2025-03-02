import { useState, useEffect, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router';
import { useLoginMutation } from '../../api/queries/authqueries.ts';
import { Errors } from '../General/Errors.tsx';
import { useUserContext } from '../../hooks/useUserContext.tsx';

export function LogIn() {
    const navigate = useNavigate();
    const login = useLoginMutation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userContext = useUserContext();

    useEffect(() => {
        if (userContext.token) {
            navigate('/', { replace: true });
        }
    }, [navigate, userContext.token]);

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        login.mutate(
            {
                email,
                password,
            },
            {
                onSuccess: () => {
                    navigate(document.referrer);
                },
            }
        );
    };

    return (
        <main className="login-main">
            <div className="login-box">
                <div className="login-title-box">
                    <h2>Log In</h2>
                </div>
                <form className="login-form">
                    <input
                        onChange={({ target }) => setEmail(target.value)}
                        value={email}
                        className="text-input"
                        id="email"
                        name="email"
                        required={true}
                        type="email"
                        placeholder="Email"
                    />
                    <input
                        onChange={({ target }) => setPassword(target.value)}
                        value={password}
                        className="text-input"
                        id="password"
                        name="password"
                        required={true}
                        type="password"
                        placeholder="Password"
                    />
                    <Errors errors={login.error} />
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={login.isPending}
                        style={login.isPending ? { cursor: 'wait' } : {}}>
                        Log In
                    </button>
                </form>
            </div>
        </main>
    );
}
