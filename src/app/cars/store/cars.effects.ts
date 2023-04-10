import { Injectable } from "@angular/core";
import { CarsService} from '../cars.service';
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { FetchAllCarsAPISuccess, invokeCarsAPI, AddNewCarAPISuccess, AddNewCarAPI, UpdateCarAPI, UpdateCarAPISuccess, DeleteCarAPI, DeleteCarAPISuccess } from "./cars.action";
import { setAppAPIStatus } from "src/app/shared/store/app.action";
import { map, switchMap } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/shared/store/appstate";

@Injectable()
export class CarsEffects{
    //  Original before create app.effects.ts
    // constructor(private carService: CarsService, private action$: Actions){} 

    // loadAllCars$ = createEffect(() => 
    //     this.action$.pipe(
    //         ofType(invokeCarsAPI),
    //         switchMap(() => {
    //             return this.carService.getCars()
    //             .pipe(map((data) => FetchAllCarsAPISuccess({allCars:data})))
    //         })
    //     )
    // ) 

    // addNewCar$ = createEffect(() => 
    //     this.action$.pipe(
    //         ofType(AddNewCarAPI),
    //         switchMap((car) => {
    //             return this.carService.create(car.newCar)
    //             .pipe(map((data) => AddNewCarAPISuccess({response: car.newCar})))
    //         })
    //     )
    // ) 

    // Modify version after create app.effects.ts
    constructor(private carService: CarsService, private action$: Actions, 
        private appStore: Store<AppState>, private store: Store){} 

    loadAllCars$ = createEffect(() => 
        this.action$.pipe(
            ofType(setAppAPIStatus),
            switchMap(() => {
                return this.carService.getCars()
                .pipe(map((data) => FetchAllCarsAPISuccess({allCars:data})))
            })
        )
    ) 

    addNewCar$ = createEffect(() => 
        this.action$.pipe(
            ofType(AddNewCarAPI),
            switchMap((car) => {
                this.appStore.dispatch(setAppAPIStatus({
                    apiStatus: { apiResponseMessage: '', apiStatus: ''}
                }))
                return this.carService.create(car.newCar)
                .pipe(map((data) => {
                    this.appStore.dispatch(setAppAPIStatus({
                        apiStatus: { apiResponseMessage: '', apiStatus: 'Success'}
                    }))
                    return AddNewCarAPISuccess({response: car.newCar})
                }))
            })
        )
    ) 

    updateCar$ = createEffect(() => 
        this.action$.pipe(
            ofType(UpdateCarAPI),
            switchMap((car) => {
                this.appStore.dispatch(setAppAPIStatus({
                    apiStatus: { apiResponseMessage: '', apiStatus: ''}
                }))
                return this.carService.update(car.update)
                .pipe(map((data) => {
                    this.appStore.dispatch(setAppAPIStatus({
                        apiStatus: { apiResponseMessage: '', apiStatus: 'Success'}
                    }))
                    return UpdateCarAPISuccess({updated: car.update})
                }))
            })
        )
    )

    deleteCar$ = createEffect(() => 
        this.action$.pipe(
            ofType(DeleteCarAPI),
            switchMap((car) => {
                this.appStore.dispatch(setAppAPIStatus({
                    apiStatus: { apiResponseMessage: '', apiStatus: ''}
                }))
                return this.carService.delete(car.id)
                .pipe(map((data) => {
                    this.appStore.dispatch(setAppAPIStatus({
                        apiStatus: { apiResponseMessage: '', apiStatus: 'Success'}
                    }))
                    return DeleteCarAPISuccess({id: car.id})
                }))
            })
        )
    )
}
 