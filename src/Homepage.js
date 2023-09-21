import { useState, useEffect } from "react";

function Homepage() {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const getUsers = await fetch("http://localhost:5000/");

        const getUsersJson = await getUsers.json();

        setUsers(getUsersJson);
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <div class="container mt-4">
                <div class="row ">
                    <div class="col"><button type="button" class="btn btn-primary fs-3">Login</button></div>
                    <div class="col text-end"><button type="button" class="btn btn-secondary fs-3">Logout</button></div>
                </div>
            </div>
            <div className="container mt-4">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th style={{ width: "25%" }} scope="col">
                                Username
                            </th>
                            <th scope="col">Picks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0
                            ? users.map((user) => {
                                  return (
                                      <tr key={user._id}>
                                          <td>{user.username}</td>
                                          {user.teamsPicked.map(
                                              (team, indx) => {
                                                  return (
                                                      <td key={indx}>{team}</td>
                                                  );
                                              }
                                          )}
                                      </tr>
                                  );
                              })
                            : null}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Homepage;
