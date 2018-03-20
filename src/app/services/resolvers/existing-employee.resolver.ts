import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { EmployeeService } from '../api/employee.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Employee } from '../../employee/employee';

@Injectable()
export class ExistingEmployeeResolver implements Resolve<Employee> {
  constructor(private employee: EmployeeService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee> {
    const id = route.paramMap.get('id');

    return this.employee.get(+id).take(1).map(item => {
      if (item) {
        return item;
      } else {
        this.router.navigate(['/']);
        return null;
      }
    });
  }
}
