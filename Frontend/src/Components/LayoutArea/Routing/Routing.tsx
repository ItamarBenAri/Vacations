import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../HomeArea/Home/Home";
import Page404 from "../page404/page404";
import "./Routing.css";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import { UserModel } from "../../../Models/UserModel";
import { EditVacation } from "../../VacationsArea/EditVacation/EditVacation";
import VacationsReport from "../../ReportsArea/VacationsReport/VacationsReport";

function Routing(): JSX.Element {

    const user = useSelector<AppState, UserModel>(appState => appState.user);

    return (
        <div className="Routing">

            <Routes>

                {/* Register: */}
                <Route path="/register" element={<Register />} />

                {/* Login: */}
                <Route path="/login" element={<Login />} />

                {/* Home: */}
                <Route path="/home" element={<Home />} />

                {/* Add Vacation: */}
                <Route path="/new" element={<AddVacation />} />

                {/* Edit Vacation: */}
                <Route path="/edit/:vacationId" element={<EditVacation />} />

                {/* Vacations Report: */}
                <Route path="/reports/vacations" element={<VacationsReport />} />

                {/* Default Route: */}
                {user ? <Route path="/" element={<Navigate to="/home" />} /> : <Route path="/" element={<Navigate to="/login" />} />}

                {/* Page not found routes: */}
                <Route path="/pageNotFound" element={<Page404 />} />
                <Route path="*" element={<Page404 />} />

            </Routes>

        </div>
    );
}

export default Routing;
