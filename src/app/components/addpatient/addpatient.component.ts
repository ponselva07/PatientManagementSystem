import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addpatient',
  templateUrl: './addpatient.component.html',
  styleUrls: ['./addpatient.component.css']
})
export class AddpatientComponent implements OnInit {
  firstName:String="";
  constructor() { }

  ngOnInit() {
  }

  onSubmit(regForm:NgForm){
    console.log(regForm.value);
  }
}
