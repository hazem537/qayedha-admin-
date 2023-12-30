import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModesService } from '../auth/modes/modes.service';
import { code } from './code.model';
import { catchError, exhaustMap, take, takeLast } from 'rxjs';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root',
})
export class CodesService {
  constructor(private http: HttpClient, private modeService: ModesService,private appService:AppService) {}

  add_code(code: code) {
    return this.modeService.mode.pipe(
      take(1),
      exhaustMap((mode) => {
        return this.http.post<{data:string,message:string}>(`${mode.url}promo-codes/`, { ...code });
      }),catchError(err=>{
        return this.appService.handle_error(err,"PROMOCODES")
      })
    );
  }
}
