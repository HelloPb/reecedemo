import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from './employee';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { EmployeeService } from '../services/api/employee.service';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy {

  public emps$: Observable<Employee[]>;
  private subscriptions: Subscription[] = [];
  public formGroup: FormGroup;
  private searchByFName$ = new Subject<string>();
  private searchByLName$ = new Subject<string>();
  private searchByDep$ = new Subject<string>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService) {
    this.create();
  }

  private create(): void {
    this.formGroup = this.formBuilder.group({
      fname: '',
      lname: '',
      department: ''
    });
  }

  public Add(): void {
    this.router.navigate([`/employee/add`]);
  }

  public edit(index: number): void {
    this.router.navigate([`/employee/edit/${index}`]);
  }

  public delete(index: number): void {
    this.emps$ = this.employeeService.delete(index);
  }

  public sort(field: string, asc: boolean): void {
    this.emps$ = this.employeeService.sort(field, asc);
  }

  public searchByFName(): void {

    this.subscriptions.push();

    this.searchByFName$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap(text =>
        this.employeeService.searchByFName(text)
      )).subscribe(x => { this.emps$ = Observable.create(o => { o.next(x); o.complete(); }); });
  }

  public searchByLName(): void {
    this.subscriptions.push();
    this.searchByLName$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap(text =>
        this.employeeService.searchByLName(text)
      )).subscribe(x => { this.emps$ = Observable.create(o => { o.next(x); o.complete(); }); });
  }

  public searchByDepartment(): void {
    this.subscriptions.push();

    this.searchByDep$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap(text =>
        this.employeeService.searchByDepartment(text)
      )).subscribe(x => { this.emps$ = Observable.create(o => { o.next(x); o.complete(); }); });
  }

  public ngOnInit() {

    this.searchByFName();
    this.searchByLName();
    this.searchByDepartment();

    this.formGroup.controls['fname'].valueChanges.subscribe(v => this.searchByFName$.next(v));
    this.formGroup.controls['lname'].valueChanges.subscribe(v => this.searchByLName$.next(v));
    this.formGroup.controls['department'].valueChanges.subscribe(v => this.searchByDep$.next(v));

    this.emps$ = this.employeeService.getAll();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}
