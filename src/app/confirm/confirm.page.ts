import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service/service.service'
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Order } from '../models/order/order';
import { OrderDetail } from '../models/orderDetail/orderDetail';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {
  id: any;
  orderData: any;
  orderId: any;
  menuId: any;
  menuName: any;
  quantity: any;
  unitPrice: any;
  detailData: Array<any>;
  newOrder: Order;
  newOrderDetail: OrderDetail;

  constructor(private service: ServiceService,
              private route: ActivatedRoute,
              public router: Router,
              private storage: Storage) {
    this.id = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit() {
    this.newOrder = new Order();
    this.newOrderDetail = new OrderDetail();
  }

  ionViewWillEnter(){
    this.detailData = new Array();
    this.getOrderDetail();
    this.getCurrentOrder(this.id);
  }

 //object json to array
  getOrderDetail(){
    for(let i =1; i < 37; i++){
      this.storage.get('Menu' + i).then((val) => {
        this.menuId = val;
      });
      this.storage.get('Name' + i).then((name) => {
        this.menuName = name;
      });
      this.storage.get('Price' + i).then((price) => {
        this.unitPrice = price;
      });
      this.storage.get('Qty' + i).then((qty) => {
         if(qty != null){
          this.detailData.push({'menuId': this.menuId, 'menuName':this.menuName, 'unitPrice':this.unitPrice, 'quantity':qty});
           }
        });
    }
  }
  
  clickOrderConfirm(){
      for(let item of this.detailData){  
        console.log(this.orderId);      
        this.newOrderDetail.orderId = this.orderId;
        this.newOrderDetail.menuId = item.menuId;
        this.newOrderDetail.quantity = item.quantity;
        this.service.createOrderDetail(this.newOrderDetail).subscribe(Response =>{
          console.log(this.newOrderDetail);
        });
      }
      this.storage.clear();
      this.router.navigate(['home']);
  }
  getCurrentOrder(id){
    this.service.getOrder().then(data =>{
      this.orderData = data;
      this.orderData = this.orderData.filter(t => t.tableId == id && t.orderStatus == null); // Get OrderID useing TableID
      this.orderId = this.orderData[0].orderId;
      console.log(this.orderId);
    });
  }

  // createOrder(){
  //   this.newOrder.orderDate = new Date();
  //   this.newOrder.tableId = this.id;
  //   this.service.createOrder(this.newOrder).subscribe(Response =>{
  //     console.log(this.newOrder);
  //     this.orderId = Response.orderId;
  //   });
  // }
}
