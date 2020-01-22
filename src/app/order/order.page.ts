import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { PopoverController, Events } from '@ionic/angular';
import { MenuComponent} from '../menu/menu.component';
import { ResetpopoverComponent} from '../resetpopover/resetpopover.component'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  id: any;
  orderData: any;
  menuData: any;
  orderDetail: any;
  menuId: any;

  constructor(private service: ServiceService,
              private storage: Storage,
              public popoverController: PopoverController,
              private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit() {
    this.getMenu();
  }


  getMenu(){
    this.service.getMenu().then(data =>{
      this.menuData = data;
    })
  }

  async openPopover(id){
    const popover = await this.popoverController.create({
      component: MenuComponent,
      componentProps:{
        menuId: id
      },
      cssClass: 'popoverCss',
      translucent: true,
      animated: true,
      backdropDismiss: true
    });
    return await popover.present();
  }

  async openPopoverClear(){
    const popover = await this.popoverController.create({
      component: ResetpopoverComponent,
      cssClass: 'popoverCss',
      translucent: false,
      animated: true,
      backdropDismiss: true
    });
    return await popover.present();
  }

  backClear(){
    this.storage.clear();
  }
}
