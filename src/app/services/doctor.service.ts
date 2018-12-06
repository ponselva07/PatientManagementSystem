import { Injectable } from '@angular/core';
import { IDoctor } from '../model/IDoctor';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private httpClient:HttpClient) { }

  public addDoctor(doctor:IDoctor):Observable<IDoctor>{
    return this.httpClient.post<IDoctor>("http://127.0.0.1:3000/doctorList",doctor);
  }
}
