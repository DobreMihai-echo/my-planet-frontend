import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from './user.interface';
import { MatDialog } from '@angular/material/dialog';
import { SearchComponent } from 'src/app/components/search/search.component';
import { PickChallengeComponent } from 'src/app/components/pick-challenge/pick-challenge.component';
import { CreateChallengeComponent } from 'src/app/components/create-challenge/create-challenge.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

constructor(private userService:UserService,private authService:AuthService, private matDialog:MatDialog){}

  global="global";
  user:User;

  ngOnInit(): void {
    
    this.userService.getUserByUsername(this.authService.getUsername()).subscribe((data=>{
      console.log("MY USER ROMA ACTIVITY", data);
      this.user = data;
    }));
  }

  openSearchDialog(): void {
		this.matDialog.open(SearchComponent, {
			autoFocus: true,
			width: '500px'
		});
	}

  openDialog(): void {
    const dialogRef = this.matDialog.open(PickChallengeComponent, {
      width:'1000px',
      height:'1000px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogCreate(): void {
    const dialogRef = this.matDialog.open(CreateChallengeComponent);
    dialogRef.afterClosed().subscribe(rs => {
      console.log("HELLOOOO GOTHAM");
    })
  }

}
