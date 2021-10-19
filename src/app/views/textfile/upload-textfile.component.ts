import { CurrencyPipe } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TextfileService } from '../../services/textfile.service'
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  templateUrl: 'upload-textfile.component.html'
})
export class UploadTextfileComponent implements AfterViewInit {

  _FILE_UPLOAD_IDLE: number = 0;
  _FILE_UPLOAD_ON_PROGRESS: number = 1;
  _FILE_UPLOAD_FAILED: number = 2;
  _FILE_UPLOAD_SUCCESS: number = 3;

  data: any[] = [];
  textValue: string = "";
  dateValue: Date = new Date();
  searchBy: string = "batch_no";
  sortBy: string = "batch_no";
  statusFileUpload : number = 0;
  btnSearchLoading: boolean = false;
  @ViewChild('file') file:ElementRef;

  constructor(
    public router : Router,
    private textfileService : TextfileService,
    private currencyPipe: CurrencyPipe
  ) {

  }

  browse() {
    let searchValue = (this.searchBy == "update_at") ? this.dateValue.toISOString().split('T')[0] : this.textValue;
    this.btnSearchLoading = true;
    this.textfileService.browseUpload(this.searchBy,searchValue,this.sortBy).subscribe(
      res => {
        this.data = res.data;
        this.btnSearchLoading = false;
      }, err => {
        this.btnSearchLoading = false;
      }
    );
  }

  upload(files: FileList) {
    if (files.length == 0) {
      console.log("No file selected!");
      return
    }

    let file: File = files[0];
    this.file.nativeElement.value = '';
    this.statusFileUpload = this._FILE_UPLOAD_ON_PROGRESS;
    this.textfileService.upload(file)
      .subscribe(
        event => {
          if (event.type == HttpEventType.UploadProgress) {
            const percentDone = Math.round(100 * event.loaded / event.total);
            console.log(`File is ${percentDone}% loaded.`);
          } else if (event instanceof HttpResponse) {
            console.log('File is completely loaded!');
          }
        },
        (err) => {
          this.statusFileUpload = this._FILE_UPLOAD_FAILED;
          console.log("Upload Error:", err);
        }, () => {
          this.statusFileUpload = this._FILE_UPLOAD_SUCCESS;
          console.log("Upload done");
        }
      )
  }

  downloadTextfile(batchNo) {
    this.textfileService.downloadUploadTextfile(batchNo).subscribe(
      (response: any) =>{
          let fileName = response.headers.get('Content-Disposition').split('; filename=')[1];
          let body = response.body;
          let dataType = body.type;
          let binaryData = [];
          binaryData.push(body);
          let downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          downloadLink.setAttribute('download', fileName);
          document.body.appendChild(downloadLink);
          downloadLink.click();
      },
      err => {
        Swal.fire(
          `Export Failed!`,
          `Textfile already export`,
          'error'
        )
      }
    )
  }

  downloadExcel(batchNo) {
    this.textfileService.downloadUploadExcel(batchNo).subscribe(
      (response: any) =>{
          let fileName = response.headers.get('Content-Disposition').split('; filename=')[1];
          let body = response.body;
          let dataType = body.type;
          let binaryData = [];
          binaryData.push(body);
          let downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          downloadLink.setAttribute('download', fileName);
          document.body.appendChild(downloadLink);
          downloadLink.click();
      }
    )
  }

  ngAfterViewInit() {

  }
}
