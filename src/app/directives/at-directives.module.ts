
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Directive, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[var]',
  exportAs: 'var'
})
class VarDirective {
  @Input() var: any;
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [VarDirective],
  exports: [VarDirective]
})
export class AtVarDirectivesModule { }
