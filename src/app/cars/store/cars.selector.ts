import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Car } from './car';

export const selectCar = createFeatureSelector<Car[]>('myCars');

export const selectCarById = (carId: number) => {
    return createSelector(selectCar, (cars: Car[]) => {
        let carById = cars.filter(_ => _.id === carId);
        if(carById.length === 0) 
            return null;
        return carById[0];
    })
}
