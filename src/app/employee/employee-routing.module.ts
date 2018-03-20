import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { EmployeeAddComponent } from './add/add.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent
  },
  {
    path: 'add',
    loadChildren: 'app/employee/add/add.module#EmployeeAddExModule'
  },
  {
    path: 'edit',
    loadChildren: 'app/employee/add/add.module#EmployeeAddExModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class EmployeeRoutingModule { }
