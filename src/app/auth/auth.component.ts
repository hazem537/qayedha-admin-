import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ModesComponent } from './modes/modes.component';
import { ModesService } from './modes/modes.service';
import { Mode } from './modes/mode.model';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ModesComponent,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  error: string = null;
  modes: Mode[];
  constructor(
    private authservice: AuthService,
    private modeService:ModesService,
    private snackBar: MatSnackBar,
    
  ) {}
  ngOnInit(): void {
    this.modes = this.modeService.modes;
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      server: new FormGroup({
        mode: new FormControl(this.modes[1], Validators.required),
      }),
    });
  }
  onlogin() {
    
    let {"mode":new_mode} = this.loginForm.get('server').value
    this.modeService.mode.next(new_mode)
    console.log(new_mode)
    this.authservice
    .login(this.loginForm.value['username'], this.loginForm.value['password'])
    .subscribe(
      (data) => {
        // console.log(data);        
        },
        (error) => {
          this.snackBar.open(error, 'Dismiss', { duration: 2000 });
          console.log(error);
          this.loginForm.reset();
        }
      );
  }


}
