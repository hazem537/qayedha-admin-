import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMinValue]',
  standalone: true
})
export class MinValueDirective {

  constructor(private elment:ElementRef ) { }
  @HostListener('input')oninput(event:Event){
    const inputElment =this.elment.nativeElement as HTMLInputElement
    let inputValue  = +inputElment.value

    if(inputValue < 0 ){
      inputElment.value = "1"
    }else if(inputValue > 999 ){
      inputElment.value="999"
    }else if(inputValue = null){

    }
  }

}
