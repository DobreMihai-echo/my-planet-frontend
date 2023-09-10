import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Challenge } from '../models/challenges.interface';

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

  postChallenge(type:string, obj:any):Observable<any> {
    let reqParamms = {
      "type": type
    }
    return this.http.post(`/api/challenge`,obj, {params: reqParamms});
  }

  getAllChallenges(username:string):Observable<Challenge[]> {
    let reqParams = {
      username: username
    }
    return this.http.get<Challenge[]>(`/api/challenge/all`,{params:reqParams});
  }

  getAllOngoingChallenges(usernamme:string):Observable<Challenge[]> {
    let reqParams = {
      username: usernamme
    }

    return this.http.get<Challenge[]>(`/api/challenge/ongoing`,{params:reqParams});
  }

  join(challengeID:number, username:string):Observable<Challenge> {
    const params = {
      username: username
    }
    return this.http.put<Challenge>(`/api/challenge/join`,challengeID,{params: params});
  }
}
