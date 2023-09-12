import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Joiners } from '../models/users.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient) { }

  getJoiners(username: string): Observable<Joiners[]>{
    let reqParams = {
      "username":username
    }
    
    return this.http.get<Joiners[]>(`/api/organization/joiners`,{params:reqParams});
  }
  
}
