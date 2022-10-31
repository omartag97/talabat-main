import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const AUTH_API = 'http://127.0.0.1:8000/api/products';


@Injectable({
  providedIn: 'root'
})



export class ProductService {

  constructor(private http: HttpClient) {

  }

  getProduct(id:any): Observable<any> {
    return this.http.get(
      `${AUTH_API}/getProduct/${id}`
      );
  }

}
