import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Challenge } from '../models/challenges.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  sharedLoginOverlay: EventEmitter<boolean> = new EventEmitter<boolean>();

  challenges$ = new Subject<Challenge>;

  deleteItem(challenge: Challenge) {
    this.challenges$.next(challenge);
  }
  constructor() { }
}
