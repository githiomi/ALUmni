import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthResponse } from 'src/app/interfaces/authResponse';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, ReactiveFormsModule, MatButtonModule, MatProgressSpinnerModule, MatSnackBarModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // Dependency Injection
  private _router: Router = inject(Router);
  private _matSnackBar: MatSnackBar = inject(MatSnackBar);
  private _authService: AuthService = inject(AuthService);
  private _formBuilder: FormBuilder = inject(FormBuilder);

  // Component Variables
  isProcessing: boolean = false;
  loginForm: FormGroup;

  constructor() {
    this.loginForm = this._formBuilder.group({
      username: new FormControl('', [Validators.required]),
      alumniPassword: new FormControl('', [Validators.required])
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
    let username = formValue.username;
    let password = formValue.alumniPassword;

    // this._authService.loginUser(alumniId, alumniPassword);
    this._authService.loginUser(username, password).subscribe(
      ( _res : AuthResponse ) => {
        this._matSnackBar.open(_res.message, "CLOSE", {
          duration: 2000,
          horizontalPosition: 'start'
        })

        // Navigate to home page
        this._router.navigate(['/home']);
      },
      _err => {
        this.isProcessing = false;
        this._matSnackBar.open(_err.message, "CLOSE", {
          duration: 2000,
          horizontalPosition: 'start'
        });
      }
    );

  }

}
