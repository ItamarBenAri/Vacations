import axios from "axios";
import appConfig from "../Utils/AppConfig";
import { jwtDecode } from "jwt-decode";
import { appStore } from "../Redux/Store";
import { authActionCreators } from "../Redux/AuthSlice";
import { UserModel } from "../Models/UserModel";
import CredentialsModel from "../Models/CredentialsModel";

class AuthService {

    public constructor() {
        const token = sessionStorage.getItem("token"); // Get token from local storage
        if (token) { // If token exists 
            const loggedInUser = jwtDecode<{ user: UserModel }>(token).user; // Extract the user from the token 
            appStore.dispatch(authActionCreators.login(loggedInUser)); // Update global state
        }
    }

    // Register a new user: 
    public async register(user: UserModel): Promise<void> {
        // Send the new user to backend with or without image file:
        const response = await axios.post<UserModel>(appConfig.registerUrl, user, appConfig.axiosOptions);
        const token = String(response.data); // Extract the JWT token 
        const registeredUser = jwtDecode<{ user: UserModel }>(token).user; // Extract the user from the token 
        appStore.dispatch(authActionCreators.register(registeredUser)); // Update global state 
        sessionStorage.setItem("token", token); // Save in the local storage
    }

    // Login existing user:
    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post<string>(appConfig.loginUrl, credentials); // Send the credentials to backend
        const token = response.data; // Extract the JWT token 
        const loggedInUser = jwtDecode<{ user: UserModel }>(token).user; // Extract the user from the token 
        appStore.dispatch(authActionCreators.login(loggedInUser)); // Update global state 
        sessionStorage.setItem("token", token); // Save in the local storage
    }

    public logout(): void {
        appStore.dispatch(authActionCreators.logout()); // Update global state
        sessionStorage.removeItem("token"); // Remove token from local storage
    }
}

export const authService = new AuthService();
