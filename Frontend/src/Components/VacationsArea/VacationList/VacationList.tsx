import { SetStateAction, useEffect, useState } from "react";
import { VacationModel } from "../../../Models/VacationModel";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationList.css";
import { vacationsService } from "../../../Services/VacationsService";
import { notify } from "../../../Utils/Notify";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import { UserModel } from "../../../Models/UserModel";
import { useNavigate } from "react-router-dom";
import { WebsitePagination } from "../../HomeArea/WebsitePagination/WebsitePagination";
import { Box, Checkbox } from "@mui/joy";
import Divider from "@mui/material/Divider";
import VacationsComponentsStyle from "../../../Theme/VacationsComponentsStyle";
import { SkeletonCard } from "../../SharedArea/SkeletonCard/SkeletonCard";
import imageSrc from "../../../Assets/Images/no-result.gif";

function VacationList(): JSX.Element {

    // Defined component variables:
    const globalStateVacations = useSelector<AppState, VacationModel[]>(appState => appState.vacations);
    const user = useSelector<AppState, UserModel>(appState => appState.user);
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [checkboxesIsChecked, setCheckboxesIsChecked] = useState<string>("");
    const [vacationsIsFiltered, setVacationsIsFiltered] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) { // If user no exist
            notify.error("You are not logged in");
            navigate("/login");
            return;
        }
        if (globalStateVacations.length > 1) { // length > 1 is for add vacation case
            setVacations(globalStateVacations);
            return;
        }
        vacationsService.getAllVacations() // If global vacations not exist
            .then(vacations => setVacations(vacations))
            .catch(err => notify.error(err));
    }, []);

    const handleChangeToFavoritesVacations = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setVacations(globalStateVacations.filter(v => v.isLiked === 1));
            setVacationsIsFiltered(true);
            setCheckboxesIsChecked("favorites");
        }
        else {
            setVacationsIsFiltered(false);
            setVacations(globalStateVacations);
            setCheckboxesIsChecked("");
        }
    }

    const handleChangeToFutureVacations = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const now = new Date().getTime();
            setVacations(globalStateVacations.filter(v => new Date(v.startVacation).getTime() > now));
            setVacationsIsFiltered(true);
            setCheckboxesIsChecked("future");
        }
        else {
            setVacationsIsFiltered(false);
            setVacations(globalStateVacations);
            setCheckboxesIsChecked("");
        }
    }

    const handleChangeToVacationsInAction = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const now = new Date().getTime();
            setVacations(globalStateVacations.filter(v => new Date(v.startVacation).getTime() <= now && new Date(v.endVacation).getTime() >= now));
            setVacationsIsFiltered(true);
            setCheckboxesIsChecked("inAction");
        }
        else {
            setVacationsIsFiltered(false);
            setVacations(globalStateVacations);
            setCheckboxesIsChecked("");
        }
    }

    if (!vacations.length && !checkboxesIsChecked) { // Set card skeleton when data loading
        return (
            <div>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </div>
        )
    };

    return (
        <div className="VacationList">
            <div>
                <Box sx={VacationsComponentsStyle.listMainBox}>
                    {user.roleId !== 1 && // Hide favorite checkbox if admin
                        <Checkbox label="My Favorites"
                            color="primary"
                            onChange={handleChangeToFavoritesVacations}
                            checked={checkboxesIsChecked === "favorites"} // Checked only if other checkboxes not checked
                        />}
                    <Checkbox label="Future Vacations"
                        color="primary"
                        onChange={handleChangeToFutureVacations}
                        checked={checkboxesIsChecked === "future"} // Checked only if other checkboxes not checked
                    />
                    <Checkbox label="Vacations in Action"
                        color="primary"
                        onChange={handleChangeToVacationsInAction}
                        checked={checkboxesIsChecked === "inAction"} // Checked only if other checkboxes not checked
                    />
                </Box>
                <Divider variant="middle" />
                {(checkboxesIsChecked && !vacations.length) &&
                    <div>
                        <img src={imageSrc} />
                    </div>
                }
                {vacations.map(v => <VacationCard key={v.id} vacation={v} user={user} vacationsIsFiltered={vacationsIsFiltered} />)}
                {!checkboxesIsChecked &&
                    <WebsitePagination
                        setVacations={(p: SetStateAction<VacationModel[]>) => setVacations(p)}
                    />}
            </div>
        </div>
    );
}

export default VacationList;
