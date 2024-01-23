import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-connect',
  standalone: true,
  imports: [CommonModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent {

  // Dependency injection
  private _formBuilder: FormBuilder = inject(FormBuilder);

  // Class variable
  connectForm !: FormGroup;

  constructor() {
    // Connect Form configuration
    this.connectForm = this._formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      emailAddress: new FormControl('', [Validators.email, Validators.required]),
      message: new FormControl('', [Validators.required])
    }, {
      updateOn: blur
    })
  }

  private formConfig(): void {

  }

  onFormSubmit(form: any): void {
    if (form.valid)
      console.log("Form is valid");
  }

}
