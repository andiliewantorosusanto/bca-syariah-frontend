import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { Menu } from '../models/menu.model';

const baseUrl = environment.apiUrl+'/menu';

@Injectable({
  providedIn: 'root'
})

export class MenuService {
  constructor(private http: HttpClient) {

  }

  get(sort: string = "",order: SortDirection = "",page: string = "1", limit: string = "1000",search: string = ""): Observable<any> {
    return this.http.get(`${baseUrl}`, {
      params: {
        sort : sort,
        order : order,
        page : page,
        limit : limit,
        search : search
      }
    });
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(menu : Menu): Observable<any> {
    return this.http.post(`${baseUrl}`,menu);
  }

  update(menu: Menu): Observable<any> {
    return this.http.post(`${baseUrl}/${menu.id}`,menu);
  }

  toggleStatus(id: string): Observable<any> {
    return this.http.post(`${baseUrl}/${id}/status`, {});
  }
}
