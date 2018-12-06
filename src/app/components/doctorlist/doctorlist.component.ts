import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { PatientService } from 'src/app/services/patient.service';
import { IDoctor } from 'src/app/model/IDoctor';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-doctorlist',
  templateUrl: './doctorlist.component.html',
  styleUrls: ['./doctorlist.component.css']
})
export class DoctorlistComponent implements OnInit {

  constructor(private httpClient: HttpClient, private patientService: PatientService) { }

  private doctorList : Observable<IDoctor[]>;

  // array of all items to be paged
  allItems: IDoctor[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  ngOnInit() {
     // get dummy data
     this.doctorList = this.httpClient.get<IDoctor[]>("http://localhost:3000/doctorList");

     
     this.doctorList.subscribe(
      data => {
        this.allItems = data as IDoctor [];
        this.setPage(0,0);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }

  setPage(page: number,pageSize:number) {
    // get pager object from service
    this.pager = this.patientService.getPager(this.allItems.length, page,pageSize);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
}
}
