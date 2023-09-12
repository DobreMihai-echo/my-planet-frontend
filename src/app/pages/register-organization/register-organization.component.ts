import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { AppConstants } from 'src/app/models/appconstants';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-organization',
  templateUrl: './register-organization.component.html',
  styleUrls: ['./register-organization.component.css']
})
export class RegisterOrganizationComponent {
  form!: FormGroup
  constructor(private userService:UserService,
    private router:Router,
    private fb:FormBuilder,
    private matSnackbar: MatSnackBar){}


  ngOnInit(): void {
    this.form = this.fb.group({
      organizationName: this.fb.control('', Validators.required),
      username: this.fb.control('', Validators.required),
      email: this.fb.control('', Validators.required),
      phone: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
      confirmPassword: this.fb.control('', Validators.required)
    }, {updateOn: 'submit'})
  }

  submitForm() {
    this.userService.register(this.form.value).subscribe(
      (response:any) => {
        this.matSnackbar.openFromComponent(SnackbarComponent, {
          data: AppConstants.signinSuccessDetail,
          panelClass: ['bg-success'],
          duration: 5000
        });
        this.router.navigate(['/login']);

      },
      (error) => {
        console.log("ERRORSS:" , error.error)
        this.matSnackbar.openFromComponent(SnackbarComponent, {
          data: error,
          panelClass: ['bg-danger'],
          duration: 5000
        })
      }
    )
  }
}
