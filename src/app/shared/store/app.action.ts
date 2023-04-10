import { createAction, props } from "@ngrx/store";
import { AppState } from "./appstate";

export const setAppAPIStatus = createAction(
    "[App API] Success or Failure Status",
    props<{apiStatus: AppState}>()
);


