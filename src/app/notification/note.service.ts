import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ModesService } from '../auth/modes/modes.service';
import { catchError, exhaustMap, take, takeLast } from 'rxjs';
import { Mode } from '../auth/modes/mode.model';
import { ActionType, Note, qayedha_screeen } from './note.moduel';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  actionTypes: ActionType[] = [
    { id: 1, option: '_', text: 'رساله' },
    { id: 2, option: 'url', text: 'لينك' },
    { id: 3, option: 'screen', text: 'شاشة في قيدها' },
    { id: 4, option: 'Image', text: 'صورة , لينك' },
  ];

  qayedha_screens: qayedha_screeen[] = [
    { path: '/baloot-game', label: 'بالوت الحاسبة ' },
    { path: '/hand-game', label: 'هاند الحاسبة ' },
    { path: '/team-settings ', label: ' بينات اللاعبين والفرق ' },
    { path: '/edit-profile', label: 'تعديل الملف الشخصي' },
    { path: '/app-settings', label: 'اعدادات التطبيق' },
    { path: '/delete-user', label: 'مسح المستخدم' },
    { path: '/change-password', label: ' تغيير الباسورد ' },
    { path: '/about-us', label: 'عنا ' },
    { path: '/privacy-policy', label: 'السياسات ' },
    { path: '/', label: 'التبويتات' },
  ];


  constructor(
    private modeService: ModesService,
    private appService: AppService,
    private http: HttpClient
  ) {}
  note_all(note: Note) {
   
    return this.modeService.mode.pipe(
      take(1),
      exhaustMap((mode: Mode) => {
       if(!note.userid)
       {
         return this.http.post(`${mode.url}notifications/send-to-all-users`, {
           ...note,
         });
       }else{
        return this.http.post(`${mode.url}notifications/send-to-user`, {
          ...note,
        });
       }
      }),
      catchError((error) => {
        return this.appService.handle_error(error, 'NOTIFICATION_ALL');
      })
    );
  }



  upload_image(file: FormData) {
    return this.modeService.mode.pipe(
      take(1),
      exhaustMap((mode) => {
        const HttpUploadOptions = {
          headers: new HttpHeaders({ "Content-Type": "multipart/form-data"})
        }
        return this.http.post<{data:{url:string,path:string},message:string}>(
          `${mode.url}notifications/upload-notification-image`,file,HttpUploadOptions);
      })
    );
  }
}
