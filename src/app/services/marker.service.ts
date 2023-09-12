import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marker } from '../components/events/marker.interface';
import { Observable, catchError, throwError } from 'rxjs';
import { ReplyResponse } from '../models/comment.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {


  constructor(private http: HttpClient) { }

  API_URL = 'http://localhost:8061';
  
  postEvent(createdMarker: Marker) {
    return this.http.post<Marker[]>(`/api/events`,createdMarker);
  }

  getAllMarkers() {
    return this.http.get<Marker[]>(`/api/events`);
  }

  deleteMarker(eventId:number) {
    return this.http.delete<Marker[]>(`/api/events/${eventId}`);
  }

  updateMarker(eventId:number, eventObject: Marker) {
    return this.http.put<Marker[]>(`/api/events/${eventId}`,eventObject);
  }

  joinEvent(eventId:number, username:string) {
    const reqParams = new HttpParams().set('eventId', eventId).set('username', username);
  
    return this.http.put<string[]>(`/api/events/join`, null, { params: reqParams });
  }

  unjoinEvent(eventId:number, username:string) {
    const reqParams = new HttpParams().set('eventId', eventId).set('username', username);

    console.log("EVENTID:", reqParams)
  
    return this.http.delete<string[]>(`/api/events/unjoin`, { params: reqParams });
  }


  getEventComments(eventId: number, page: number, size: number): Observable<ReplyResponse[]> {
		const reqParams = new HttpParams().set('page', page).set('size', size);
		return this.http.get<ReplyResponse[]>(`/api/events/${eventId}/messages`, { params: reqParams }).pipe(
      catchError((error: HttpErrorResponse)=> {
        return throwError(error);
      })
    );
	}

  createEventComment(eventId: number, content: string, username:string): Observable<ReplyResponse > {
		const formData = new FormData();
		formData.append('content', content);
    const reqParams = new HttpParams().set('username', username);
		return this.http.post<ReplyResponse>(`/api/events/${eventId}/messages/create`, formData, {params: reqParams}).pipe(
      catchError((error: HttpErrorResponse)=> {
        return throwError(error);
      })
    );
	}
}
