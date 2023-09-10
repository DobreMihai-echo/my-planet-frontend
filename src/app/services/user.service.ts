import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserOrganization, UserResponse } from '../models/users.interface';
import { User } from '../pages/profile/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loginEvent = new EventEmitter<void>();

  constructor(private httpClient: HttpClient) { }

  public login(loginData:any) {
    this.loginEvent.emit();
    return this.httpClient.post(`/api/auth/login`, loginData);
  }

  public register(registerData:any) {
    return this.httpClient.post(`${environment.link}/api/auth/register`, registerData);
  }

  public getOrganization(username:string):Observable<UserOrganization> {
    const params = new HttpParams().set('username', username);
    return this.httpClient.get<UserOrganization>(`${environment.link}/api/organizations`, { params });
  }

  public getUserByUsername(username:string):Observable<User> {
    const params = new HttpParams().set('username',username);
    return this.httpClient.get<User>(`${environment.link}/api/user`, { params });
  }

  public getUsersByListOfUsernames(usernames:string[]):Observable<User[]> {
    return this.httpClient.post<User[]>(`${environment.link}/api/users/event`,usernames);
  }

  public updateUserProfile(formData: FormData): Observable<any> {
    return this.httpClient.put(`${environment.link}/api/user/profile`, formData);
  }

  followUser(userId: number): Observable<any | HttpErrorResponse> {
		return this.httpClient.post<any | HttpErrorResponse>(`${environment.link}/api/account/follow/${userId}`, null);
	}

	unfollowUser(userId: number): Observable<any | HttpErrorResponse> {
		return this.httpClient.post<any | HttpErrorResponse>(`${environment.link}/api/account/unfollow/${userId}`, null);
	}

	getUserSearchResult(key: string, page: number, size: number): Observable<UserResponse[]> {
		const reqParams = new HttpParams().set('key', key).set('page', page).set('size', size);
		return this.httpClient.get<UserResponse[]>(`${environment.link}/api/users/search`, { params: reqParams }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
	}
}
