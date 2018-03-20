import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Employee } from '../../employee/employee';

@Injectable()
export class EmployeeService {

  private id;
  private emp: Employee[];

  constructor() {
    this.emp = [
      {
        id: 1, fname: 'Mark', lname: 'Otto', department: 'dev', phone: '8989898989'
      },
      {
        id: 2, fname: 'Jacob', lname: 'Thornton', department: 'testing', phone: '123456789'
      },
      {
        id: 3, fname: 'Larry', lname: 'Field', department: 'HR', phone: '333334444'
      },
      {
        id: 4, fname: 'Ohio', lname: 'Xarva', department: 'Sci', phone: '4444440000'
      },
      {
        id: 5, fname: 'Greek', lname: 'Card', department: 'cont', phone: '111110000'
      },
      {
        id: 6, fname: 'Solo', lname: 'State', department: 'gov', phone: '3333222234'
      }
    ];

    this.id = 7;
  }

  public searchByFName(fname: string): Observable<Employee[]> {
    const self = this;
    return Observable.create(observer => {
      if (fname === '') {
        observer.next(this.emp);
      } else {
        observer.next(this.emp.filter(x => x.fname.toLowerCase().indexOf(fname.toLowerCase()) !== -1));
      }
      observer.complete();
    });
  }

  public searchByLName(lname: string): Observable<Employee[]> {
    const self = this;
    return Observable.create(observer => {
      if (lname === '') {
        observer.next(this.emp);
      } else {
        observer.next(this.emp.filter(x => x.lname.toLowerCase().indexOf(lname.toLowerCase()) !== -1));
      }
      observer.complete();
    });
  }

  public searchByDepartment(department: string): Observable<Employee[]> {
    const self = this;
    return Observable.create(observer => {
      if (department === '') {
        observer.next(this.emp);
      } else {
        observer.next(this.emp.filter(x => x.department.toLowerCase().indexOf(department.toLowerCase()) !== -1));
      }
      observer.complete();
    });
  }

  public getAll(): Observable<Employee[]> {
    const self = this;
    return Observable.create(observer => {
      observer.next(self.emp);
      observer.complete();
    });
  }

  public get(id: number): Observable<Employee> {
    const self = this;
    return Observable.create(observer => {
      observer.next(self.emp.find(x => x.id === id));
      observer.complete();
    });
  }

  public post(payload: Employee): Observable<Employee> {
    const self = this;
    return Observable.create(observer => {
      payload.id = self.id++;
      self.emp.push(payload);
      observer.next(payload);
      observer.complete();
    });
  }

  public put(payload: Employee): Observable<Employee> {
    const self = this;
    return Observable.create(observer => {
      self.emp[self.emp.findIndex(x => x.id === payload.id)] = payload;
      observer.next(payload);
      observer.complete();
    });
  }

  public delete(id: number): Observable<Employee[]> {
    const self = this;
    return Observable.create(observer => {
      const i = self.emp.findIndex(x => x.id === id);
      self.emp.splice(i, 1);
      observer.next(self.emp);
      observer.complete();
    });
  }

  public sort(field: string, asc: boolean): Observable<Employee[]> {
    const self = this;
    return Observable.create(observer => {

      self.emp.sort();

      if (!asc) {
        self.emp.reverse();
      }

      observer.next(self.emp);
      observer.complete();
    });
  }
}
