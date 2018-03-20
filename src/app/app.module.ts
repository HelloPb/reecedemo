import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NewEmployeeResolver } from './services/resolvers/new-employee.resolver';
import { ExistingEmployeeResolver } from './services/resolvers/existing-employee.resolver';
import { EmployeeService } from './services/api/employee.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [NewEmployeeResolver, ExistingEmployeeResolver, EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
