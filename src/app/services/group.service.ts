import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { Group } from '../models/group.model';

const baseUrl = environment.apiUrl+'/group';

@Injectable({
  providedIn: 'root'
})

export class GroupService {
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

  create(group : Group): Observable<any> {
    return this.http.post(`${baseUrl}`,group);
  }

  update(group: Group): Observable<any> {
    return this.http.post(`${baseUrl}/${group.id}`,group);
  }

  toggleStatus(id: string): Observable<any> {
    return this.http.post(`${baseUrl}/${id}/status`, {});
  }
}
