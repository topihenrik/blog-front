import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import uploadIcon from '../../icons/file_upload.png';
import LoadingIcon from '../../icons/loading.svg';
import { useUserBasicPutMutation, useUserPasswordPutMutation, useUserQuery } from '../../api/queries/userqueries.ts';
import { Avatar as AvatarType } from '../../types/usermodel.ts';
import { Errors } from '../General/Errors.tsx';
import { useUserContext } from '../../hooks/useUserContext.tsx';

function generateYears() {
    const loopYears = [];
    for (let i = new Date().getFullYear(); i >= 1900; i--) {
        loopYears.push(i);
    }

    return loopYears;
}

interface DateOfBirthProps {
    value: string;
    onChange: (year: number, month: number, day: number) => void;
}

function DateOfBirth({ value, onChange }: DateOfBirthProps) {
    const inputYears = useMemo(generateYears, [generateYears]);
    const [year, setYear] = useState(1970);
    const [month, setMonth] = useState(1);
    const [day, setDay] = useState(1);

    useEffect(() => {
        setYear(new Date(value).getFullYear());
        setMonth(() => new Date(value).getMonth() + 1);
        setDay(new Date(value).getDate());
    }, [value]);

    useEffect(() => {
        onChange(year, month, day);
    }, [year, month, day, onChange]);

    return (
        <div className="signup-dob-box">
            <p>Date of Birth</p>
            <div className="signup-select-box">
                <select
                    value={day}
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
                    value={month}
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
                    value={year}
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
    avatar: AvatarType;
    onChange: (file: File | null) => void;
}

function Avatar({ file, avatar, onChange }: AvatarProps) {
    return (
        <div className="signup-avatar-box">
            <label className="signup-avatar-label" htmlFor="avatar">
                <img id="upload-icon" src={uploadIcon} />
                <span className="signup-avatar-span">
                    {file ? file.name : avatar.originalName ? avatar.originalName : 'Avatar image'}
                </span>
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

export function ProfileEdit() {
    const navigate = useNavigate();
    const userContext = useUserContext();
    const user = useUserQuery();
    const userBasic = useUserBasicPutMutation();
    const userPassword = useUserPasswordPutMutation();
    const [file, setFile] = useState<File | null>(null);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [dob, setDob] = useState('');

    useEffect(() => {
        if (user.data) {
            setFirstName(user.data.user.first_name);
            setLastName(user.data.user.last_name);
            setEmail(user.data.user.email);
        }
    }, [user.data]);

    function handleFileChange(value: File | null) {
        setFile(value);
    }

    function handleDobChange(year: number, month: number, day: number) {
        const isoDate =
            year.toString().padStart(2, '0') +
            '-' +
            month.toString().padStart(2, '0') +
            '-' +
            day.toString().padStart(2, '0');
        setDob(isoDate);
    }

    useEffect(() => {
        if (!userContext.token) {
            navigate('/login', { replace: true });
        }
    }, [navigate, userContext.token]);

    function handleSubmitBasic() {
        userBasic.mutate(
            {
                first_name: firstName,
                last_name: lastName,
                email,
                dob,
                avatar: file,
            },
            {
                onSuccess: () => {
                    navigate('/profile', { replace: true });
                },
            }
        );
    }

    function handleSubmitPassword() {
        userPassword.mutate(
            {
                old_password: oldPassword,
                password,
                password_confirm: passwordConfirm,
            },
            {
                onSuccess: () => {
                    userContext.clear();
                    navigate('/login', { replace: true });
                },
            }
        );
    }

    const isLoading = useMemo(
        () => user.isPending || userBasic.isPending || userPassword.isPending,
        [user.isPending, userBasic.isPending, userPassword.isPending]
    );

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
            <main className="profile-edit-main">
                <div className="profile-edit-container">
                    <div className="profile-edit-title-box">
                        <h2>Edit Information</h2>
                    </div>
                    <div className="profile-forms">
                        <form className="profile-form">
                            <h2>Basic Information</h2>
                            <input
                                value={firstName}
                                onChange={({ target }) => setFirstName(target.value)}
                                className="text-input"
                                name="first_name"
                                placeholder="First Name"
                            />
                            <input
                                value={lastName}
                                onChange={({ target }) => setLastName(target.value)}
                                className="text-input"
                                name="last_name"
                                placeholder="Last Name"
                            />
                            <input
                                value={email}
                                onChange={({ target }) => setEmail(target.value)}
                                className="text-input"
                                name="email"
                                placeholder="Email"
                            />
                            <DateOfBirth value={user.data.user.dob} onChange={handleDobChange} />
                            <Avatar file={file} avatar={user.data.user.avatar} onChange={handleFileChange} />
                            <Errors errors={userBasic.error} />
                            <button
                                type="button"
                                onClick={handleSubmitBasic}
                                className="profile-edit-button"
                                disabled={isLoading}
                                style={isLoading ? { cursor: 'wait' } : {}}>
                                Update
                            </button>
                        </form>
                        <form className="profile-form">
                            <h2>Change Password</h2>
                            <input
                                value={oldPassword}
                                onChange={({ target }) => setOldPassword(target.value)}
                                className="text-input"
                                type="password"
                                name="old_password"
                                placeholder="Old Password"
                                required
                            />
                            <input
                                value={password}
                                onChange={({ target }) => setPassword(target.value)}
                                className="text-input"
                                type="password"
                                name="password"
                                placeholder="New Password"
                                required
                            />
                            <input
                                value={passwordConfirm}
                                onChange={({ target }) => setPasswordConfirm(target.value)}
                                className="text-input"
                                type="password"
                                name="password_confirm"
                                placeholder="Confirm New Password"
                                required
                            />
                            <Errors errors={userPassword.error} />
                            <button
                                type="button"
                                onClick={handleSubmitPassword}
                                className="profile-edit-button"
                                disabled={isLoading}
                                style={isLoading ? { cursor: 'wait' } : {}}>
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        );
    }
}
