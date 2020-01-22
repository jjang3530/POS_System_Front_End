import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit {
  total: any;
  detailData: any;
  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.getCurrentOrder();
  }

  getCurrentOrder(){
      this.service.getOrderDetail().then(data =>{
        this.detailData = data;
        var sum = 0;
        console.log(this.detailData);
        for(let order of this.detailData){
          sum = sum + order.quantity * order.menus.unitPrice;
        }
        this.total = Math.round(sum*100)/100;
          console.log(this.total);
      });
    }
}
