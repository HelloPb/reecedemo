import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { EmployeeService } from '../api/employee.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Employee } from '../../employee/employee';

@Injectable()
export class NewEmployeeResolver implements Resolve<EmployeeService> {
  constructor(private employee: EmployeeService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const emp = new BehaviorSubject<any>(0);
    return emp.take(1).map(e => {
      return new Employee();
    });
  }
}
