import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Challenge } from '../models/challenges.interface';
import { error } from 'highcharts';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  constructor(private http:HttpClient) { }

  private itemsState: any[] = [];

  setItemsState(items: any[]): void {
    this.itemsState = items;
  }

  getItemsState(): any[] {
    return this.itemsState;
  }

  postChallenge(isOrganizationLevel:boolean, obj:any):Observable<any> {
    let reqParamms = {
      "isOrganizationLevel": isOrganizationLevel
    }
    return this.http.post(`/api/challenge`,obj, {params: reqParamms});
  }

  getAllChallenges(isOrganizationLevel:boolean):Observable<Challenge[]> {
    let reqParams = {
      "isOrganizationLevel": isOrganizationLevel
    }
    return this.http.get<Challenge[]>(`/api/challenge/all`,{params:reqParams}).pipe(
      catchError(error => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  getAllOngoingChallenges(isOrganizationLevel:boolean):Observable<Challenge[]> {
    let reqParams = {
      "isOrganizationLevel": isOrganizationLevel
    }

    return this.http.get<Challenge[]>(`/api/challenge/ongoing`,{params:reqParams});
  }

  join(challengeID:number[]):Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<any>(`/api/challenge/join`,challengeID, {headers, responseType: 'text' as 'json'});
  }

  completeChallenge(challengeID:number) {
    const reqParamms = {
      "challengeID": challengeID
    }
    return this.http.put(`/api/challenge/complete`,null,{params:reqParamms});
  }
}
