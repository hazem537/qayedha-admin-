import { Pipe, PipeTransform } from '@angular/core';
import { BaseUser as User } from '../user.model';

@Pipe({
  name: 'userFilter',
  standalone: true
})
export class UserFilterPipe implements PipeTransform {

  transform(value: User[], filter_string:string,...args: unknown[]): User[] {
 if (value.length==0  ){
  return value
 }
 const resultArray =[]
 for(let item of value){
  if(item.username.includes(filter_string) || item.phone.includes(filter_string) )
  resultArray.push(item)
}
return resultArray
  }

}
