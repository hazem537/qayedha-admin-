import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, exhaustMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { ModesService } from './modes/modes.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  constructor(
    private appService: AppService,
    private modeService: ModesService,
    private http: HttpClient,
    private router: Router,
    private snakebar: MatSnackBar
  ) {}
  login(username: string, password: string) {
    return this.modeService.mode.pipe(
      take(1),
      tap((mode) => {
        this.modeService.setmode(mode);
      }),
      exhaustMap((mode) => {
        //  save mode in local storage

        return this.http
          .post<{ data: User; message: string }>(mode.url + 'admin/login', {
            username: username,
            password: password,
          })
          .pipe(
            tap((Rdata) => {
              this.handle_auth(Rdata.data);
            }),
            catchError((err) => {
              return this.appService.handle_error(err, 'LOGIN');
            })
          );
      })
    );
  }

  auto_login() {

    const userData: User = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      const loaduser = new User(userData.adminUser, userData.token);
      if (loaduser.token) {
        this.user.next(loaduser);
      this.appService.get_all_users().subscribe(data=>{
        this.appService.Users.next(data.data.users)
      })

      }
    }
  }
  logout() {
    this.modeService.clear_mode();
    localStorage.clear()
    this.user.next(null);
    this.router.navigate(['/auth']);
    
  }

  private handle_auth(user: User) {
    const logedin_user = new User(user.adminUser, user.token);
    this.user.next(logedin_user);
    localStorage.setItem('userData', JSON.stringify(user));

    this.appService.get_all_users().subscribe(
      (data) => {
        this.appService.Users.next(data.data.users);
      },
      (err) => {
        this.snakebar.open(`${err}`, 'Dismiss', { duration: 2000 });
      }
    );

    this.router.navigate(['/']);
  }
}
