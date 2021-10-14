import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { User } from '../models/user.model';

const baseUrl = environment.apiUrl+'/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) {

  }

  get(sort: string,order: SortDirection,page: string, limit: string,search: string): Observable<any> {
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

  create(user : User): Observable<any> {
    return this.http.post(`${baseUrl}`,user);
  }

  update(user: User): Observable<any> {
    return this.http.post(`${baseUrl}/${user.id}`,user);
  }

  changePassword(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/changePassword`, data);
  }

  toggleStatus(id: string): Observable<any> {
    return this.http.post(`${baseUrl}/${id}/status`, {});
  }

  updateGroups(id: String,group_ids: string[]) : Observable<any> {
    return this.http.post(`${baseUrl}/${id}/updateGroups`,{
      group_ids : group_ids
    });
  }

  getGroups(id: String): Observable<any> {
    return this.http.get(`${baseUrl}/${id}/group`);
  }
}
