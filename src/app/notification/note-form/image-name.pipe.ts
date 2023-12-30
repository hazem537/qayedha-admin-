import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageName',
  standalone: true
})
export class ImageNamePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]):string {
    return value.replace(/^.*[\\/]/, '')
  }

}
