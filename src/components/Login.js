import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        document.querySelector(".login-btn").disabled = true;

        // Send login POST req to backend
        const loginRes = await fetch("http://localhost:5000/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        if (loginRes.status === 200) {
            // success, go to main page

            document.querySelector(".login-btn").disabled = false;
            navigate("/");
            return;
        }

        // Fail to login, send error msg to user
        if (loginRes.status === 401) {
            document.querySelector(".login-btn").disabled = false;
            setError(true);
        }
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className="container mt-5">
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

                {error ? (
                    <p className="text-danger">Invalid username or password</p>
                ) : (
                    <p></p>
                )}

                <button
                    type="submit"
                    className="btn btn-primary btn-block login-btn mb-4"
                >
                    Sign in
                </button>

                <div className="text-center">
                    <p>
                        Not a member? <Link to="/register">Register</Link>
                    </p>
                </div>
            </form>
            <Link to="/" className="btn btn-secondary">
                Back to home
            </Link>
        </div>
    );
};

export default Login;
