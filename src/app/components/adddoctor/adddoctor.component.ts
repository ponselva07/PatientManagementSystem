import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-adddoctor',
  templateUrl: './adddoctor.component.html',
  styleUrls: ['./adddoctor.component.css']
})
export class AdddoctorComponent implements OnInit {

  doctorForm: FormGroup;
  loading = false;
  submitted = false;
  
  constructor(private route: ActivatedRoute,private router:Router,
    private formBuilder: FormBuilder,private doctorService:DoctorService) { }

  ngOnInit() {
    this.doctorForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      specialization: ['', Validators.required]
    });
  }

  get f() { return this.doctorForm.controls; }

  onSubmit(doctorForm:NgForm){
    this.submitted = true;
    if (this.doctorForm.invalid) {
        return;
    }
    this.doctorService.addDoctor(this.doctorForm.value).subscribe(
      data => {
        console.log("Doctor Added Successfully");
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }

}
