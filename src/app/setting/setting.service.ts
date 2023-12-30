import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { catchError, exhaustMap, take, takeLast, tap } from 'rxjs';
import { ModesService } from '../auth/modes/modes.service';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  constructor(private http: HttpClient, private appService: AppService,
    private modeService:ModesService) {}

  changePassword(oldPassword: string, newPassword: string) {
    return this.modeService.mode.pipe(
      take(1),
      exhaustMap((mode) => {
        return this.http
          .patch(mode.url + 'admin/change-password', {
            oldPassword: oldPassword,
            newPassword: newPassword,
          })
          .pipe(
            catchError((err) => {
              return this.appService.handle_error(err, 'CHANGEPASSWORD');
            })
          );
      })
    );
  }
}
