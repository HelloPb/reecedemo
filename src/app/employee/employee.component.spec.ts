import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeComponent } from './employee.component';
import { EmployeeService } from '../services/api/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub } from '../testing/activated-route-stub';
import { EmployeeModule } from './employee.module';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [EmployeeModule],
      providers: [
        FormBuilder,
        EmployeeService,
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('1. should create employee componet', () => {
    expect(component).toBeTruthy();
  });

  describe('2. On initial page load', () => {

    beforeEach(async(() => {
      fixture.detectChanges();
    }));

    it('2.1 should contain 6 employees details on the page', () => {
      const ele = fixture.debugElement.queryAll(By.css(`td[id="fname"]`));
      expect(ele.length).toEqual(6);
    });
  });
});
