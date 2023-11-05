import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, ReactiveFormsModule, MatProgressSpinnerModule, MatButtonModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, MatDatepickerModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  // Dependency Injection
  private _router: Router = inject(Router);
  private _authService: AuthService = inject(AuthService);
  private _formBuilder: FormBuilder = inject(FormBuilder);

  // Component Variables
  isProcessing: boolean = false;
  registerForm: FormGroup;

  constructor() {
    this.registerForm = this._formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      role: new FormControl('Alumni', [Validators.required]),
      graduationYear: new FormControl('', [Validators.required]),
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    })
  }

  submitForm(form: any) {
    this.isProcessing = true;

    if (!form.valid) {
      alert('Form Is Invalid');
      this.isProcessing = false;
      return;
    }

    // Getting Form Content
    let formValue = form.value;
    let firstName = formValue.firstName;
    let lastName = formValue.lastName;
    let age = parseInt(formValue.age);
    let gender = formValue.gender.toUpperCase();
    let role = formValue.role;
    let graduationYear = parseInt(formValue.graduationYear);
    let emailAddress = formValue.emailAddress;
    let password = formValue.password;
    let confirmPassword = formValue.confirmPassword;

    if (password !== confirmPassword){
      alert('Passwords Do Not Match');
      this.isProcessing = false;
      return;
    }

    alert(firstName + ', ' + lastName + ', ' + age + ', ' + gender + ', ' + role + ', ' + graduationYear + ', ' + emailAddress + ', ' + password + ', ' + confirmPassword)

    this._authService.changeLoginStatus(true);

    setTimeout(
      () => {
        this._router.navigate(['/home']);
      }, 1000
    )

  }

}