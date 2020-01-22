import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {
  total: any;
  detailData: any;
  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.getPayments();
  }

  getPayments(){
    this.service.getPayment().then(data =>{
      this.detailData = data;
      var sum = 0;
      console.log(this.detailData);
      for(let payment of this.detailData){
        sum = sum + payment.amount;
      }
      this.total = Math.round(sum*100)/100;
        console.log(this.total);
    });
  }

}
