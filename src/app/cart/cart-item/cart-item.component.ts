import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {cartItem, FirebaseHelper} from "../../Utilites/firebase-helper.service";
import {ToasterHelper, toasterTypes} from "../../Utilites/toaster-helper.service";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input() data: cartItem;
  @Output() removeItemEvent = new EventEmitter<string>();
  constructor(private toaster: ToasterHelper, private firebase: FirebaseHelper) {
    this.data = {
      name: '',
      quantity: 0,
      description: '',
      price: 0,
      image_name: ''
    }
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  async changeQuantity(number: number) {
    if(this.data.quantity > 9 && number > 0)
    {
      this.toaster.createToaster(toasterTypes.warning, 'Maximum 10 bottles per user');
      return;
    }
    if(this.data.quantity < 2 && number < 0) {
      this.toaster.createToaster(toasterTypes.warning, 'If you wish to remove the item, use the remove button');
      return;
    }
    this.data.quantity += number;
    await this.firebase.updateItem(this.data.name, this.data.quantity);
    this.removeItemEvent.emit('just update');
  }

  removeItem() {
    console.log(this.data.name);
    this.removeItemEvent.emit(this.data.name);
  }
}
