import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { AppConstants } from 'src/app/models/appconstants';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup
  constructor(private userService:UserService,
    private authService: AuthService,
    private router:Router,
    private fb:FormBuilder,
    private matSnackbar: MatSnackBar){}


  ngOnInit(): void {
    this.form = this.fb.group({
      username: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required)
    }, {updateOn: 'submit'})
  }

  submitForm() {
    this.userService.login(this.form.value).subscribe(
      (response:any) => {
        this.authService.setToken(response.jwtToken);
        this.authService.setRoles(response.users.authorities)
        this.authService.setUser(response.users);
        this.authService.setProfile(response.profilePhoto);
        this.router.navigate(['/home']);
        this.matSnackbar.openFromComponent(SnackbarComponent, {
          data: AppConstants.signinSuccessDetail,
          panelClass: ['bg-danger'],
          duration: 5000
        });

      },
      (error) => {
        this.matSnackbar.openFromComponent(SnackbarComponent, {
          data: AppConstants.snackbarErrorContent,
          panelClass: ['bg-danger'],
          duration: 5000
        });
        console.log(error)
      }
    )
  }
}
