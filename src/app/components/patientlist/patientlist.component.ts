import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PatientService } from 'src/app/services/patient.service';
import { Observable } from "rxjs/Observable";
import { IPatient } from 'src/app/model/IPatient';
import 'rxjs/add/operator/do'
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-patientlist',
  templateUrl: './patientlist.component.html',
  styleUrls: ['./patientlist.component.css']
})
export class PatientlistComponent implements OnInit {

  constructor(private httpClient: HttpClient, private router:Router, private patientService: PatientService) { }

  private patientList : Observable<IPatient[]>;

  private defaultNoOfItems:number;
  // array of all items to be paged
  allItems: IPatient[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: IPatient[];

  ngOnInit() {
     // get data from json server 
     // install json server : npm install -g json-server
     // run command for json server : json-server --watch pms.json 
     this.defaultNoOfItems=10;
     this.patientList = this.httpClient
            .get<IPatient[]>("http://localhost:3000/patientList");
            //.do(console.log); 
        
      this.patientList.subscribe(
      data => {
        this.allItems = data as IPatient [];
        this.setPage(0);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.patientService.getPager(this.allItems.length, page,this.defaultNoOfItems);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

diagnosisPatient(patient:IPatient){
    console.log(patient.firstName);
}
editPatient(id:number){
  /*let navigationExtras: NavigationExtras = {
    queryParams: {
        "patient": JSON.stringify(patient),
    }
};
  this.router.navigate(['/addPatient'],navigationExtras);*/
  this.router.navigate(['/addPatient',id]);
}

deletePatient(id:number){
  this.httpClient.delete("http://127.0.0.1:3000/patientList/"+id)
      .subscribe(
          data => {
              console.log("Patient Information Deleted Succussfully ", data);
          },
          error => {
              console.log("Error : ", error);
          }
      );
}

changeNoOfItemsShowPerPage(event: any){
  this.defaultNoOfItems=event.target.value;
  this.setPage(0);

}
}
