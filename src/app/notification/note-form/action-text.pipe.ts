import { Pipe, PipeTransform } from '@angular/core';
import { NoteService } from '../note.service';
import { ActionType } from '../note.moduel';

@Pipe({
  name: 'actionText',
  standalone: true
})
export class ActionTextPipe implements PipeTransform {
  action_types: ActionType[];


  constructor(private noteService:NoteService){
this.action_types = this.noteService.actionTypes
}
  transform(value: number, ...args: unknown[]): string {
    if( value == null ){
      return null 
    }
    let selected_action_type = this.action_types.find((x) => x.id == value);
    return selected_action_type.text;
  }

}
