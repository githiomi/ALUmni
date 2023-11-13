import { Component, Input, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event } from 'src/app/interfaces/event';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { EventDetailsComponent } from '../event-details/event-details.component';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  // Dependancy Injections
  private _router: Router = inject(Router);
  private _matDialog: MatDialog = inject(MatDialog);
  private _authService: AuthService = inject(AuthService);

  // Component Variables
  @Input() event !: Event;
  loginStatus !: boolean;

  ngOnInit(): void {
    this._authService.loginStatus$.subscribe(
      status => this.loginStatus = status
    )
  }

  openDetailsDialog(): void {

    if (!this.loginStatus) {
      this._router.navigate(['/login']);
      return;
    }

    const dialogConfig: MatDialogConfig = {
      data: {
        dialogState: 'view',
        dialogData: this.event
      },
      width: '70%',
      height: '80%',
      autoFocus: false,
      disableClose: true,
      enterAnimationDuration: 700,
      exitAnimationDuration: 700
    }

    const eventDetailsDialog = this._matDialog.open(
      EventDetailsComponent, dialogConfig
    );

    eventDetailsDialog.afterClosed().subscribe(console.log);
  }



}
