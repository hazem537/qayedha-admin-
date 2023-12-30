import { Component,OnInit } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { ChangpassComponent } from './changpass/changpass.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService,  } from '../app.service';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [MaterialModule,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent implements OnInit {
  constructor(public CPdialog:MatDialog,private appService:AppService){}
  ngOnInit(): void {
  }
  CPDialog(){
    this.CPdialog.open(ChangpassComponent,{width:"500px"})
  }
}
