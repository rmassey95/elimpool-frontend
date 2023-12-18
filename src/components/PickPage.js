import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const fullTeamNames = require("../../teams");

const PickPage = ({ backendURL }) => {
    const [userInfo, setUserInfo] = useState();
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pick, setPick] = useState();
    const navigate = useNavigate();

    // get login token
    const token = localStorage.getItem("token");

    const getUserInfo = async () => {
        if (token) {
            // get user info
            const getUserData = await fetch(`${backendURL}/user`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const userData = await getUserData.json();

            setUserInfo(userData);
            setPick(userData.currentSelection);
        }

        setLoading(false);
    };

    const getGames = async () => {
        // get nhl games for the Saturday
        const gamesDataRes = await fetch(`${backendURL}/games`);

        const gamesData = await gamesDataRes.json();

        setGames(gamesData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (token) {
            // update the current selection for the logged user
            const selectionRes = await fetch(`${backendURL}/update-selection`, {
                method: "POST",
                body: JSON.stringify({
                    selection: pick,
                }),
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (selectionRes.status === 200) {
                // success
                navigate("/");
                return;
            }
            navigate("/");
        }
        navigate("/");

        return;
    };

    useEffect(() => {
        getUserInfo();
        getGames();
    }, []);

    const handlePickChange = (e) => {
        setPick(e.target.value);
    };

    if (loading) {
        return (
            <div className="loading">
                <div className="loading-spinner"></div>
            </div>
        );
    } else {
        return (
            <div className="container">
                <h1 className="mt-4 text-center">Picks Page</h1>
                <h2>User: {userInfo.username}</h2>
                <div className="row mt-3 p-2">
                    <div className=" border py-3">
                        <form onSubmit={handleSubmit}>
                            {" "}
                            <h3 className="text-center mb-4">
                                <u>Games</u>
                            </h3>
                            <div className="container text-center p-0">
                                {games.map((game) => {
                                    return (
                                        <div
                                            className="d-flex align-items-center"
                                            key={game._id}
                                        >
                                            <div style={{ width: "45%" }}>
                                                <input
                                                    type="radio"
                                                    className="btn-check"
                                                    name="team-options"
                                                    id={game.awayTeam}
                                                    autoComplete="off"
                                                    value={game.awayTeam}
                                                    checked={
                                                        pick === game.awayTeam
                                                    }
                                                    disabled={userInfo.teamsPicked.includes(
                                                        game.awayTeam
                                                    )}
                                                    onChange={handlePickChange}
                                                />
                                                <label
                                                    className="btn team-text"
                                                    htmlFor={game.awayTeam}
                                                >
                                                    {
                                                        fullTeamNames[
                                                            game.awayTeam
                                                        ]
                                                    }
                                                </label>
                                            </div>
                                            <div style={{ width: "10%" }}>
                                                <h4 className="m-0">AT</h4>
                                            </div>
                                            <div style={{ width: "45%" }}>
                                                <input
                                                    type="radio"
                                                    className="btn-check"
                                                    name="team-options"
                                                    id={game.homeTeam}
                                                    autoComplete="off"
                                                    value={game.homeTeam}
                                                    checked={
                                                        pick === game.homeTeam
                                                    }
                                                    disabled={userInfo.teamsPicked.includes(
                                                        game.homeTeam
                                                    )}
                                                    onChange={handlePickChange}
                                                />
                                                <label
                                                    className="btn team-text"
                                                    htmlFor={game.homeTeam}
                                                >
                                                    {
                                                        fullTeamNames[
                                                            game.homeTeam
                                                        ]
                                                    }
                                                </label>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="btn btn-primary fs-5 mt-4"
                                >
                                    Submit Pick
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="text-center mt-4">
                        <h3 className="mb-4">Teams previously picked</h3>
                        {userInfo.teamsPicked.map((team, indx) => {
                            return <h4 key={indx}>{team}</h4>;
                        })}
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <Link to="/" className="fs-5 btn btn-secondary mb-4">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }
};

export default PickPage;
