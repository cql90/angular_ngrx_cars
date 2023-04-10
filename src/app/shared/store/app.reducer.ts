import { createReducer, on } from "@ngrx/store";
import { AppState } from "./appstate";
import { setAppAPIStatus } from "./app.action";

export const initialState: AppState = {
    apiStatus: '', 
    apiResponseMessage: '',
};

export const appReducer = createReducer(
    initialState,
    on(setAppAPIStatus, (state, {apiStatus}) => {
        return apiStatus;
    })
);