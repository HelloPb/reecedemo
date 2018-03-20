import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeAddComponent } from './add.component';
import { ExistingEmployeeResolver } from '../../services/resolvers/existing-employee.resolver';
import { NewEmployeeResolver } from '../../services/resolvers/new-employee.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: { employee: NewEmployeeResolver },
    component: EmployeeAddComponent
  },
  {
    path: ':id',
    resolve: { employee: ExistingEmployeeResolver },
    component: EmployeeAddComponent
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
export class EmployeeAddRoutingModule { }
