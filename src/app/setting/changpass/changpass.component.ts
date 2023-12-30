import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import {
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl,
  FormsModule,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SettingService } from '../setting.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-changpass',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, FormsModule],
  templateUrl: './changpass.component.html',
  styleUrl: './changpass.component.css',
})
export class ChangpassComponent implements OnInit {
  changepassForm: FormGroup;
  @ViewChild('exit', { static: true }) exitelme: ElementRef;
  ngOnInit(): void {
    this.changepassForm = new FormGroup({
      old_password: new FormControl(null, [Validators.required]),
      new_password: new FormControl(null, [Validators.required]),
    });
  }
  constructor(
    private settingService: SettingService,
    private ref: MatDialogRef<ChangpassComponent>,
    private snackbar: MatSnackBar
  ) {}
  onsubmit() {
    this.settingService
      .changePassword(
        this.changepassForm.value['old_password'],
        this.changepassForm.value['new_password']
      )
      .subscribe(
        (data) => {
          this.snackbar.open('لقد تم تغيير كلمة  المرور بنجاح ', 'Dismiss', {
            duration: 2000,
          });
          this.ref.close();
        },
        (error) => {
          console.log(error);
          this.snackbar.open(error, 'Dismiss', { duration: 2000 });
        }
      );
  }
}
