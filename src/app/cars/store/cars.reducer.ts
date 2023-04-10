
import { createReducer, on } from '@ngrx/store';
import { Car } from './car';
import { AddNewCarAPISuccess, DeleteCarAPISuccess, FetchAllCarsAPISuccess, UpdateCarAPISuccess } from './cars.action';

// need to have dummy data for the view to work probably. So, two dummy objects was added
export const initialState: ReadonlyArray<Car> = [];

export const carReducer = createReducer(
    initialState,
    on(FetchAllCarsAPISuccess, (state, {allCars}) => {
        return allCars;
    }),
    on(AddNewCarAPISuccess, (state, {response}) => {
        let newState = [...state]
        newState.unshift(response)
        return newState;
    }),
    on(UpdateCarAPISuccess, (state, {updated}) => {
        let newState = state.filter(_ => _.id !== updated.id)
        newState.unshift(updated)
        return newState;
    }),
    on(DeleteCarAPISuccess, (state, {id}) => {
        let newState = state.filter(_ => _.id !== id)
        return newState;
    })
);