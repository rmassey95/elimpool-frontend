import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function Homepage() {
    const [users, setUsers] = useState([]);
    const [userInfo, setUserInfo] = useState();
    const [loading, setLoading] = useState(true);

    const getUsersAndUserInfo = async () => {
        const getUsers = await fetch("http://localhost:5000/");

        const getUsersJson = await getUsers.json();

        setUsers(getUsersJson);

        const user = await fetch("http://localhost:5000/user", {
            method: "GET",
            // credentials set to include allows cookies to be passed through request
            credentials: "include",
        });

        const userJSON = await user.json();
        if (user.status !== 401) {
            userJSON.userAuthenticated = true;
        }

        setUserInfo(userJSON);
        setLoading(false);
    };

    useEffect(() => {
        getUsersAndUserInfo();
    }, []);

    if (loading) {
        return <div className="loading"></div>;
    } else {
        const weeks = [];

        if (users[0].teamsPicked.length > 0) {
            for (let index = 1; index <= users[0].teamsPicked.length; index++) {
                weeks.push(<td key={index}>Week {index}</td>);
            }
        } else {
            weeks.push(<td>No Picks To Display</td>);
        }

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
                                    User
                                </th>
                                <th scope="col" className="fs-2">
                                    Picks
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-0"></td>
                                {weeks}
                            </tr>
                            {users.length > 0
                                ? users.map((user) => {
                                      return (
                                          <tr
                                              key={user._id}
                                              className={
                                                  !user.active
                                                      ? "table-danger"
                                                      : ""
                                              }
                                          >
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
                    {"currentSelection" in userInfo && userInfo.active ? (
                        <Link to="/picks">
                            <button
                                type="button"
                                className="btn btn-primary fs-3 my-4"
                            >
                                Click here pick a team
                            </button>
                        </Link>
                    ) : (
                        userInfo.userAuthenticated && (
                            <h2>You can no longer pick a team.</h2>
                        )
                    )}
                    {"currentSelection" in userInfo ? (
                        userInfo.currentSelection.length > 0 ? (
                            <h2>
                                My Pick for this week:{" "}
                                {userInfo.currentSelection}
                            </h2>
                        ) : (
                            userInfo.active && (
                                <h2>
                                    You have not picked a team for this week
                                </h2>
                            )
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
