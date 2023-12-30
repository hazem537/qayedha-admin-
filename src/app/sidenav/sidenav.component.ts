import { Component ,OnInit} from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MaterialModule,RouterModule,CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit {
  is_auth=false;
  constructor(private authService:AuthService){
  }
  ngOnInit(): void {
    this.authService.user.subscribe(user=>{
      this.is_auth=!!user;
    })
  }



}
