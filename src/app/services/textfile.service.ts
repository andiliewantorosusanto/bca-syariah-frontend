import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';

const baseUrl = environment.apiUrl+'/textfile';

@Injectable({
  providedIn: 'root'
})

export class TextfileService {
  constructor(private http: HttpClient) {

  }

  getAutoDebetNormal(): Observable<any> {
    return this.http.get(`${baseUrl}/create/autodebetnormal`);
  }

  getAutoDebetKonsumenBermasalah(): Observable<any> {
    return this.http.get(`${baseUrl}/create/autodebetkonsumenbermasalah`);
  }

  getAutoDebetFuture(date: string): Observable<any> {
    return this.http.get(`${baseUrl}/create/autodebetfuture`, {
      params: {
        date : date,
      }
    });
  }

  generateAutoDebetNormal(token: string): Observable<any> {
    return this.http.post(`${baseUrl}/create/autodebetnormal/generate`,{
      token : token
    });
  }

  generateAutoDebetKonsumenBermasalah(token: string): Observable<any> {
    return this.http.post(`${baseUrl}/create/autodebetkonsumenbermasalah/generate`,{
      token : token
    });
  }

  generateAutoDebetFuture(token: string): Observable<any> {
    return this.http.post(`${baseUrl}/create/autodebetfuture/generate`, {
      token : token
    });
  }

  downloadTextfile(batchNo: string): Observable<any> {
    return this.http.get(`${baseUrl}/create/downloadTextfile`,{
      params: {
        batch_no : batchNo
      },
      responseType: 'blob' as 'json',
      observe: 'response'
    })
  }

  browseUpload(searchColumn: string,searchValue:string,sort): Observable<any> {
    return this.http.get(`${baseUrl}/upload/browse`,{
      params: {
        search_column : searchColumn,
        search_value : searchValue,
        sort : sort
      }
    })
  }

  upload(file: File) : Observable<any> {
    let formData = new FormData();
    formData.append('file', file);

    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    const req = new HttpRequest('POST', `${baseUrl}/upload/import`, formData, options);
    return this.http.request(req);
  }

  getTextfileResultByBatchNo(batchNo: string): Observable<any> {
    return this.http.get(`${baseUrl}/upload/`,{
      params: {
        batch_no : batchNo
      }
    })
  }

  downloadUploadTextfile(batchNo: string): Observable<any> {
    return this.http.get(`${baseUrl}/upload/downloadTextfile`,{
      params: {
        batch_no : batchNo
      },
      responseType: 'blob' as 'json',
      observe: 'response'
    })
  }

  downloadUploadExcel(batchNo: string): Observable<any> {
    return this.http.get(`${baseUrl}/upload/downloadExcel`,{
      params: {
        batch_no : batchNo
      },
      responseType: 'blob' as 'json',
      observe: 'response'
    })
  }

  importAutoDebetNormal(): Observable<any> {
    return this.http.get(`${baseUrl}/create/autodebetnormal/import`);
  }

  importAutoDebetKonsumenBermasalah(): Observable<any> {
    return this.http.get(`${baseUrl}/create/autodebetkonsumenbermasalah/import`);
  }

  importAutoDebetFuture(date: string): Observable<any> {
    return this.http.get(`${baseUrl}/create/autodebetfuture/import`, {
      params: {
        date : date,
      }
    });
  }

}
