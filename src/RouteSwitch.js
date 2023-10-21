import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PickPage from "./components/PickPage";

const RouteSwitch = () => {
    const backendURL = "https://elimpool-production.up.railway.app";

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Homepage backendURL={backendURL} />}
                />
                <Route
                    path="/login"
                    element={<Login backendURL={backendURL} />}
                />
                <Route
                    path="/register"
                    element={<Signup backendURL={backendURL} />}
                />
                <Route
                    path="/picks"
                    element={<PickPage backendURL={backendURL} />}
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default RouteSwitch;
