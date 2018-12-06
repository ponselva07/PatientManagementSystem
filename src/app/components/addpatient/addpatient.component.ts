import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPatient } from 'src/app/model/IPatient';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addpatient',
  templateUrl: './addpatient.component.html',
  styleUrls: ['./addpatient.component.css']
})
export class AddpatientComponent implements OnInit {
  patient:IPatient;
  constructor(private route: ActivatedRoute,private httpClient:HttpClient,
    private router:Router) { 
      /*this.route.queryParams.subscribe(params => {
      this.patient = JSON.parse(params["patient"]) as IPatient;*});*/
  }

  ngOnInit() {
    if(sessionStorage.getItem("patient") != null){
      this.patient = JSON.parse(sessionStorage.getItem("patient")) as IPatient;
    }
  }

  onSubmit(regForm:NgForm){
    console.log("regForm.value "+regForm.value);
    if(this.patient.id <= 0){
      this.httpClient.post("http://127.0.0.1:3000/patientList",regForm.value)
      .subscribe(
          data => {
              console.log("Patient Information Created Succussfully ", data);
          },
          error => {
              console.log("Error : ", error);
          }
      );
    }else{
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
    sessionStorage.setItem("patient",null)
  }
}
