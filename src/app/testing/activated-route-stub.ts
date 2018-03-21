import { ReplaySubject } from 'rxjs/ReplaySubject';
import { convertToParamMap, ParamMap, Params } from '@angular/router';

export class ActivatedRouteStub {

  private paramMap$ = new ReplaySubject<ParamMap>();
  private data$ = new ReplaySubject<ParamMap>();

  constructor(initialParams?: Params) {
    this.setParamMap(initialParams);
  }

  readonly paramMap = this.paramMap$.asObservable();
  readonly data = this.data$.asObservable();

  setParamMap(params?: Params) {
    this.paramMap$.next(convertToParamMap(params));
  }

  setRouteData(data: any) {
    this.data$.next(data);
  }
}
