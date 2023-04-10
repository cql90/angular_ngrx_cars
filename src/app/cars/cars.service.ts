import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from './store/car';


@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private httpClient: HttpClient) {}

  getCars(){
    return this.httpClient.get<Car[]>('http://localhost:3000/Cars')
  }

  create(newCar: Car){
    return this.httpClient.post('http://localhost:3000/Cars', newCar);
  }

  update(editCar: Car){
    return this.httpClient.put<Car>(`http://localhost:3000/Cars/${editCar.id}`, editCar);
  }

  delete(id: number){
    return this.httpClient.delete(`http://localhost:3000/Cars/${id}`);
  }
}
