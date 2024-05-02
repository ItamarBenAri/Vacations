import { VacationModel } from "../Models/VacationModel";
import { appStore } from "../Redux/Store";

class PaginationService {

    // Get pagination service for vacations:
    public getPagination(from: number, to: number) {
        const vacations = appStore.getState().vacations; // Get all vacations from global state
        const count: number = vacations?.length;
        const data: VacationModel[] = vacations.slice(from, to);
        return { count, data };
    }
}

export const paginationService = new PaginationService();
