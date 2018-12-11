import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPatient } from 'src/app/model/IPatient';
import { HttpClient } from '@angular/common/http';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-addpatient',
  templateUrl: './addpatient.component.html',
  styleUrls: ['./addpatient.component.css']
})
export class AddpatientComponent implements OnInit {
  patient:IPatient;
  patientId:number;
  btnLable:string="Add Patient";
  constructor(private route: ActivatedRoute,private httpClient:HttpClient,
    private router:Router,private patientService:PatientService) { 
      this.patient={} as IPatient;
      /*this.route.queryParams.subscribe(params => {
      this.patient = JSON.parse(params["patient"]) as IPatient;*});*/
  }

  ngOnInit() {
    this.patientId = parseInt(this.route.snapshot.paramMap.get("id"));
    if(this.patientId > 0){
      this.patientService.getPatientInformation(this.patientId)
      .subscribe(
        data => {
            this.patient=data;
          },
        error => {
            console.log("Error : ", error);
        }
    );
      this.btnLable="Update Patient";
    }
  }

  onSubmit(regForm:NgForm){
    let createdDate=this.patient.createdDate;
    this.patient=regForm.value as IPatient;
    console.log("Patient Id : "+this.patient.id);
    if(this.patientId <= 0 || this.patientId == undefined){
      this.patient.createdDate=new Date();
      this.httpClient.post("http://127.0.0.1:3000/patientList",this.patient)
      .subscribe(
          data => {
              console.log("Patient Information Created Succussfully ", data);
          },
          error => {
              console.log("Error : ", error);
          }
      );
    }else{
      this.patient.id=this.patientId;
      this.patient.updatedDate=new Date();
      if(createdDate == null || createdDate == undefined){
        this.patient.createdDate=this.patient.updatedDate;
      }else{
        this.patient.createdDate=createdDate;
      }
      this.httpClient.put("http://127.0.0.1:3000/patientList/"+this.patient.id,
      this.patient
      )
      .subscribe(
          data => {
              console.log("Patient Details Updated Succussfully ", data);
              this.patient=data as IPatient;
              this.router.navigate(['/patientList']);
          },
          error => {
              console.log("Error : ", error);
          }
      );
    }
  }

  clearPatient(){
    this.btnLable="Add Patient";
  }
}
