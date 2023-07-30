import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-filters.component.html',
  styleUrls: ['./card-filters.component.scss']
})
export class CardFiltersComponent {

  @Input() arrayFilters: string[] = [];

  @Output() newArray = new EventEmitter<string[]>;

  imgClose = 'assets/images/icon-remove.svg';

  removeItem(filter: string){
    let arrayFav: any = [];
    this.arrayFilters.forEach(e => {
      if(e !== filter){
        arrayFav.push(e)
      }
    })
    this.arrayFilters = arrayFav;
    this.newArray.emit(this.arrayFilters);
  }

  clearList(){
    this.arrayFilters = [];
    this.newArray.emit(this.arrayFilters);
  }
}