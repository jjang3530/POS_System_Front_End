import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Payment } from '../models/payment/payment';
import { Order } from '../models/order/order';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { OrderDetail } from '../models/orderDetail/orderDetail';
import { Table } from '../models/table/table';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  apiStaffUrl = 'https://localhost:5001/api/staffs';
  apiTableUrl = 'https://localhost:5001/api/tables';
  apiMenuUrl = 'https://localhost:5001/api/menus';
  apiOrderUrl = 'https://localhost:5001/api/orders';
  apiOrderDetailUrl = 'https://localhost:5001/api/orderdetails';
  apiPaymentUrl = 'https://localhost:5001/api/payments';

    // Http Options
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

      // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  constructor(public http: HttpClient) { }

  getTables(){
    return new Promise(resolve =>{
      this.http.get(this.apiTableUrl).subscribe(data =>{
        resolve(data);
        console.log(data);
      },
        err => {
          console.log(err);
      });
    });
  }

  getOrder(){
    return new Promise(resolve =>{
      this.http.get(this.apiOrderUrl).subscribe(data =>{
        resolve(data);
      },
        err => {
          console.log(err);
      });
    });
  }

  getOrderDetail(){
    return new Promise(resolve => {
      this.http.get(this.apiOrderDetailUrl).subscribe(data =>{
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }

  getMenu(){
    return new Promise(resolve =>{
      this.http.get(this.apiMenuUrl).subscribe(data =>{
        resolve(data);
      },
        err => {
          console.log(err);
      });
    });
  }

  getPayment(){
    return new Promise(resolve =>{
      this.http.get(this.apiPaymentUrl).subscribe(data =>{
        resolve(data);},
        err => {
          console.log(err);
      });
    });
  }

  // Create a new item on Payment table
  createPayment(item): Observable<Payment> {
    return this.http
      .post<Payment>(this.apiPaymentUrl, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Update Table Occupied or empty
  updateTable(id, item): Observable<Table> {
    return this.http
      .put<Table>(this.apiTableUrl + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Update Order to Complited
  updateOrder(id, item): Observable<Order> {
    return this.http
      .put<Order>(this.apiOrderUrl + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Create a new item on order table
  createOrder(item): Observable<Order> {
    return this.http
      .post<Order>(this.apiOrderUrl, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

    // Create a new item on orderDetail table
    createOrderDetail(item): Observable<OrderDetail> {
      return this.http
        .post<OrderDetail>(this.apiOrderDetailUrl, JSON.stringify(item), this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }

}
