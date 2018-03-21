import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeAddComponent } from './add.component';
import { ActivatedRouteStub } from '../../testing/activated-route-stub';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/api/employee.service';
import { FormBuilder } from '@angular/forms';
import { EmployeeAddModule } from './add.module';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

describe('EmployeeAddComponent', () => {
  let component: EmployeeAddComponent;
  let fixture: ComponentFixture<EmployeeAddComponent>;

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [EmployeeAddModule],
      providers: [
        FormBuilder,
        EmployeeService,
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents();
  }));

  describe('3. Add New Employee', () => {

    describe('3.1 On page load, should show', () => {

      beforeEach(async(() => {

        const ar = TestBed.get(ActivatedRoute);

        (ar as any).setRouteData({
          employee:
            {
              id: undefined, fname: '', lname: '', department: '', phone: ''
            }
        });

        fixture = TestBed.createComponent(EmployeeAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));

      it('3.1.1 first name as empty', () => {
        const ele = fixture.debugElement.query(By.css(`input[formControlName="fname"]`));
        const p: HTMLInputElement = ele.nativeElement;
        expect(p.value.trim()).toBe('');
      });

      it('3.1.2 last name as empty', () => {
        const ele = fixture.debugElement.query(By.css(`input[formControlName="lname"]`));
        const p: HTMLInputElement = ele.nativeElement;
        expect(p.value.trim()).toBe('');
      });

      it('3.1.3 department as empty', () => {
        const ele = fixture.debugElement.query(By.css(`input[formControlName="department"]`));
        const p: HTMLInputElement = ele.nativeElement;
        expect(p.value.trim()).toBe('');
      });

      it('3.1.4 phone number as empty', () => {
        const ele = fixture.debugElement.query(By.css(`input[formControlName="phone"]`));
        const p: HTMLInputElement = ele.nativeElement;
        expect(p.value.trim()).toBe('');
      });
    });

    describe('3.2 on entering new values, should show', () => {

      beforeEach(async(() => {

        const ar = TestBed.get(ActivatedRoute);

        (ar as any).setRouteData({
          employee:
            {
              id: undefined, fname: '', lname: '', department: '', phone: ''
            }
        });

        fixture = TestBed.createComponent(EmployeeAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));

      it('3.2.1 first name as Issac', async(() => {
        fixture.componentInstance.formGroup.patchValue({ fname: 'Issac' });
        fixture.detectChanges();
        fixture.whenStable().then((d) => {
          const ele = fixture.debugElement.query(By.css(`input[formControlName="fname"]`));
          const p: HTMLInputElement = ele.nativeElement;
          expect(p.value).toContain('Issac');
        });
      }));

      it('3.2.2 last name as Newton', async(() => {
        fixture.componentInstance.formGroup.patchValue({ lname: 'Newton' });
        fixture.detectChanges();
        fixture.whenStable().then((d) => {
          const ele = fixture.debugElement.query(By.css(`input[formControlName="lname"]`));
          const p: HTMLInputElement = ele.nativeElement;
          expect(p.value).toContain('Newton');
        });
      }));

      it('3.2.3 department as Science', async(() => {
        fixture.componentInstance.formGroup.patchValue({ department: 'Science' });
        fixture.detectChanges();
        fixture.whenStable().then((d) => {
          const ele = fixture.debugElement.query(By.css(`input[formControlName="department"]`));
          const p: HTMLInputElement = ele.nativeElement;
          expect(p.value).toContain('Science');
        });
      }));

      it('3.2.4 phone number as 32490239042', async(() => {
        fixture.componentInstance.formGroup.patchValue({ phone: '32490239042' });
        fixture.detectChanges();
        fixture.whenStable().then((d) => {
          const ele = fixture.debugElement.query(By.css(`input[formControlName="phone"]`));
          const p: HTMLInputElement = ele.nativeElement;
          expect(p.value).toContain('32490239042');
        });
      }));
    });

  });

  describe('4. Edit Existing Employee', () => {

    beforeEach(async(() => {

      const ar = TestBed.get(ActivatedRoute);

      (ar as any).setParamMap({ id: 4 });

      (ar as any).setRouteData({
        employee:
          {
            id: 4, fname: 'Ohio', lname: 'Xarva', department: 'Sci', phone: '4444440000'
          }
      });

      fixture = TestBed.createComponent(EmployeeAddComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }));

    it('4.1 first name should be Ohio', () => {
      const ele = fixture.debugElement.query(By.css(`input[formControlName="fname"]`));
      const p: HTMLInputElement = ele.nativeElement;
      expect(p.value).toContain('Ohio');
    });

    it('4.2 last name should be Xarva', () => {
      const ele = fixture.debugElement.query(By.css(`input[formControlName="lname"]`));
      const p: HTMLInputElement = ele.nativeElement;
      expect(p.value).toContain('Xarva');
    });

    it('4.3 department should be Sci', () => {
      const ele = fixture.debugElement.query(By.css(`input[formControlName="department"]`));
      const p: HTMLInputElement = ele.nativeElement;
      expect(p.value).toContain('Sci');
    });

    it('4.4 phone number should be 4444440000', () => {
      const ele = fixture.debugElement.query(By.css(`input[formControlName="phone"]`));
      const p: HTMLInputElement = ele.nativeElement;
      expect(p.value).toContain('4444440000');
    });

  });

  describe('5. On click of Save Button', () => {

    let r;
    beforeEach(async(() => {

      const ar = TestBed.get(ActivatedRoute);
      r = TestBed.get(Router);

      (ar as any).setRouteData({
        employee:
          {
            id: undefined, fname: '', lname: '', department: '', phone: ''
          }
      });

      const nav = 'navigation triggered';
      r.navigate.and.returnValue(Observable.of(nav));


      fixture = TestBed.createComponent(EmployeeAddComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      fixture.componentInstance.formGroup.patchValue(
        {
          fname: 'Sun', lname: 'Moon', department: 'Space', phone: '**************',
        }
      );
      fixture.detectChanges();
    }));

    it('5.1 It should save the data', async(() => {

      const ele = fixture.debugElement.query(By.css(`button[id="save"]`));
      const p: HTMLInputElement = ele.nativeElement;
      ele.triggerEventHandler('click', null);

      fixture.whenStable().then((d) => {
        expect(r.navigate.calls.any()).toBe(true, 'router.navigate called');
      });
    }));
  });
});
