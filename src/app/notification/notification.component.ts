import { Component } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { NoteAllComponent } from './note-all/note-all.component';
import { NoteOneComponent } from './note-one/note-one.component';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [MaterialModule,NoteAllComponent,NoteOneComponent],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {

}
