import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AtVarDirectivesModule } from './directives/at-directives.module';

@NgModule({
  exports: [
    CommonModule,
    ReactiveFormsModule,
    AtVarDirectivesModule
  ],
  declarations: []
})
export class SharedModule { }
