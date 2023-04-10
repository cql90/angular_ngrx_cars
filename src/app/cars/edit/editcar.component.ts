import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Form, Validators} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { UpdateCarAPI } from '../store/cars.action';
import { AppState } from 'src/app/shared/store/appstate';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { ActivatedRoute, Router } from '@angular/router';
import { setAppAPIStatus } from 'src/app/shared/store/app.action';
import { selectCarById } from '../store/cars.selector';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-edit-car',
  templateUrl: './editcar.component.html',
  styleUrls: ['./editcar.component.scss']
})
export class EditCarComponent implements OnInit {
  editCarForm!: FormGroup;
  submitted: boolean = false;
  constructor(private formBuilder: FormBuilder, private store: Store, 
    private activeRoute: ActivatedRoute, private router: Router,
    private appStore: Store<AppState>){
    this.editCarForm = this.formBuilder.group({
      id: ['', Validators.required],
      model: ['', Validators.required], 
      make: ['', Validators.required],
      cost: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    let fetchFromId$ = this.activeRoute.paramMap.pipe(
      switchMap((param) => {
        let id = Number(param.get('id'))
        return this.store.pipe(select(selectCarById(id)));
      })
    )

    fetchFromId$.subscribe((data) => {
      if(data){
        this.editCarForm.controls['id'].setValue(data.id);
        this.editCarForm.controls['model'].setValue(data.model);
        this.editCarForm.controls['make'].setValue(data.make);
        this.editCarForm.controls['cost'].setValue(data.cost);
      }
      else{
        this.router.navigate(['/']);
      }
    })
  }

  // this version is after added app.select.ts, app.select.ts and app.reducer.ts
  updateCar(){
    this.store.dispatch(UpdateCarAPI({update: {...this.editCarForm.value}}));
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
