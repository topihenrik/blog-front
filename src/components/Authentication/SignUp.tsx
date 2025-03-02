import { useState, useEffect, SyntheticEvent, useMemo } from 'react';
import { useNavigate } from 'react-router';
import uploadIcon from '../../icons/file_upload.png';
import { useSignUpMutation } from '../../api/queries/authqueries.ts';
import { Errors } from '../General/Errors.tsx';
import { useTokenLocalStorage } from '../../hooks/useTokenLocalStorage.ts';

function generateYears() {
    const loopYears = [];
    for (let i = new Date().getFullYear(); i >= 1900; i--) {
        loopYears.push(i);
    }

    return loopYears;
}

interface DateOfBirthProps {
    onChange: (year: number, month: number, day: number) => void;
}

function DateOfBirth({ onChange }: DateOfBirthProps) {
    const inputYears = useMemo(generateYears, [generateYears]);
    const [year, setYear] = useState(0);
    const [month, setMonth] = useState(0);
    const [day, setDay] = useState(0);

    useEffect(() => {
        onChange(year, month, day);
    }, [year, month, day, onChange]);

    return (
        <div className="signup-dob-box">
            <p>Date of Birth</p>
            <div className="signup-select-box">
                <select
                    onChange={({ target }) => {
                        setDay(Number(target.value));
                    }}
                    className="dob-select"
                    name="dob_day">
                    <option className="dob-option" disabled selected>
                        Day
                    </option>
                    {[
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
                        27, 28, 29, 30, 31,
                    ].map((day) => {
                        return (
                            <option className="dob-option" value={day}>
                                {day}
                            </option>
                        );
                    })}
                </select>
                <select
                    onChange={({ target }) => {
                        setMonth(Number(target.value));
                    }}
                    className="dob-select"
                    name="dob_month">
                    <option className="dob-option" disabled selected>
                        Month
                    </option>
                    <option className="dob-option" value={1}>
                        January
                    </option>
                    <option className="dob-option" value={2}>
                        February
                    </option>
                    <option className="dob-option" value={3}>
                        March
                    </option>
                    <option className="dob-option" value={4}>
                        April
                    </option>
                    <option className="dob-option" value={5}>
                        May
                    </option>
                    <option className="dob-option" value={6}>
                        June
                    </option>
                    <option className="dob-option" value={7}>
                        July
                    </option>
                    <option className="dob-option" value={8}>
                        August
                    </option>
                    <option className="dob-option" value={9}>
                        September
                    </option>
                    <option className="dob-option" value={10}>
                        October
                    </option>
                    <option className="dob-option" value={11}>
                        November
                    </option>
                    <option className="dob-option" value={12}>
                        December
                    </option>
                </select>
                <select
                    onChange={({ target }) => {
                        setYear(Number(target.value));
                    }}
                    className="dob-select"
                    name="dob_year">
                    <option className="dob-option" disabled selected>
                        Year
                    </option>
                    {inputYears.map((year) => {
                        return (
                            <option className="dob-option" value={year}>
                                {year}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
}

interface AvatarProps {
    file: File | null;
    onChange: (file: File | null) => void;
}

function Avatar({ file, onChange }: AvatarProps) {
    return (
        <div className="signup-avatar-box">
            <label className="signup-avatar-label" htmlFor="avatar">
                <img id="upload-icon" src={uploadIcon} />
                <span className="signup-avatar-span">{file ? file.name : 'Avatar image'}</span>
                <span className="signup-avatar-span">{'(max: 2MB)'}</span>
            </label>
            <input
                id="avatar"
                name="avatar"
                type="file"
                accept="image/png, image/jpeg"
                onChange={({ target }) => {
                    onChange(target.files ? target.files[0] : null);
                }}
            />
        </div>
    );
}

function SignUpSuccess() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/login', { replace: true });
        }, 5000);
    }, [navigate]);

    return (
        <div className="signup-success">
            <div className="signup-success-box">
                <div className="success-title-box">
                    <h2>Account Created 👏</h2>
                </div>
                <p>Proceed to login so you may partake in discussions with other users.</p>
            </div>
        </div>
    );
}

export function SignUp() {
    const navigate = useNavigate();
    const [token] = useTokenLocalStorage();
    const signup = useSignUpMutation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [dob, setDob] = useState('');

    useEffect(() => {
        if (token) {
            navigate('/', { replace: true });
        }
    }, [navigate, token]);

    function handleDobChange(year: number, month: number, day: number) {
        const isoDate =
            year.toString().padStart(2, '0') +
            '-' +
            month.toString().padStart(2, '0') +
            '-' +
            day.toString().padStart(2, '0');
        setDob(isoDate);
    }

    function handleFileChange(value: File | null) {
        setFile(value);
    }

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        signup.mutate({
            avatar: file ?? undefined,
            first_name: firstName,
            last_name: lastName,
            email,
            dob,
            password,
            password_confirm: passwordConfirm,
        });
    };

    if (signup.isSuccess) {
        return <SignUpSuccess />;
    }

    return (
        <main className="signup-main">
            <div className="signup-box">
                <div className="signup-title-box">
                    <h2>Sign Up</h2>
                </div>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="signup-name-box">
                        <input
                            value={firstName}
                            onChange={({ target }) => setFirstName(target.value)}
                            className="text-input"
                            name="first_name"
                            type="text"
                            placeholder="First Name"
                            required={true}
                        />
                        <input
                            value={lastName}
                            onChange={({ target }) => setLastName(target.value)}
                            className="text-input"
                            name="last_name"
                            type="text"
                            placeholder="Last Name"
                            required={true}
                        />
                    </div>
                    <input
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        className="text-input"
                        name="email"
                        type="email"
                        placeholder="Email"
                        required={true}
                    />
                    <DateOfBirth onChange={handleDobChange} />
                    <input
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        className="text-input"
                        name="password"
                        type="password"
                        placeholder="Password"
                        required={true}
                    />
                    <input
                        value={passwordConfirm}
                        onChange={({ target }) => setPasswordConfirm(target.value)}
                        className="text-input"
                        name="password_confirm"
                        type="password"
                        placeholder="Confirm Password"
                        required={true}
                    />
                    <Avatar file={file} onChange={handleFileChange} />
                    <Errors errors={signup.error} />
                    <button disabled={signup.isPending} style={signup.isPending ? { cursor: 'wait' } : {}}>
                        Sign Up
                    </button>
                </form>
            </div>
        </main>
    );
}
