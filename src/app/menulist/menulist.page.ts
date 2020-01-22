import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-menulist',
  templateUrl: './menulist.page.html',
  styleUrls: ['./menulist.page.scss'],
})
export class MenulistPage implements OnInit {
  id: any;
  orderData: any;
  menuData: any;
  orderDetail: any;
  menuId: any;
  constructor(private service: ServiceService,
    private storage: Storage,) { }

  ngOnInit() {
    this.getMenu();
  }

  getMenu(){
    this.service.getMenu().then(data =>{
      this.menuData = data;
    })
  }

}
