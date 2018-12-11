import { Injectable } from '@angular/core';
import { IDoctor } from '../model/IDoctor';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private httpClient:HttpClient) { }

  public addDoctor(doctor:IDoctor,doctorId:string,createdDate:Date):Observable<IDoctor>{
    if(doctorId != null){
      doctor.id=parseInt(doctorId);
    }
    if(doctor.id > 0){
      doctor.updatedDate=new Date();
      if(createdDate == null || createdDate == undefined){
        doctor.createdDate=doctor.updatedDate;
      }else{
        doctor.createdDate=createdDate;
      }
      return this.httpClient.put<IDoctor>("http://127.0.0.1:3000/doctorList/"+doctor.id,doctor);
    }else{
      doctor.createdDate=new Date();
      return this.httpClient.post<IDoctor>("http://127.0.0.1:3000/doctorList",doctor);
    }
  }

  public getDoctorInformation(id:string):Observable<IDoctor>{
    let doctor:IDoctor;
    //debugger;
    return this.httpClient.get<IDoctor>("http://127.0.0.1:3000/doctorList/" + id);
  }
}
