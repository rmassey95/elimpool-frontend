import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function Homepage() {
    const [users, setUsers] = useState([]);
    const [userPick, setUserPick] = useState({});
    const [loading, setLoading] = useState(true);

    const getUsers = async () => {
        const getUsers = await fetch("http://localhost:5000/");

        const getUsersJson = await getUsers.json();

        setUsers(getUsersJson);
    };

    const getUserCurrentSelection = async () => {
        const userSelection = await fetch(
            "http://localhost:5000/user/current-selection",
            {
                method: "GET",
                // credentials set to include allows cookies to be passed through request
                credentials: "include",
            }
        );

        const userSelectionJSON = await userSelection.json();

        setUserPick(userSelectionJSON);
        setLoading(false);
    };

    useEffect(() => {
        getUsers();
        getUserCurrentSelection();
    }, []);

    if (loading) {
        return <div className="loading"></div>;
    } else {
        return (
            <>
                <Navbar />

                <div className="container mt-4">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th
                                    style={{ width: "25%" }}
                                    scope="col"
                                    className="fs-2"
                                >
                                    Username
                                </th>
                                <th scope="col" className="fs-2">
                                    Picks
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0
                                ? users.map((user) => {
                                      return (
                                          <tr key={user._id}>
                                              <td className="fs-4">
                                                  {user.username}
                                              </td>
                                              {user.teamsPicked.map(
                                                  (team, indx) => {
                                                      return (
                                                          <td
                                                              className="fs-4"
                                                              key={indx}
                                                          >
                                                              {team}
                                                          </td>
                                                      );
                                                  }
                                              )}
                                          </tr>
                                      );
                                  })
                                : null}
                        </tbody>
                    </table>
                    {"currentSelection" in userPick ? <Link to="/picks">
                            <button
                                type="button"
                                className="btn btn-primary fs-3 my-4"
                            >
                                Click here pick a team
                            </button>
                        </Link> : ""}
                    {"currentSelection" in userPick ? (
                        userPick.currentSelection.length > 0 ? (
                            <h2>
                                My Pick for this week:{" "}
                                {userPick.currentSelection}
                            </h2>
                        ) : (
                            <h2>You have not picked a team for this week</h2>
                        )
                    ) : (
                        <h2>Login to see your pick for this week</h2>
                    )}
                </div>
            </>
        );
    }
}

export default Homepage;
