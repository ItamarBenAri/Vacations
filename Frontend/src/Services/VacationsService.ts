import axios from "axios";
import appConfig from "../Utils/AppConfig";
import { appStore } from "../Redux/Store";
import { VacationModel } from "../Models/VacationModel";
import { vacationActionCreators } from "../Redux/VacationsSlice";
import { LikeModel } from "../Models/LikeModel";

class VacationsService {

    // Get all vacations from backend:
    public async getAllVacations(): Promise<VacationModel[]> {
        const user = appStore.getState().user; // Get user from global state
        if (!user) return [];
        let vacations = appStore.getState().vacations; // Get all vacations from global state
        if (vacations.length > 1) return vacations; // length > 1 it's if admin added vacation 
        const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl + user.id); // Get vacations from backend
        vacations = response.data; // Extract 
        const action = vacationActionCreators.initAll(vacations); // Create action for init all vacations 
        appStore.dispatch(action); // Send action to global state
        return vacations;
    }

    // Get one vacation: 
    public async getOneVacation(vacationId: number): Promise<VacationModel> {
        let vacations = appStore.getState().vacations; // Get vacations from global state
        let vacation = vacations.find((v: VacationModel) => v.id === vacationId);
        if (vacation) return vacation;
        const response = await axios.get<VacationModel>(appConfig.vacationsUrl + "vacation/" + vacationId); // Get that vacation from the backend
        vacation = response.data; // Extract
        return vacation;
    }

    // Add vacation: 
    public async addVacation(vacation: VacationModel): Promise<void> {
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, vacation, appConfig.axiosOptions); // Add the new vacation to backend
        const addedVacation = response.data; // Extract 
        const action = vacationActionCreators.addOne(addedVacation); // Create action for adding a vacation to the global state 
        appStore.dispatch(action); // Send action to global state
    }

    // Update vacation: 
    public async updateVacation(vacation: VacationModel): Promise<void> {
        // Send the update to backend with or without image file:
        const response = vacation.image ?
            await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.id, vacation, appConfig.axiosOptions)
            :
            await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.id, vacation);
        const updatedVacation = response.data; // Extract  
        const action = vacationActionCreators.updateOne(updatedVacation); // Create action for updating a vacation in the global state 
        appStore.dispatch(action); // Send action to global state
    }

    // Delete vacation: 
    public async deleteVacation(id: number): Promise<void> {
        await axios.delete(appConfig.vacationsUrl + id); // Delete vacation from backend 
        const action = vacationActionCreators.deleteOne(id); // Create action for deleting a vacation from the global state 
        appStore.dispatch(action); // Send action to global state
    }

    // Add like to vacation:
    public async addLike(like: LikeModel): Promise<void> {
        await axios.post<LikeModel>(appConfig.likesUrl, like); // Add the new like to backend 
        const action = vacationActionCreators.addLike(like.vacationId); // Create action for adding a like to the global state 
        appStore.dispatch(action); // Send action to global state
    }
    
    // Remove like from vacation:
    public async removeLike(userId: number, vacationId: number): Promise<void> { 
        await axios.delete(appConfig.likesUrl + `${userId}/${vacationId}`); // Delete vacation from backend 
        const action = vacationActionCreators.removeLike(vacationId); // Create action for removing a vacation like from the global state
        appStore.dispatch(action); // Send action to global state:
    }
}

export const vacationsService = new VacationsService();
