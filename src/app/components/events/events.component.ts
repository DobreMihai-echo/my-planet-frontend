import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Marker } from './marker.interface';
import { User } from 'src/app/pages/profile/user.interface';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ReplyComponent } from '../reply/reply.component';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { MarkerService } from 'src/app/services/marker.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  @Input() marker: Marker;
  @Output() delete = new EventEmitter<number>();
  @Output() update : EventEmitter<{markerId: number, markerUpdate: Marker}> = new EventEmitter<{markerId: number, markerUpdate: Marker}>();
  markerCreator: User;
  eventJoiners:User[] = new Array();
  eventJoinersUsername: string[] = new Array();

  constructor(public auth: AuthService, private dialog: MatDialog, private userService: UserService, private markerService: MarkerService) {
  }

  customOptions: OwlOptions = {
    loop: true,
    margin: 10,
    stagePadding: 1,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText:['',''],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 12
      }
    },
    nav: true
  }


  ngOnInit(): void {
    this.userService.getUserByUsername(this.marker.username).subscribe(data=>{
      this.markerCreator = data;
      console.log(this.markerCreator.username);
    });

    console.log("EVENT JOINERS ON MARKER FOR:" + this.marker.username + this.marker.eventJoiners);
    this.eventJoinersUsername = this.marker.eventJoiners;
    console.log("MY USERNAMES:",this.eventJoinersUsername)
    this.userService.getUsersByListOfUsernames(this.marker.eventJoiners);
    if(this.eventJoinersUsername.length > 0) {
      this.getJoiners();
    }
  }

  createRange(number){
    // return new Array(number);
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }

  join(markerId:number) {
    this.markerService.joinEvent(markerId, this.auth.getUsername()).subscribe(data=> {
      this.eventJoinersUsername = data; 
      this.getJoiners();
    });
  }

  getJoiners() {
    this.userService.getUsersByListOfUsernames(this.eventJoinersUsername).subscribe(data=>{
      this.eventJoiners = data;
      this.customOptions.loop = this.eventJoiners.length > 1;
    })
  }

  comments(markerId:number) {
    this.dialog.open(ReplyComponent,{data: this.marker.id});
  }

  share(markerId:number) {
    console.log("clicked",markerId);
  }

  deleteMarker(markerId:number) {
    this.delete.emit(markerId);
  }

  updateMarker(markerId:number) {
    const dialogRef = this.dialog.open(DialogComponent,{
      data: this.marker
    });

    dialogRef.afterClosed().subscribe(result => {
        if(result.data) {
          this.update.emit({markerId: markerId, markerUpdate: result.myData});
        }
    })
  }

  unjoin(markerid: number) {
    this.markerService.unjoinEvent(markerid,this.auth.getUsername()).subscribe(data=>{
      this.eventJoinersUsername = data;
      this.getJoiners();
    })
  }


  getAuthUser() {
    return this.auth.getUsername();
  }

  isAuthUser(username: string) {
    const authUser = this.getAuthUser();
    console.log("USERNAME:",authUser && authUser == username);
    return authUser && authUser === username;
  }

  isJoiner() {
    const username = this.auth.getUsername();
    return this.eventJoiners.some(joiner => joiner.username === username);
  }
}
