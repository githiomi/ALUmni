import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { emailPatternValidation } from 'src/app/validators/emailPatternValidator';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ContactService } from 'src/app/services/contact.service';

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
  private _contactService : ContactService = inject(ContactService);
  private _snackBarService : SnackbarService = inject(SnackbarService);

  // Class variable
  connectForm: FormGroup;
  isSubmitting = signal(false);

  constructor() {
    this.connectForm = this._formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      emailAddress: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required])
    }, {
      updateOn: 'blur',
      validators: [emailPatternValidation]
    })
  }

  onFormSubmit(form: any): void {

    this.isSubmitting.set(true);

    if (form.invalid) {
      this._snackBarService.openSnackBar('The form is invalid. Check and try again.', 'DISMISS');
      this.isSubmitting.set(false);
    }

    console.log("Form is valid");
  
  }

}
