import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const PickPage = () => {
    const [userInfo, setUserInfo] = useState();
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pick, setPick] = useState();

    const navigate = useNavigate();

    const getUserInfo = async () => {
        const getUserData = await fetch("http://localhost:5000/user", {
            method: "GET",
            // credentials set to include allows cookies to be passed through request
            credentials: "include",
        });

        const userData = await getUserData.json();

        setUserInfo(userData);
        setPick(userData.currentSelection);
        setLoading(false);
    };

    const getGames = async () => {
        const gamesDataRes = await fetch("http://localhost:5000/games");

        const gamesData = await gamesDataRes.json();

        setGames(gamesData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const selectionRes = await fetch(
            "http://localhost:5000/update-selection",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    selection: pick,
                }),
                credentials: "include",
            }
        );

        if (selectionRes.status === 200) {
            // success
            navigate("/");
            return;
        }

        return;
    };

    const handlePickChange = (e) => {
        setPick(e.target.value);
    };

    useEffect(() => {
        getUserInfo();
        getGames();
    }, []);

    if (loading) {
        return <div className="loading"></div>;
    } else {
        return (
            <div className="container">
                <h1 className="mt-4 text-center">Picks Page</h1>
                <h2>User: {userInfo.username}</h2>
                <div className="row mt-4">
                    <div className="col-8 border p-3">
                        <form onSubmit={handleSubmit}>
                            {" "}
                            <h3 className="text-center mb-4">
                                <u>Games</u>
                            </h3>
                            <div className="container text-center">
                                {games.map((game) => {
                                    return (
                                        <div className="row" key={game._id}>
                                            <div className="col">
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
                                                    onChange={handlePickChange}
                                                />
                                                <label
                                                    className="btn"
                                                    htmlFor={game.awayTeam}
                                                >
                                                    {game.awayTeam}
                                                </label>
                                            </div>
                                            <div className="col">
                                                <h4>AT</h4>
                                            </div>
                                            <div className="col">
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
                                                    onChange={handlePickChange}
                                                />
                                                <label
                                                    className="btn"
                                                    htmlFor={game.homeTeam}
                                                >
                                                    {game.homeTeam}
                                                </label>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="btn btn-primary fs-4 mt-4"
                                >
                                    Submit Pick
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-4 text-center">
                        <h3 className="mb-4">Teams previously picked</h3>
                        {userInfo.teamsPicked.map((team, indx) => {
                            return <h4 key={indx}>{team}</h4>;
                        })}
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <Link to="/" className="fs-4 btn btn-secondary">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }
};

export default PickPage;
