import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-connect',
  standalone: true,
  imports: [CommonModule, MatCardModule, ReactiveFormsModule],
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent {

  // Dependency injection
  

  onFormSubmit(form:any) : void {
    if (form.valid)
      console.log("Form is valid");
      
  }

}
