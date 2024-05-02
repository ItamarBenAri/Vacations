import { UserModel } from "../Models/UserModel";
import { VacationModel } from "../Models/VacationModel";

// Application global state: 
export type AppState = {
    vacations: VacationModel[];
    user: UserModel;
};
