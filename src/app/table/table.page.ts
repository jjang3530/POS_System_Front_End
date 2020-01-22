import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { Order } from '../models/order/order';
import { Table } from '../models/table/table';


@Component({
  selector: 'app-table',
  templateUrl: './table.page.html',
  styleUrls: ['./table.page.scss'],
})
export class TablePage implements OnInit {
  id: any;
  orderData: any;
  detailData: any;
  menuData: any;
  currentOrder: any;
  orderId: any;
  newOrder: Order;
  updateTableData: Table;
  tableData: any;
  tableNumber: any;

  isenabled: boolean = false;

  constructor(private service: ServiceService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('tableId');
    this.newOrder = new Order();
    this.updateTableData = new Table();
   }

  ngOnInit() {
    console.log(this.id);
  }

  ionViewWillEnter(){
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
        this.orderId = this.orderData[0].orderId;
      if(this.orderData[0].orderId){ 
        this.service.getOrderDetail().then(data =>{
          this.detailData = data;
          this.detailData = this.detailData.filter(d => d.orderId == this.orderData[0].orderId); // Get OrderDetailID useing orderID
          if(this.detailData.length  > 0){
            if(!this.detailData[0].OrderDetailID){
              this.isenabled=true;
            }
          }
      });
    }
    });
  }

  createOrder(){
    if(this.orderId == undefined){
    this.newOrder.orderDate = new Date();
    this.newOrder.tableId = this.id;
    this.service.createOrder(this.newOrder).subscribe(Response =>{
      console.log("Order Created!!!");
      console.log(this.newOrder);
      this.orderId = Response.orderId;
      this.updateTable();
     });
    }else{
      console.log("Order Already Exist!!!");
    }
  }

  updateTable(){
    console.log(this.id);
    console.log(this.tableNumber);
    this.updateTableData.tableId = this.id;
    this.updateTableData.tableNumber = this.tableNumber;
    this.updateTableData.active = "Y";
    this.service.updateTable(this.id, this.updateTableData).subscribe(Response => {
      console.log(this.updateTableData);
    });
  }
}
