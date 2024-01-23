import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-connect',
  standalone: true,
  imports: [CommonModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent {

  // Class variable
  connectForm !: FormGroup;

  // Dependency injection
  private _formBuilder: FormBuilder = inject(FormBuilder);

  constructor() {
    // Connect Form configuration
    this.formConfig();
  }

  private formConfig(): void {

    this.connectForm = this._formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      emailAddress: new FormControl('', [Validators.email, Validators.required]),
      message: new FormControl('', [Validators.required])
    }, {
      updateOn: blur
    });

  }

  onFormSubmit(form: any): void {
    if (form.valid)
      console.log("Form is valid");
  }

}
