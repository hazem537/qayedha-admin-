import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActionType, Note, qayedha_screeen } from '../note.moduel';
import { NoteService } from '../note.service';
import { UserFilterPipe } from '../../codes/user-filter.pipe';
import { QscreenPipe } from './qscreen.pipe';
import { ActionTextPipe } from './action-text.pipe';
import { BaseUser as User } from '../../user.model';
import { AppService } from '../../app.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { ImageNamePipe } from './image-name.pipe';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    UserFilterPipe,
    QscreenPipe,
    ActionTextPipe,
    LoaderComponent,
    ImageNamePipe,
  ],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.css',
})
export class NoteFormComponent implements OnInit {
  constructor(
    private noteService: NoteService,
    private appservice: AppService,
    private snakebar: MatSnackBar
  ) {}
  @Input() one_Usermode = false;
  @ViewChild(FormGroupDirective) form!: FormGroupDirective;

  note_form: FormGroup;
  action_types: ActionType[];
  qyaedha_screens: qayedha_screeen[];
  users: User[] = [];
  ngOnInit(): void {
    this.action_types = this.noteService.actionTypes;
    this.qyaedha_screens = this.noteService.qayedha_screens;
    let form: FormGroup = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      Description: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      Action_Path: new FormControl('_', [Validators.required]),
      Action_Type: new FormControl(1, Validators.required),
    });

    if (this.one_Usermode) {
      this.appservice.Users.subscribe((users: User[]) => {
        this.users = users;
      });
      form.addControl(
        'user',
        new FormControl(null, [Validators.required, this.validuser.bind(this)])
      );
    }

    this.note_form = form;
    this.note_form.get('Action_Type').valueChanges.subscribe((value) => {
      if (this.note_form.get('image')) {
        this.note_form.removeControl('image');
      }
      this.note_form.controls['Action_Path'].setValue(null);
      this.note_form.controls['Action_Path'].setValidators([
        Validators.required,
      ]);

      if (value == 4) {
        this.note_form.addControl(
          'image',
          new FormControl(null, Validators.required)
        );
        this.note_form
          .get('Action_Path')
          .setValidators([
            Validators.required,
            Validators.pattern(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i),
          ]);
      } else if (value == 2) {
        this.note_form
          .get('Action_Path')
          .setValidators([
            Validators.required,
            Validators.pattern(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i),
          ]);
      } else if (value == 1) {
        this.note_form.get('Action_Path').setValue('_');
      }
      let selected_action_type = this.action_types.find((x) => x.id == value);
      console.log(selected_action_type);
    });
  }

  send_notify() {
    if (!this.one_Usermode) {
      const note: Note = this.note_form.value;
      let final_note: Note = note;

      if (!!note.image) {
        final_note.Action_Path = `${note.image};${note.Action_Path}`;
        delete final_note['image'];
        delete final_note['user'];
      }
      this.noteService.note_all(note).subscribe(
        (data) => {
          this.snakebar.open(`${data}`, 'Dismiss', { duration: 2000 });
          this.form.resetForm({ Action_Type: 1 });
        },
        (err) => {
          this.snakebar.open(`${err}`, 'Dismiss', { duration: 2000 });
          this.form.resetForm({ Action_Type: 1 });
        }
      );
    } else {
      const note: Note = this.note_form.value;
      let final_note: Note = note;
      final_note.userid = this.note_form.value['user']?.id;
      console.log(final_note);

      if (!!note.image) {
        final_note.Action_Path = `${note.image};${note.Action_Path}`;
        delete final_note['image'];
      }
      this.noteService.note_all(note).subscribe(
        (data) => {
          this.snakebar.open(`تم ارسال الأشعار`, 'Dismiss', { duration: 2000 });
          this.form.resetForm({ Action_Type: 1 });
        },
        (err) => {
          this.snakebar.open(`${err}`, 'Dismiss', { duration: 2000 });
          this.form.resetForm({ Action_Type: 1 });
        }
      );
    }
  }

  display_with_fn(user: User) {
    return user && user.username ? user.username : '';
  }

  file = new FormControl(null);
  url_ready = true;
  url: string = '';
  onuploadimage(event: HTMLInputElement) {
    this.url_ready = false;
    if (event.files.length > 0) {
      const file = <File>event.files[0];

      let formObje = new FormData();
      formObje.append('file', file, file.name);

      this.noteService.upload_image(formObje).subscribe((res) => {
        console.log('upload image');
        this.note_form.get('image').setValue(`${res.data.url}`);
        this.url_ready = true;
      },err=>{
        this.snakebar.open('حجم الصور يجب ان تكون اقل  من 30 ميجا','Dissmis',{duration:2000})
        this.url_ready = true;
      });
    } else {
    }
  }
  select_image(event) {
    console.log(event.target.files.length > 0);
    if (event.target.files.length > 0) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    } else {
    }
  }

  clearfile() {
    this.file.setValue(null);
    this.note_form.get('image').setValue(null);
  }

  validuser(control: FormControl): null | ValidationErrors {
    if (this.users.indexOf(control.value) == -1 && control.value != null) {
      return { usernotfound: true };
    } else {
      return null;
    }
  }
}
