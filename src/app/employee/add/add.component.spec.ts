import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAddComponent } from './add.component';
import { ActivatedRouteStub } from '../../testing/activated-route-stub';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/api/employee.service';
import { FormBuilder} from '@angular/forms';
import { EmployeeAddModule } from './add.module';

describe('EmployeeAddComponent', () => {
  let component: EmployeeAddComponent;
  let fixture: ComponentFixture<EmployeeAddComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [EmployeeAddModule],
      providers: [
        { provide: FormBuilder },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: EmployeeService },
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {

    // activatedRoute.setParamMap({ id: 99999 });
    fixture = TestBed.createComponent(EmployeeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
