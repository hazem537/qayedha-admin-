import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, take, tap } from 'rxjs';
import { Mode } from './mode.model';

@Injectable({
  providedIn: 'root'
})
export class ModesService {

  constructor() { }
  
  modes: Mode[] = [
    {
      name: 'السيرفر التجريبي',
      url: 'https://sam-baloot-admin.online/dev/',
      icon: 'app_settings_alt',
    },
    {
      name: 'السيرفر النهائي ',
      url: 'https://sam-baloot-admin.online/qydha/',
      icon: 'app_shortcut',
    },
  ];

  mode = new BehaviorSubject<Mode>(this.modes[1]);
  setmode(mode) {
        localStorage.setItem('mode', JSON.stringify(mode));
  }
  auto_get_mode() {
    let mode = localStorage.getItem('mode');
    if (mode) {
      this.mode.next(JSON.parse(mode));
    }else{
      this.mode.next(this.modes[1]);

    }
  }
  clear_mode(){
    this.mode.next(this.modes[1])
    localStorage.removeItem("mode")
  }
}
