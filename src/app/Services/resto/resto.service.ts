import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://127.0.0.1:8000/api/restaurants';
const AUTH_API2 = 'http://127.0.0.1:8000/api/restaurants/getRestaurant';
const AUTH_API3 = 'http://127.0.0.1:8000/api/products/getProducts';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class RestoService {
  constructor(private http: HttpClient) {}

  saveResto(name: string, email: string, address: string, formData: FormData): Observable<any> {
    return this.http.post(
      `${AUTH_API}/saveResto`,
    {
      name,
      email,
      address,
      logo:formData
    },
      httpOptions
    );
  }

  getAll(): Observable<any> {
    return this.http.get(
      `${AUTH_API}/getAllRestaurants`
      );
  }

  getRest(id:any): Observable<any> {
    return this.http.get(
      `${AUTH_API}/restInfo/${id}`
      );
  }

  getMenu(id:any): Observable<any> {
    return this.http.get(
      `${AUTH_API3}/${id}`
      );
  }

    updateResto(name: string, email: string, address: string, formData: FormData): Observable<any> {
    return this.http.patch(
      `${AUTH_API}/updateResto`,
    {
      name,
      email,
      logo:formData
    },
      httpOptions
    );
  }


}
