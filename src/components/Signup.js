import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = ({backendURL}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Send login POST req to backend
        const registerRes = await fetch(`${backendURL}signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        if (registerRes.status === 200) {
            // success, go to login page
            navigate("/login");
            return;
        }

        // Fail to register, send error msg to user
        const resData = await registerRes.json();
        console.log(resData);
        return;
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <label className="form-label" htmlFor="username">
                        Username
                    </label>
                </div>

                <div className="form-outline mb-4">
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <label className="form-label" htmlFor="password">
                        Password
                    </label>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary btn-block login-btn mb-4"
                >
                    Register
                </button>
            </form>
            <Link to="/" className="btn btn-secondary">
                Back to home
            </Link>
        </div>
    );
};

export default Signup;
