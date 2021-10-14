import { CurrencyPipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { TextfileService } from '../../services/textfile.service'
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: 'upload-textfile.component.html'
})
export class UploadTextfileComponent implements AfterViewInit {
  data: any[] = [];
  textValue: string = "";
  dateValue: string = "";
  searchBy: string = "";
  sortBy: string = "";

  constructor(
    public router : Router,
    private textfileService : TextfileService,
    private currencyPipe: CurrencyPipe
  ) {

  }

  browse() {
    let searchValue = (this.searchBy == "update_at") ? this.dateValue : this.textValue;

    this.textfileService.browseUpload(this.searchBy,searchValue,this.sortBy).subscribe(
      res => {

      }, err => {

      }
    );
  }

  ngAfterViewInit() {

  }
}
