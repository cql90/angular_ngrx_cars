export interface Car {
    id: number;
    model: string;
    make: string;
    cost: number;
}

export interface CarState {
    cars: Car[],
    apiStatus: string,
    apiResponse: string
}
