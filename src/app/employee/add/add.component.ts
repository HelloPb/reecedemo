import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../../services/api/employee.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  public formGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService) {

    this.create();
  }

  private create(): void {

    this.formGroup = this.formBuilder.group({
      id: '',
      fname: '',
      lname: '',
      department: '',
      phone: ''
    });
  }

  private update(emp: Employee): void {

    this.formGroup.patchValue({
      id: emp.id,
      fname: emp.fname,
      lname: emp.lname,
      department: emp.department,
      phone: emp.phone
    });

  }

  public save(): void {

    const emp = this.formGroup.getRawValue();

    if (emp.id) {

      this.employeeService.put(emp).subscribe(x =>
        this.router.navigate([`/employee`]));

    } else {

      this.employeeService.post(emp).subscribe(x =>
        this.router.navigate([`/employee`]));
    }
  }

  public cancel(): void {

    this.router.navigate([`/`]);

  }

  public ngOnInit() {

    this.route.data.subscribe((data: { employee: Employee }) => {
      this.update(data.employee);
    });
  }

}
