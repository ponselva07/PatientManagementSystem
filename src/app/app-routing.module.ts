import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddpatientComponent } from './components/addpatient/addpatient.component';
import { PatientlistComponent } from './components/patientlist/patientlist.component';
import { AdddoctorComponent } from './components/adddoctor/adddoctor.component';
import { DoctorlistComponent } from './components/doctorlist/doctorlist.component';
import { ReportComponent } from './components/report/report.component';

const routes: Routes = [
  {path: "patientList",component: PatientlistComponent},
  {path: "addPatient",component: AddpatientComponent},
  {path: "addDoctor",component: AdddoctorComponent},
  {path: "addPatient/:id",component: AddpatientComponent},
  {path: "addDoctor/:id",component: AdddoctorComponent},
  {path: "doctorList",component: DoctorlistComponent},
  {path: "report",component: ReportComponent},
  {path: "**",redirectTo:"/patientList",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
