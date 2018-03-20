import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeService } from '../services/api/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub } from '../testing/activated-route-stub';
import { EmployeeModule } from './employee.module';
import { SharedModule } from '../shared.module';
import { FormBuilder } from '@angular/forms';

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [EmployeeRoutingModule, EmployeeModule, SharedModule],
      providers: [
        { provide: FormBuilder },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: EmployeeService },
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
