import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [loggedStatus, setLoggedStatus] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getUserStatus = async () => {
        const loginRes = await fetch("http://localhost:5000/login/status", {
            method: "GET",
            // credentials set to include allows cookies to be passed through request
            credentials: "include",
        });

        if (loginRes.status === 200) {
            // user logged in
            const userRes = await loginRes.json();
            setLoggedStatus(userRes);
        } else {
            setLoggedStatus();
        }
        setLoading(false);
    };

    // log user out
    const logout = async () => {
        await fetch("http://localhost:5000/logout", {
            method: "POST",
            credentials: "include",
        });
        setLoggedStatus();
        navigate("/");
    };

    useEffect(() => {
        getUserStatus();
    }, []);

    if (loading) {
        return <div></div>;
    }
    if (!loggedStatus) {
        return (
            <div className="container mt-4">
                <div className="row">
                    <div className="col">
                        <Link to="/login">
                            <button
                                type="button"
                                className="btn btn-primary fs-3"
                            >
                                Login
                            </button>
                        </Link>
                    </div>
                    <div className="col text-end">
                        <Link to="/register">
                            <button
                                type="button"
                                className="btn btn-secondary fs-3"
                            >
                                Register
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container mt-4">
                <button onClick={logout} className="btn btn-danger fs-3">
                    Logout
                </button>
            </div>
        );
    }
};

export default Navbar;
