import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../profile/user.interface';
import { Dialog } from '@angular/cdk/dialog';
import { EditDialogComponent } from 'src/app/components/edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {
  isProfileViewerOwner:boolean = false;
  viewerFollowsProfileUser: boolean = false;
  profileUsername: string = '';
  private subscriptions: Subscription[] = [];
  profilePicture:string='';
  coverPicture:string='';
  user:User;
  constructor(private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private userService:UserService,
    private dialog:MatDialog){}

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.paramMap.get('username') === null) {
        this.isProfileViewerOwner = true;
        this.profileUsername = this.auth.getUsername();
    } else {
      this.profileUsername = String(this.activatedRoute.snapshot.paramMap.get('username'));
    }

    this.subscriptions.push(
      this.userService.getUserByUsername(this.profileUsername).subscribe(data => {
        this.user = data;
      })
    )
  }

  isUserAuthenticatedUser() {
    return this.auth.getUsername()===this.user.username;
  }

  editAccount() {
    console.log('Clicked',this.user);
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { user: this.user },  
    });
  }
}
