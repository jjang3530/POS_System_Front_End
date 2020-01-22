import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams} from '@ionic/angular';
import { ServiceService } from '../service/service.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menuId: any;
  menuData: any;
  menuName: any;
  quantity: any;
  unitPrice: any;

  constructor(private service: ServiceService,
    public navParams: NavParams, private storage: Storage,
    public popoverController: PopoverController) {
    this.menuId = this.navParams.get('menuId');
   }

   ngOnInit() {
    this.getMenu();
  }

  getMenu(){
    this.service.getMenu().then(data =>{
      this.menuData = data;
      this.menuData = this.menuData.filter(m => m.menuId == this.menuId);
      this.unitPrice = this.menuData[0].unitPrice;
      this.menuName = this.menuData[0].menuName;
    })
  }

  onChange(selectQuantity: any){
    console.log(selectQuantity);
    this.quantity = selectQuantity;
  }

  orderMenu(){
    if(this.quantity != null){
      this.storage.set('Menu' + this.menuId, this.menuId);
      this.storage.set('Name' + this.menuId, this.menuName);
      this.storage.set('Price' + this.menuId,  this.unitPrice);
      this.storage.set('Qty' + this.menuId,  this.quantity);
      this.popoverController.dismiss();  
    }
  }
}
