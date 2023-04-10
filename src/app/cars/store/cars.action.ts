import { createAction, props } from "@ngrx/store";
import { Car } from "./car";

export const invokeCarsAPI = createAction(
    "[Cars API] invoke Car fetch API"
);

export const FetchAllCarsAPISuccess = createAction(
    "[Cars API] invoke Car fetch API Success",
    props<{allCars:Car[]}>()
);

export const AddNewCarAPI = createAction(
    "[Cars API] invoke add new Car API",
    props<{newCar: Car}>()
);

export const AddNewCarAPISuccess = createAction(
    "[Cars API] add new Car API Success!",
    props<{response: Car}>()
);

export const UpdateCarAPI = createAction(
    "[Cars API] update Car API",
    props<{update: Car}>()
);

export const UpdateCarAPISuccess = createAction(
    "[Cars API] updated Car API Success!",
    props<{updated: Car}>()
);

export const DeleteCarAPI = createAction(
    "[Cars API] delete Car API",
    props<{id: number}>()
);

export const DeleteCarAPISuccess = createAction(
    "[Cars API] deleted Car API Success!",
    props<{id: number}>()
);