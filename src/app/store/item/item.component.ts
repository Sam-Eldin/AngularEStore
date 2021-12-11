import {Component, Input, OnInit} from '@angular/core';

export interface product {
 name: string,
 price: number,
 quantity: number,
 description: string
}


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() name: string;
  @Input() description: string;
  @Input() price: number;
  constructor() {
    this.name = '';
    this.description = '';
    this.price = 0;
  }

  ngOnInit(): void {
  }

}
