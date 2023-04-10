import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { HomeComponent } from './home/home.component';
import { AddCarComponent } from './add/addcar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditCarComponent } from './edit/editcar.component';

@NgModule({
  declarations: [
    HomeComponent,
    AddCarComponent,
    EditCarComponent
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,
    ReactiveFormsModule
  ]
})
export class CarsModule { }
