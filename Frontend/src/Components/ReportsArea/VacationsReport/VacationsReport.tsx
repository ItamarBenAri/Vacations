import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import { UserModel } from "../../../Models/UserModel";
import { useNavigate } from "react-router-dom";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationsService } from "../../../Services/VacationsService";
import { notify } from "../../../Utils/Notify";
import IconButton from '@mui/joy/IconButton';
import { CSVLink } from "react-csv";
import { CloudDownload } from "@mui/icons-material";
import useTitle from "../../../Utils/UseTitle";
import AppComponentsStyle from "../../../Theme/AppComponentsStyle";
import { SkeletonChart } from "../../SharedArea/SkeletonChart/SkeletonChart";

export default function VacationsReport(): JSX.Element {

    // Set title to the page
    useTitle("Vacations | Report");

    // Defined component variables:
    const chartOptions = {
        chart: {
            title: "Vacations Likes",
            subtitle: "Vacations Likes Report: 2024-2025",
        },
    };
    const user = useSelector<AppState, UserModel>(appState => appState.user);
    const [globalStateVacations, setGlobalStateVacations] = useState<VacationModel[]>(
        useSelector<AppState, VacationModel[]>(appState => appState.vacations) // Get vacations from global vacations if exist
    );
    const [vacationsReport, setVacationsReport] = useState<(string | number)[][]>([]);
    const [chartLoaded, setChartLoaded] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            notify.error("You are not logged in");
            navigate("/login"); // If user not exist
            return;
        }
        if (user?.roleId !== 1) {
            navigate("/pageNotFound"); // If is not admin
            return;
        }        
        if (globalStateVacations.length) { // If global vacations exist
            const data = filterForCsvFile(globalStateVacations);
            setVacationsReport(data);
        }
        else { // If global vacations not exist           
            vacationsService.getAllVacations()
                .then(vacations => {
                    setGlobalStateVacations(vacations);
                    const data = filterForCsvFile(vacations);
                    setVacationsReport(data);
                })
                .catch(err => notify.error(err));
        }
    }, []);

    // Organizing information for an Excel file
    function filterForCsvFile(globalArr: VacationModel[]): (string | number)[][] {
        const headersOfXY = ["Vacation", "Likes"];
        const updatedArr = globalArr.map((v: VacationModel) => [v.destination, v.likesCount]);
        updatedArr.unshift(headersOfXY);
        return updatedArr;
    }

    return (
        <div className="VacationsReport">
            {!chartLoaded && <SkeletonChart /> /* Show skeleton chart during report loading */}
            <Chart
                style={AppComponentsStyle.reportChart}
                chartType="Bar"
                data={vacationsReport}
                options={chartOptions}
                onLoad={() => setChartLoaded(true)}
            />
            {chartLoaded && /* Show chart report after loaded */
                <div style={AppComponentsStyle.flex}>
                    <div style={AppComponentsStyle.reportChartButton}>
                        <CSVLink data={vacationsReport} filename={"vacations-report.csv"}>
                            <IconButton
                                variant="solid"
                                color="success"
                                sx={AppComponentsStyle.reportIconButton}
                            >
                                <CloudDownload sx={AppComponentsStyle.getMarginRightPx(10)} />
                                CSV Report
                            </IconButton>
                        </CSVLink>
                    </div>
                </div>
            }
        </div>
    );
}
