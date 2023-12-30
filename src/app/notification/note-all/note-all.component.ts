import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoteFormComponent } from '../note-form/note-form.component';

@Component({
  selector: 'app-note-all',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule,NoteFormComponent],
  templateUrl: './note-all.component.html',
  styleUrl: './note-all.component.css',
})
export class NoteAllComponent {}
