import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AddpatientComponent } from './components/addpatient/addpatient.component';
import { AdddoctorComponent } from './components/adddoctor/adddoctor.component';
import { DoctorlistComponent } from './components/doctorlist/doctorlist.component';
import { PatientlistComponent } from './components/patientlist/patientlist.component';
import { ReportComponent } from './components/report/report.component';
import { PatientfilterPipe } from './filters/patientfilter.pipe';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MustMatchDirective } from './directives/MustMatchDirective';
import { DiagnosisComponent } from './components/diagnosis/diagnosis.component';

@NgModule({
  declarations: [
    AppComponent,
    AddpatientComponent,
    AdddoctorComponent,
    DoctorlistComponent,
    PatientlistComponent,
    ReportComponent,
    PatientfilterPipe,
    MustMatchDirective,
    DiagnosisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
