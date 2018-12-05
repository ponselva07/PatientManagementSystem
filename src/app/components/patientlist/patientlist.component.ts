import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patientlist',
  templateUrl: './patientlist.component.html',
  styleUrls: ['./patientlist.component.css']
})
export class PatientlistComponent implements OnInit {

  constructor(private http: HttpClient, private patientService: PatientService) { }

  private bodyText: string;

  // array of all items to be paged
  allItems: string[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  ngOnInit() {
    this.bodyText = 'This text can be updated in modal 1';
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
    // get pager object from service
    this.pager = this.patientService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
}
}
