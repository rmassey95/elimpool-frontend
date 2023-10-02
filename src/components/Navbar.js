import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = ({loggedStatus}) => {
    const navigate = useNavigate();

    // log user out
    const logout = async () => {
        // remove token
        localStorage.removeItem("token");

        navigate("/login");
    };

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
