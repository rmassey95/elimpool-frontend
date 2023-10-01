import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = ({backendURL}) => {
    const [loggedStatus, setLoggedStatus] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getUserStatus = async () => {
        // get login token
        const token = localStorage.getItem("token");
        if (token) {
            // get status of user, logged in or not
            const loginStatusRes = await fetch(`${backendURL}/login/status`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (loginStatusRes.status === 200) {
                // user logged in
                const loginStatus = await loginStatusRes.json();
                setLoggedStatus(loginStatus);
            } else {
                setLoggedStatus();
            }
        }
        setLoading(false);
    };

    // log user out
    const logout = async () => {
        // remove token
        localStorage.removeItem("token");

        setLoggedStatus();
        navigate("/login");
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
