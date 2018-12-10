import { Injectable } from '@angular/core';
import { IDoctor } from '../model/IDoctor';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private httpClient:HttpClient) { }

  public addDoctor(doctor:IDoctor,doctorId:string):Observable<IDoctor>{
    if(doctorId != null){
      doctor.id=parseInt(doctorId);
    }
    if(doctor.id > 0){
      console.log(console.log("Update Doctor : "+doctor.id));
      console.log(console.log("Update Doctor Name : "+doctor.firstName));
      return this.httpClient.put<IDoctor>("http://127.0.0.1:3000/doctorList/"+doctor.id,doctor);
    }else{
      console.log(console.log("Add Doctor : "+doctor.id));
      return this.httpClient.post<IDoctor>("http://127.0.0.1:3000/doctorList",doctor);
    }
  }

  public getDoctorInformation(id:string):Observable<IDoctor>{
    let doctor:IDoctor;
    //debugger;
    return this.httpClient.get<IDoctor>("http://127.0.0.1:3000/doctorList/" + id);
  }
}
