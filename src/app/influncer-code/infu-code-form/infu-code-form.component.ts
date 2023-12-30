import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MinValueDirective } from './min-value.directive';
import { influncer_form } from './influncerCode.modle';
import { InfluncerService } from '../influncer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-infu-code-form',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, MinValueDirective,CommonModule],
  templateUrl: './infu-code-form.component.html',
  styleUrl: './infu-code-form.component.css',
})
export class InfuCodeFormComponent implements OnInit {
  influncer_code_form: FormGroup;
  current_date=new Date()

  @ViewChild(FormGroupDirective) private form!: FormGroupDirective;
  constructor(
    private influncerService: InfluncerService,
    private snakebar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.influncer_code_form = new FormGroup({
      code: new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(15)]),
      NumberOfDays: new FormControl('', [Validators.required]),
      expireAt: new FormControl(null),
    });
  }

  onsubmitform() {
    const value = this.influncer_code_form.value;
    const influncer_code: influncer_form = {
      code: value['code'],
      NumberOfDays: +value['NumberOfDays'],
      expireAt:  (value['expireAt'] as Date)? (value['expireAt'] as Date).toISOString():null,
    };
    // console.log(influncer_code);
    // this.submit.emit(null);
    console.log(influncer_code);
    this.influncerService.create_influncer_code(influncer_code).subscribe(
      (data) => {
        console.log(data);
        this.snakebar.open(`لقد تم اضافة الكود بنجاح `, 'Dismiss', {
          duration: 2000,
        });
        // this.influncer_code_form.reset();
        this.form.resetForm();
        // this.influncer_code_form.markAsPristine()
        // this.influncer_code_form.markAsUntouched()
      },
      (err) => {
        this.snakebar.open(`${err}`, 'Dismiss', { duration: 2000 });
      }
    );
  }
  
}
