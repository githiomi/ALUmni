import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { emailPatternValidation } from 'src/app/validators/emailPatternValidator';

@Component({
  selector: 'app-connect',
  standalone: true,
  imports: [CommonModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent {

  // Dependency injection
  private _formBuilder: FormBuilder = inject(FormBuilder);

  // Class variable
  connectForm !: FormGroup;
  isSubmitting = signal(false);

  constructor() {
    // Connect Form configuration
    this.connectForm = this._formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      emailAddress: new FormControl('', [Validators.email, Validators.required]),
      message: new FormControl('', [Validators.required])
    }, {
      updateOn: blur,
      Validators: [emailPatternValidation]
    })
  }

  onFormSubmit(form: any): void {

    this.isSubmitting.set(true);

    if (form.invalid) {
      setTimeout( () => this.isSubmitting.set(false), 2000);
      return;
    }

    console.log("Form is valid");
  
  }

}
