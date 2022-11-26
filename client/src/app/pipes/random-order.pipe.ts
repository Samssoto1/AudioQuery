import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'randomOrder'
})
export class RandomOrderPipe implements PipeTransform {

  transform(list: Array<any>){
    if(list == undefined){
      return;
    }
    console.log(list);
    let answers = list['answers']
    const newList = [...answers];
    newList.sort(() => Math.random() - 0.5);
    console.log(newList);
    return newList;
  }
}
