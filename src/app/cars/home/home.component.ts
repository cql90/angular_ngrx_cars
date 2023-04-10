import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectCar } from '../store/cars.selector';
import { DeleteCarAPI, FetchAllCarsAPISuccess, invokeCarsAPI } from '../store/cars.action';
import { AppState } from 'src/app/shared/store/appstate';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAppAPIStatus } from 'src/app/shared/store/app.action';
import { Router } from '@angular/router';
import { Car } from '../store/car';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  deleteId: number = -1;
  model: string = '';
  make: string = '';
  cars$: any;
  cars: Car[] = [];
  constructor(private store: Store, private appStore: Store<AppState>,
    private router: Router){
    this.cars$ = this.store.pipe(select(selectCar))
  }

  ngOnInit(): void {
    this.store.dispatch(invokeCarsAPI())
    let appStatus$ = this.appStore.pipe(select(selectAppState));
    // Set apiStatus equal 'Success' to trigger FetchAllCarsAPISuccess from cars.reducer to load everything from db.json
    this.appStore.dispatch(setAppAPIStatus({
      apiStatus: { apiResponseMessage: '', apiStatus: 'Success'}
    }))
    // Must subscribe for Observable to trigger the process
    appStatus$.subscribe((data) => {
      if(data.apiStatus === 'Success'){
        // Need to clear the state setup in car.effects.ts after success
        this.appStore.dispatch(setAppAPIStatus({
          apiStatus: {apiStatus: '', apiResponseMessage: ''}
        }))
        // navigate back to Home URL after successfully add new Car
        this.router.navigate(['/']);
      }
    })
  }

  setDeleteCarId(id: number){
    this.deleteId = id;
    this.cars$ = this.store.pipe(select(selectCar))
    this.cars$.subscribe((data: Car[]) => this.cars = data)
    if(this.cars.length > 0){
      let deleteCar = this.cars.filter(_ => _.id === this.deleteId)
      this.model = deleteCar[0].model
      this.make = deleteCar[0].make
    }
  }

  deleteCar(){
    this.store.dispatch(DeleteCarAPI({id: this.deleteId}));
    // pip return Observable<AppState> from selectAppState
    let appStatus$ = this.appStore.pipe(select(selectAppState));
    // Must subscribe for Observable to trigger the process
    appStatus$.subscribe((data) => {
      if(data.apiStatus === 'Success'){
        // Need to clear the state setup in car.effects.ts after success
        this.appStore.dispatch(setAppAPIStatus({
          apiStatus: {apiStatus: '', apiResponseMessage: ''}
        }))
        // navigate back to Home URL after successfully add new Car
        this.router.navigate(['/']);
      }
    })
  }
}
