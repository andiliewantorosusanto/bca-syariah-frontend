import { CurrencyPipe } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TextfileService } from '../../services/textfile.service'
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: 'upload-textfile-view.component.html'
})
export class UploadTextfileViewComponent implements AfterViewInit {

  transactionList: any[] = [];
  batchNo : string = this.activatedRoute.snapshot.params.batchNo;
  totalData : string = ""

  constructor(
    public router : Router,
    private textfileService : TextfileService,
    private activatedRoute : ActivatedRoute
  ) {

  }

  ngAfterViewInit() {
    this.batchNo = this.activatedRoute.snapshot.params.batchNo;
    this.textfileService.getTextfileResultByBatchNo(this.batchNo).subscribe(
      res => {
        this.transactionList = res.data.data;
        this.totalData = res.data.data.length;
      },
      err => {

      }
    );
  }
}
