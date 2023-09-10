import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/pages/profile/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {
  user: User;
  profilePicture: File | null = null;
  coverPicture: File | null = null;



  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService:UserService) {
    console.log("FROM DIALOG", data.user);
    this.user = data.user;
  }

  saveChanges() {
    const formData: FormData = new FormData();
    formData.append('firstName', this.user.firstName);
    formData.append('lastName', this.user.lastName);
    formData.append('email', this.user.email);
    formData.append('username', this.user.username);
    formData.append('phone', this.user.phone);
    formData.append('about', this.user.about);

    if (this.profilePicture) {
      formData.append('profilePicture', this.profilePicture, this.profilePicture.name);
    }

    if (this.coverPicture) {
      formData.append('coverPicture', this.coverPicture, this.coverPicture.name);
    }

    this.userService.updateUserProfile(formData).subscribe(data=>{
      console.log("SUCCESS");
    })

  }

  changeProfilePhoto(event: any) {
    this.profilePicture = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.user.profilePhoto = e.target.result.split(',')[1];
    };

    if(this.profilePicture) {
      reader.readAsDataURL(this.profilePicture);
    }
  }

  changeCoverPhoto(event: any) {
    this.coverPicture = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.user.coverPhoto = e.target.result.split(',')[1];
    };

    if(this.coverPicture) {
      reader.readAsDataURL(this.coverPicture);
    }
  }
}
