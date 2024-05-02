import { configureStore } from "@reduxjs/toolkit";
import { AppState } from "./AppState";
import { vacationReducersContainer } from "./VacationsSlice";
import { authReducersContainer } from "./AuthSlice";

// Creating the application store - the redux manager object: 
export const appStore = configureStore<AppState>({
    reducer: {
        vacations: vacationReducersContainer,
        user: authReducersContainer, 
    }
});

