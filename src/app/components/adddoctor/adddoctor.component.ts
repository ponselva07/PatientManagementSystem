import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IDoctor } from 'src/app/model/IDoctor';

@Component({
  selector: 'app-adddoctor',
  templateUrl: './adddoctor.component.html',
  styleUrls: ['./adddoctor.component.css']
})
export class AdddoctorComponent implements OnInit {

  doctorForm: FormGroup;
  doctor: IDoctor;
  loading = false;
  submitted = false;
  isUpdate:boolean=false;
  btnLable:string="Add Doctor";
  doctorId:string;
  constructor(private route: ActivatedRoute,private router:Router,
    private formBuilder: FormBuilder,private doctorService:DoctorService) { }

  ngOnInit() {
    //this.route.params.subscribe( params => this.doctorId=params['id']);

    this.doctorId = this.route.snapshot.paramMap.get("id");
    this.doctorForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      specialization: ['', Validators.required]
    });

    if(this.doctorId !== null){
      this.doctorService.getDoctorInformation(this.doctorId)
      .subscribe(
        data => {
          this.doctor=data;
          this.doctorForm.patchValue({
            firstName: this.doctor.firstName,
            lastName: this.doctor.lastName,
            gender: this.doctor.gender,
            phoneNumber: this.doctor.phoneNumber,
            specialization: this.doctor.specialization
          });
        },
        error => {
            console.log("Error : ", error);
        }
    );
      this.btnLable="Update Doctor";
    }else{
      this.doctor={} as IDoctor;
    }
  }

  get f() { return this.doctorForm.controls; }

  onSubmit(doctorForm:NgForm){
    this.submitted = true;
    if (this.doctorForm.invalid) {
        return;
    }
    this.doctorService.addDoctor(this.doctorForm.value,this.doctorId,this.doctor.createdDate).subscribe(
      data => {
        console.log("Doctor Added Successfully");
        this.router.navigate(['/doctorList']);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }

  reset(){
    this.btnLable="Add Doctor";
    this.doctor={} as IDoctor;
  }

}
