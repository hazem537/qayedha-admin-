import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './user.model';
@Injectable({
  providedIn: 'root',
})
export class authIntreceprtorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user: User) => {
      if(!!user){
        const modifiedReq = req.clone({
          headers: new HttpHeaders().set('Authorization',`Bearer ${user.token}`),
        });
      
        return next.handle(modifiedReq);
      }else{
        return next.handle(req)
      }
      })
    );
  }
}