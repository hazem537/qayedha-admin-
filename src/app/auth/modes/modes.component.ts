import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import {
  MatButtonToggle,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { ModesService } from './modes.service';
import { Mode } from './mode.model';

@Component({
  selector: 'app-modes',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './modes.component.html',
  styleUrl: './modes.component.css',
})
export class ModesComponent implements OnInit {
  server: FormGroup;
  modes: Mode[];
  // toogle:MatButtonToggle
  constructor(
    private modeService: ModesService,
    private rootFormGroup: FormGroupDirective
  ) {}
  ngOnInit(): void {
    this.modes = this.modeService.modes;
    this.server = this.rootFormGroup.control.get('server') as FormGroup;
  }
  groupclick(group: MatButtonToggleGroup) {
    console.log(group.value);
  }
}
