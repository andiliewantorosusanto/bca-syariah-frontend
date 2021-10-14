import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { Group } from '../models/group.model';

const baseUrl = environment.apiUrl+'/textfile';

@Injectable({
  providedIn: 'root'
})

export class TextfileService {
  constructor(private http: HttpClient) {

  }

  getAutoDebetNormal(): Observable<any> {
    return this.http.get(`${baseUrl}/autodebetnormal`);
  }

  getAutoDebetKonsumenBermasalah(): Observable<any> {
    return this.http.get(`${baseUrl}/autodebetkonsumenbermasalah`);
  }

  getAutoDebetFuture(date: string): Observable<any> {
    return this.http.get(`${baseUrl}/autodebetfuture`, {
      params: {
        date : date,
      }
    });
  }

  generateAutoDebetNormal(): Observable<any> {
    return this.http.post(`${baseUrl}/autodebetnormal/generate`,{});
  }

  generateAutoDebetKonsumenBermasalah(): Observable<any> {
    return this.http.post(`${baseUrl}/autodebetkonsumenbermasalah/generate`,{});
  }

  generateAutoDebetFuture(date: string): Observable<any> {
    return this.http.post(`${baseUrl}/autodebetfuture/generate`, {
      date : date
    });
  }

  downloadTextfile(batchNo: string): Observable<any> {
    return this.http.get(`${baseUrl}/downloadTextfile`,{
      params: {
        batch_no : batchNo
      },
      responseType: 'blob' as 'json',
      observe: 'response'
    })
  }

  browseUpload(searchBy: string,searchValue:string,sort): Observable<any> {
    return this.http.get(`${baseUrl}/upload/browse`,{
      params: {
        search_by : searchBy,
        search_value : searchValue,
        sort : sort
      }
    })
  }
}
