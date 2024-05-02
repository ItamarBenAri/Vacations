import "./Home.css";
import VacationList from "../../VacationsArea/VacationList/VacationList";
import useTitle from "../../../Utils/UseTitle";

function Home(): JSX.Element {

    // Set title to the page
    useTitle("Vacations | Home");

    return (
        <div className="Home">
            <VacationList />
        </div>
    );
}

export default Home;
