import { NgModule } from '@angular/core';
import { EmployeeAddComponent } from './add.component';
import { SharedModule } from '../../shared.module';
import { EmployeeAddRoutingModule } from './add-routing.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [EmployeeAddComponent],
  exports: [EmployeeAddComponent]
})
export class EmployeeAddModule { }

@NgModule({
  exports: [
    EmployeeAddModule,
    EmployeeAddRoutingModule
  ]
})
export class EmployeeAddExModule { }
