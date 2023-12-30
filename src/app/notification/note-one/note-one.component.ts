import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { NoteFormComponent } from '../note-form/note-form.component';

@Component({
  selector: 'app-note-one',
  standalone: true,
  imports: [MaterialModule,NoteFormComponent],
  templateUrl: './note-one.component.html',
  styleUrl: './note-one.component.css'
})
export class NoteOneComponent {

}
