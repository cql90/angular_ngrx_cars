import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Form, Validators} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AddNewCarAPI } from '../store/cars.action';
import { AppState } from 'src/app/shared/store/appstate';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Router } from '@angular/router';
import { setAppAPIStatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-add-car',
  templateUrl: './addcar.component.html',
  styleUrls: ['./addcar.component.scss', '../../app.component.scss']
})
export class AddCarComponent {
  addCarForm!: FormGroup;
  submitted: boolean = false;
  constructor(private formBuilder: FormBuilder, private store: Store, 
    private appStore: Store<AppState>, private router: Router){
    this.addCarForm = this.formBuilder.group({
      id: ['', Validators.required],
      model: ['', Validators.required], 
      make: ['', Validators.required],
      cost: ['', Validators.required]
    })
  }

  // this version is before added app.select.ts, app.select.ts and app.reducer.ts
  // addCar(){
  //   this.submitted = true;
  //   this.store.dispatch(AddNewCarAPI({newCar: {...this.addCarForm.value}}));
  // }

  // this version is after added app.select.ts, app.select.ts and app.reducer.ts
  addCar(){
    this.submitted = true;
    // make sure user need to fill out all form fields
    if(this.addCarForm.valid){
      this.store.dispatch(AddNewCarAPI({newCar: {...this.addCarForm.value}}));
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
    else{
      this.validateForm()
    }
  }

  // when submit button click, turn on the control on the form to touched state
  validateForm() { 
    for(let i in this.addCarForm.controls)
        this.addCarForm.controls[i].markAsTouched();
  }

  cancelChange(){
    this.router.navigate(['/'])
  }
}
