import { Component } from '@angular/core';
import { InfuCodeFormComponent } from './infu-code-form/infu-code-form.component';
import { InfluncerService } from './influncer.service';
import { influncer_form } from './infu-code-form/influncerCode.modle';

@Component({
  selector: 'app-influncer-code',
  standalone: true,
  imports: [InfuCodeFormComponent],
  templateUrl: './influncer-code.component.html',
  styleUrl: './influncer-code.component.css',
})
export class InfluncerCodeComponent {



}