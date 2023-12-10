import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { passwordMatchValidator } from 'src/app/validators/passwordMatchValidator';
import { MatSelectModule } from '@angular/material/select';
import { EventService } from 'src/app/services/event.service';
import { Observable } from 'rxjs';
import { ServerResponse } from 'src/app/interfaces/serverResponse';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, ReactiveFormsModule, MatProgressSpinnerModule, MatButtonModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  // Readonly
  protected readonly years$: number[];
  protected readonly roles$: string[];
  protected readonly genders$: string[];

  // Dependency Injection
  private _router: Router = inject(Router);
  private _snackBarService: SnackbarService = inject(SnackbarService);
  private _authService: AuthService = inject(AuthService);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _eventService: EventService = inject(EventService);

  // Triggers
  isProcessing: boolean = false;

  // Component Variables
  registerForm: FormGroup;

  constructor() {

    this.years$ = this._eventService.years;
    this.roles$ = this._eventService.roles;
    this.genders$ = this._eventService.genders;

    this.registerForm = this._formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      graduationYear: new FormControl('', [Validators.required]),
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, {
      updateOn: 'blur',
      validators: [passwordMatchValidator]
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

    const newUser = {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      age: age,
      graduationYear: graduationYear,
      emailAddress: emailAddress,
      role: role,
      password: password === confirmPassword ? password : ''
    }

    // Make service call
    this._authService.createNewUser(newUser).subscribe(
      (_response: ServerResponse) => {
        const newUser = _response.resource;
        console.log(newUser);

        this._snackBarService.openSnackBar(`${_response.message}. Username: ${newUser.username}`, 'CLOSE', 10000);
        this._router.navigateByUrl('/login');
      },
      (err) => {
        this.isProcessing = false;
        this._snackBarService.openSnackBar(err);
      }
    )
  }

}
