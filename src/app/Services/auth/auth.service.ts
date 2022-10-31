import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://127.0.0.1:8000/api/users';
const AUTH_API_DRIVER = 'http://127.0.0.1:8000/api/drivers';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })

};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      `${AUTH_API}/login`,
    {
      email,
      password
    },
      httpOptions
    );
  }

  register(name: string, email: string, password: string, confirm_password: string, formData: FormData ): Observable<any> {
    return this.http.post(
      `${AUTH_API}/register`,
    {
      name,
      email,
      password,
      confirm_password,
      image:formData
    },
      httpOptions
    );
  }

  registerDriver(email: string, name:string, mobile:number, password: string, confirm_password: string): Observable<any> {
    return this.http.post(
      `${AUTH_API_DRIVER}/registerDriver`,
    {
      email,
      name,
      mobile,
      password,
      confirm_password
    },
      httpOptions
    );
  }
}
