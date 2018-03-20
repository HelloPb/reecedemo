import { NgModule } from '@angular/core';
import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { SharedModule } from '../shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [EmployeeComponent]
})
export class EmployeeModule { }

@NgModule({
  exports: [
    EmployeeRoutingModule,
    EmployeeModule
  ]
})
export class EmployeeExModule { }
