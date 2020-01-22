import { Component } from '@angular/core';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tableData: any;

  constructor(private service: ServiceService) {
  }

  ionViewWillEnter(){
    this.getTable();
  }

  getTable(){
    this.service.getTables().then(data => {
      this.tableData = data;
    });
  }
}
