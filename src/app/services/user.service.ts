import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';

const baseUrl = environment.apiUrl+'/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) {

  }

  get(sort: string,order: SortDirection,page: number): Observable<any> {
    return this.http.get(`${baseUrl}`, {
      params: {
        sort : sort,
        order : order,
        page : (page+1).toString()
      }
    });
  }

  changePassword(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/changePassword`, data);
  }
}
