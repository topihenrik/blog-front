import React, {useEffect} from "react";
import { useNavigate } from 'react-router-dom';

export default function SignUpSuccess() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {navigate("/login", {replace: true});}, 5000);
    }, []);

    return(
        <div className="signup-success">
            <div className="signup-success-box">
                <div className="success-title-box">
                    <h2>Account Created 👏</h2>
                </div>
                <p>Proceed to login so you may partake in discussions with other users.</p>
            </div>
        </div>
    )
}