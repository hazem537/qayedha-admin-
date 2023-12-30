import { Component, EventEmitter, Output, Input, OnInit, OnDestroy } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ModesService } from '../auth/modes/modes.service';
import { Mode } from '../auth/modes/mode.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit ,OnDestroy{
  @Output() toggleNav = new EventEmitter<boolean>();
  @Input() status: boolean = false;
  is_auth = false;
  mode: Mode;
  authsub:Subscription;
  modesub:Subscription;

  constructor(
    private authService: AuthService,
    private modeService:ModesService
  ) {}
  ngOnDestroy(): void {
this.authsub.unsubscribe()
this.modesub.unsubscribe()
  }
  ngOnInit(): void {
   this.authsub = this.authService.user.subscribe((user) => {
      this.is_auth = !!user;
    });
  this.modesub =  this.modeService.mode.subscribe((mode) => {
    console.log(mode) 
    this.mode = mode;
    });
  }
  onlogout() {
    this.authService.logout();
    this.toggleNav.emit(false);
  }
}
