import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { AppConstants } from 'src/app/models/appconstants';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup
  constructor(private userService:UserService,
    private router:Router,
    private fb:FormBuilder,
    private matSnackbar: MatSnackBar){}


  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [ Validators.required
        // Validators.pattern("^[0-9]*$"),
        // Validators.minLength(10), Validators.maxLength(10)]],
      ]],
        password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator, updateOn: 'submit' });
  }

  passwordMatchValidator(control: AbstractControl): void {
    const password = control.get('password')?.value ?? '';
    const confirmPassword = control.get('confirmPassword')?.value ?? '';
  
    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ mismatch: true });
    }
  }

  submitForm() {
    this.userService.register(this.form.value).subscribe(
      (response:any) => {
        this.matSnackbar.openFromComponent(SnackbarComponent, {
          data: AppConstants.signinSuccessDetail,
          panelClass: ['bg-danger'],
          duration: 5000
        });
        this.router.navigate(['/login']);

      },
      (error) => {
        console.log(error)
      }
    )
  }
}
