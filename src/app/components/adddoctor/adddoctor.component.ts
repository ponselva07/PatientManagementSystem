import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-adddoctor',
  templateUrl: './adddoctor.component.html',
  styleUrls: ['./adddoctor.component.css']
})
export class AdddoctorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(doctorForm:NgForm){
    console.log(doctorForm.value);
  }

}
