import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModesService } from '../auth/modes/modes.service';
import { influncer_form } from './infu-code-form/influncerCode.modle';
import { catchError, exhaustMap, take, takeLast } from 'rxjs';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root',
})
export class InfluncerService {
  constructor(
    private http: HttpClient,
    private appservice: AppService,
    private modeService: ModesService
  ) {}

  create_influncer_code(code: influncer_form) {
    return this.modeService.mode.pipe(
      take(1),
      exhaustMap((mode) => {
        
        return this.http.post<{data:any,message:string}>(`${mode.url}influencer-codes`, code );
      }),
      catchError((error) => {
        return this.appservice.handle_error(error, 'INFLUNCERCODE');
      })
    );
  }
}
