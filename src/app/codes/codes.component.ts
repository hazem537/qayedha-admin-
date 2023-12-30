import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserFilterPipe } from './user-filter.pipe';
import { BaseUser as User } from '../user.model';
import { AppService } from '../app.service';
import { MinValueDirective } from '../influncer-code/infu-code-form/min-value.directive';
import { CodesService } from './codes.service';
import { code } from './code.model';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-codes',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    UserFilterPipe,
    CommonModule,
    ReactiveFormsModule,
    MinValueDirective,
  ],
  templateUrl: './codes.component.html',
  styleUrl: './codes.component.css',
})
export class CodesComponent implements OnInit {
  users: User[]=[]
  code_form: FormGroup;
  current_date = new Date();
 @ViewChild(FormGroupDirective) form:FormGroupDirective;
  constructor(
    private appService: AppService,
    private codeService: CodesService,
    private snakebar: MatSnackBar
  ) {}
  ngOnInit() {
    this.appService.Users.subscribe((users:User[])=>{
      this.users = users
    })
    this.current_date.setDate(this.current_date.getDate() +1)  

    this.code_form = new FormGroup({
      code_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),,Validators.maxLength(15)
      ]),
      duration: new FormControl(null, [Validators.required]),
      user: new FormControl(null, [
        Validators.required,
        this.validate_user.bind(this),
      ]),
      expire_date: new FormControl(null,Validators.required),
    });
  }
  onsubmit() {
    let codeForm: code = {
      code: this.code_form.value['code_name'],
      userId: (this.code_form.value['user'] as User).id,
      numberOfDays: this.code_form.value['duration'],
      expireAt: this.code_form.value['expire_date'] ?  (this.code_form.value['expire_date'] as Date).toISOString() :null  ,
    };
    this.codeService.add_code(codeForm).subscribe(
      (data) => {
        this.snakebar.open(`تم اضافة الكود بنجاح `, 'Dismiss', { duration: 2000 });
        this.form.resetForm()
      },
      (err) => {
        this.snakebar.open(`${err}`, 'Dismiss', { duration: 2000 });
      }
    );
  }
  showusername(user: User): string {
    return user && user.username ? user.username : '';
  }
  validate_user(control:FormControl) {
    if (this.users?.indexOf(control.value) == -1 )  {
      return { notFoundUser: true };
    }
    return null;
  }

 }
