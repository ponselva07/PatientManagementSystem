import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PatientManagementSystem';
  searchText:string;
  searchPatient(){
    console.log(this.searchText);
  }
}
