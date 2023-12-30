import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './auth/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { AppService } from './app.service';
import { ModesService } from './auth/modes/modes.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MaterialModule,
    RouterModule,
    HeaderComponent,
    SidenavComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Qayedha Admin';
  @ViewChild('side') sidenav: MatSidenav;
  constructor(
    private snakebar: MatSnackBar,
    private authservice: AuthService,
    private modeService: ModesService,
    private appservice: AppService
  ) {}

  ngOnInit() {
    this.modeService.auto_get_mode();
    this.authservice.auto_login();
    
  }

  ontoggle(forced: boolean) {
    if (forced == false) {
      this.sidenav.close();
    } else {
      this.sidenav.toggle();
    }
  }
}
