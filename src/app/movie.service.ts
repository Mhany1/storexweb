import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Imovie } from './movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  baseApiUrl = ""

  constructor(private http: HttpClient) { }

  url: string = 'https://test-api.storexweb.com/api/movies'
  url1: string = 'https://test-api.storexweb.com/api/category'
  KEY: any = localStorage.getItem('token')

  getData(): Observable<any> {
    return this.http.get<any>(this.url, { headers: { "authorization": `Bearer ${this.KEY}` } })
  }

  getDataCategory(): Observable<any> {
    return this.http.get<any>(this.url1, { headers: { "authorization": `Bearer ${this.KEY}` } })
  }

  postData(data: any): Observable<any> {
    return this.http.post(`${this.url}`, data, { headers: { "authorization": `Bearer ${this.KEY}` } })
  }

  updateData(data: any, id: any): Observable<any> {
    return this.http.post(`${this.url}/${id}`, data, { headers: { "authorization": `Bearer ${this.KEY}` } })
  }

  deleteData(id: any): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { headers: { "authorization": `Bearer ${this.KEY}` } })
  }
}
