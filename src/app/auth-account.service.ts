import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthAccountService {

  constructor(private http: HttpClient) { }
  loginUrl: string = 'https://test-api.storexweb.com/api/login'
  registerUrl: string = 'https://test-api.storexweb.com/api/register'

  login(data: any): Observable<any> {
    return this.http.post(this.loginUrl, data)
  }

  register(data: any): Observable<any> {
    return this.http.post(this.registerUrl, data)
  }
}
