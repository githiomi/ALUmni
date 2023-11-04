import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatCardModule, ReactiveFormsModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // Dependency Injection
  private _formBuilder : FormBuilder = inject(FormBuilder);
  private _router : Router = inject(Router);

  // Component Variables
  isProcessing : boolean = false;
  loginForm : FormGroup;

  constructor(){
    this.loginForm = this._formBuilder.group({
      alumniId : new FormControl('', [Validators.required]),
      alumniPassword : new FormControl('', [Validators.required])
    })
  }

  submitForm( form : any) {
    this.isProcessing = true;

    if ( ! form.valid ) {
      alert('Form Is Invalid');
      this.isProcessing = false;
      return;
    }

    // Getting Form Content
    let formValue = form.value;
    let alumniId = formValue.alumniId;
    let alumniPassword = formValue.alumniPassword;

    alert(alumniId + ", " + alumniPassword);

    setTimeout(
      () => this._router.navigate(['/events']), 1000
    )

  }

}
