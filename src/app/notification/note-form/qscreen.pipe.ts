import { Pipe, PipeTransform } from '@angular/core';
import { NoteService } from '../note.service';
import { qayedha_screeen } from '../note.moduel';

@Pipe({
  name: 'qscreen',
  standalone: true
})
export class QscreenPipe implements PipeTransform {
  qyaedha_screens: qayedha_screeen[];
  constructor(private noteSevice:NoteService){
    this.qyaedha_screens=this.noteSevice.qayedha_screens
  }

  transform(value:string, ...args: unknown[]): string {
    let selected_qayedha_screen = this.qyaedha_screens.find(
      (x) => x.path === value
    );
    return selected_qayedha_screen?.label;
  }

}
