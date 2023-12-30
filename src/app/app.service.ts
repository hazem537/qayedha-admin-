import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  ReplaySubject,
  Subject,
  catchError,
  exhaustMap,

  take,

  throwError,
} from 'rxjs';
import { ModesService } from './auth/modes/modes.service';
import { BaseUser as User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  // handel modes
  Users = new ReplaySubject<User[]>(1);
  constructor(private http: HttpClient, private modeService: ModesService) {}
  //  handel error
  public handle_error(errorRes: HttpErrorResponse, screen_name: string) {
    console.log(errorRes);
    if (!errorRes || !errorRes.error) {
    }
    return this.handel_error_message(errorRes, screen_name);
  }
  private handel_error_message(errorRes, screen_name) {
    let error_message = 'خطاء غير معروف ';
    switch (screen_name) {
      case 'LOGIN':
        {
          switch (errorRes.error.code) {
            case 'InvalidBodyInput': {
              error_message = errorRes.error.message;
              break;
            }
            case 'InvalidCredentials': {
              error_message = 'كلمة المرور او اسم المستخدم غير صالحة ';
              break;
            }
          }
        }
        break;
      case 'CHANGEPASSWORD':
        {
          switch (errorRes.error.code) {
            case 'InvalidBodyInput': {
              error_message = errorRes.error.message;
              break;
            }
            case 'InvalidCredentials': {
              error_message = 'كلمة المرور  القديمة غير صحيحة ';
              break;
            }
          }
        }
        break;
      case 'INFLUNCERCODE':
        {
          switch (errorRes.error.code) {
            case 'DbUniqueViolation': {
              error_message = errorRes.error.message;
              break;
            }
          }
        }
        break;
      case 'ALLUSERS':
        {
          error_message = 'تاكد من الاتصال بالانترنت ';
        }
        break;
      default: {
        if (navigator.onLine) {
          console.log(errorRes);
        } else {
          error_message = 'تاكد من الاتصال بالانترنت ';
        }

        break;
      }
    }

    return throwError(error_message);
  }

  get_all_users() {
    return this.modeService.mode.pipe(
      take(1),
      exhaustMap((mode) => {
        return this.http.get<{ data: { users: User[] }; message: string }>(
          `${mode.url}users`
        );
      }),
      catchError((err) => {
        
        return this.handle_error(err, 'ALLUSERS');
      })
    );
  }
}
