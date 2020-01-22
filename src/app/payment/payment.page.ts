import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { Payment } from '../models/payment/payment';
import { Router } from '@angular/router';
import { Order } from '../models/order/order';
import { Table } from '../models/table/table';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  id: any;
  orderData: any;
  detailData: any;
  total: number;
  paymentData: Payment;
  updateOrderData: Order;
  orderId: number;
  tableId: number;
  orderDate: any;
  updateTableData: Table;
  tableData: any;
  tableNumber: any;

  constructor(private service: ServiceService, private route: ActivatedRoute, public router: Router) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.paymentData = new Payment();
    this.updateOrderData = new Order();
    this.updateTableData = new Table();
   }

  ngOnInit() {
    console.log(this.id);
    this.getCurrentOrder(this.id);
    this.getTable();
  }

  getTable(){
    this.service.getTables().then(data => {
      this.tableData = data;
      this.tableData = this.tableData.filter(t => t.tableId == this.id);
      this.tableNumber = this.tableData[0].tableNumber;
    });
  }

  getCurrentOrder(id){
    this.service.getOrder().then(data =>{
      this.orderData = data;
      this.orderData = this.orderData.filter(t => t.tableId == id && t.orderStatus == null); // Get OrderID useing TableID
      if(this.orderData[0].orderId){
        this.orderId = this.orderData[0].orderId;
        this.orderDate = this.orderData[0].orderDate;
        this.tableId = this.orderData[0].tableId;
      this.service.getOrderDetail().then(data =>{
        this.detailData = data;
        this.detailData = this.detailData.filter(d => d.orderId == this.orderData[0].orderId); // Get OrderDetailID useing orderID
        var sum = 0;
        console.log(this.detailData);
        for(let order of this.detailData){
          sum = sum + order.quantity * order.menus.unitPrice;
        }
        this.total = Math.round(sum*100)/100;
          console.log(this.total);
      });
    }
    });
  }

  Payment(){
    this.paymentData.orderId = this.orderId;
    this.paymentData.paymentDate = new Date();
    this.paymentData.amount = this.total;
    this.updateOrderData.orderId = this.orderId;
    this.updateOrderData.orderDate = this.orderDate;
    this.updateOrderData.tableId = this.tableId;
    this.updateOrderData.orderStatus = "Completed";
    this.service.createPayment(this.paymentData).subscribe(Response =>{
      console.log(this.paymentData);
    });
    this.service.updateOrder(this.orderId, this.updateOrderData).subscribe(Response => {
      console.log(this.updateOrderData);
      this.router.navigate(['home']);
    });
    this.updateTable();    
  }

  updateTable(){
    console.log(this.id);
    console.log(this.tableNumber);
    this.updateTableData.tableId = this.id;
    this.updateTableData.tableNumber = this.tableNumber;
    this.updateTableData.active = "N";
    this.service.updateTable(this.id, this.updateTableData).subscribe(Response => {
      console.log(this.updateTableData);
    });
  }


}
