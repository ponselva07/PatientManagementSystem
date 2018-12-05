import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  constructor(private http: HttpClient, private patientService: PatientService) { }

  // array of all items to be paged
  allItems: string[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  ngOnInit() {
     // get dummy data
     this.http.get('../assets/pms.json').subscribe(
      data => {
        this.allItems = data as string [];
        this.setPage(0);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }

  setPage(page: number) {
    console.log(this.allItems);
    // get pager object from service
    this.pager = this.patientService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

}
