import { CurrencyPipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { TextfileService } from '../../services/textfile.service'
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  templateUrl: 'create-textfile.component.html'
})
export class CreateTextfileComponent implements AfterViewInit {


  _TEXTFILE_NOT_CREATED: number = 0;
  _TEXTFILE_ON_PROGRESS: number = 1;
  _TEXTFILE_FAILED: number = 2;
  _TEXTFILE_SUCCESS: number = 3;

  date: Date = new Date();
  disableDatepicker : boolean = true;
  data: any = "";
  autoDebetType : string = "normal";
  textfileCreateStatus: number = this._TEXTFILE_NOT_CREATED;

  btnSearchLoading: boolean = false;
  btnImportLoading: boolean = false;
  errors: any = {
    'date' : ''
  };

  constructor(
    public router : Router,
    private textfileService : TextfileService,
    private currencyPipe: CurrencyPipe
  ) {

  }

  autoDebetTypeChange($type) {
    if($type == "future") {
      this.disableDatepicker = false;
    } else {
      this.disableDatepicker = true;
    }
    this.autoDebetType = $type;
  }

  setData(data) {
    this.data = data;
    this.data.totalAmount = this.currencyPipe.transform(this.data.totalAmount, 'Rp. ');
  }

  importAutoDebet() {
    this.textfileCreateStatus = this._TEXTFILE_ON_PROGRESS;
    if(this.autoDebetType == "future") {
      this.textfileService.importAutoDebetFuture(this.date.toISOString().split('T')[0]).subscribe(
        res => {
          if(res.data.data) {
            this.textfileService.generateAutoDebetFuture(res.data.data).subscribe(
              res => {
                this.textfileCreateStatus = this._TEXTFILE_SUCCESS;
                this.downloadTextfile(res);
              },
              err => {
                this.errors = err.error.errors;
                this.textfileCreateStatus = this._TEXTFILE_FAILED
              }
            );
          } else {
            Swal.fire(
              `Import Failed!`,
              res.data.message,
              'error'
            );
          }
        },
        err => {
          this.errors = err.error.errors;
        }
      );
    } else if (this.autoDebetType == "normal") {
      this.textfileService.importAutoDebetNormal().subscribe(
        res => {
          if(res.data.data) {
            this.textfileService.generateAutoDebetNormal(res.data.data).subscribe(
              res => {
                this.textfileCreateStatus = this._TEXTFILE_SUCCESS;
                this.downloadTextfile(res);
              },
              err => {
                this.textfileCreateStatus = this._TEXTFILE_FAILED
              }
            );
          } else {
            Swal.fire(
              `Import Failed!`,
              res.data.message,
              'error'
            );
          }
        },
        err => {
          console.log(err);
        }
      );
    } else if(this.autoDebetType == "overdue") {
      this.textfileService.importAutoDebetKonsumenBermasalah().subscribe(
        res => {
          if(res.data.data) {
            this.textfileService.generateAutoDebetKonsumenBermasalah(res.data.data).subscribe(
              res => {
                this.textfileCreateStatus = this._TEXTFILE_SUCCESS;
                this.downloadTextfile(res);
              },
              err => {
                this.textfileCreateStatus = this._TEXTFILE_FAILED
              }
            );
          } else {
            Swal.fire(
              `Import Failed!`,
              res.data.message,
              'error'
            );
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  searchTextfile() {
    this.btnSearchLoading = true;
    if(this.autoDebetType == "future") {
      this.textfileService.getAutoDebetFuture(this.date.toISOString().split('T')[0]).subscribe(
        res => {
          this.btnSearchLoading = false;
          this.setData(res.data);
        },
        err => {
          this.btnSearchLoading = false;
          this.errors = err.error.errors;
        }
      );
    } else if (this.autoDebetType == "normal") {
      this.textfileService.getAutoDebetNormal().subscribe(
        res => {
          this.btnSearchLoading = false;
          this.setData(res.data);
        },
        err => {
          this.btnSearchLoading = false;
          console.log(err);
        }
      );
    } else if(this.autoDebetType == "overdue") {
      this.textfileService.getAutoDebetKonsumenBermasalah().subscribe(
        res => {
          this.btnSearchLoading = false;
          this.setData(res.data);
        },
        err => {
          this.btnSearchLoading = false;
          console.log(err);
        }
      );
    }
  }

  downloadTextfile(res) {
    this.textfileService.downloadTextfile(res.data).subscribe(
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
