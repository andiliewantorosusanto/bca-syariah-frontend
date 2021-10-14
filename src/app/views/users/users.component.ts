import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { User } from '../../models/user.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { UserService } from '../../services/user.service';
import {fromEvent, merge, Observable, of as observableOf} from 'rxjs';
import {catchError, debounceTime, map, startWith, switchMap, throttleTime} from 'rxjs/operators';
import Swal from "sweetalert2";
import { Router } from '@angular/router';

@Component({
  templateUrl: 'users.component.html'
})
export class UsersComponent implements AfterViewInit {
  keyword: string = "";

  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['id','username','nama','status','action'];
  alternateColumns: any = {
    'id' : 'id',
    'username' : 'username',
    'nama' : 'nama',
    'status' : 'sts',
    'action' : 'action'
  };

  users : User[] = [];

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter : ElementRef;

  constructor(
    private userService : UserService,
    public router : Router
  ) {

  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page, fromEvent(this.filter.nativeElement, 'keyup'))
      .pipe(
        debounceTime(100),
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.userService!.get(
                this.alternateColumns[this.sort.active], this.sort.direction, (this.paginator.pageIndex+1).toString(), this.paginator.pageSize.toString(), this.keyword
                )
            .pipe(catchError(() => observableOf(null)));
        }),
        map(res => {
          this.isLoadingResults = false;

          if (res === null) {
            return [];
          }

          this.resultsLength = res.data.meta.total;
          return res.data.users;
        })
      ).subscribe(data => {
        this.users = data;
        this.dataSource = new MatTableDataSource(this.users);
      });
  }

  toggleActive(event,row) {
    let toggleMessage = (row.sts) ? 'deactivate' : 'activate';
    event.preventDefault();

    Swal.fire({
      title: 'Are You Sure?',
      text: `This action will ${toggleMessage} ${row.nama}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.toggleStatus(row.id).subscribe(
          res => {
            row.sts = res.data.sts;

            Swal.fire(
              `Action Success!`,
              `User ${row.nama} has been ${toggleMessage}d.`,
              'success'
            )
          },
          err => {
            Swal.fire(
              `Something went wrong`,
              `${err.error.message}`,
              'error'
            )
          }
        )
      }
    })

    // Swal.fire("Sukses","Status telah terupdate","success")
    // .then((result) => {
    //   if (result.isConfirmed) {
    //     // this.router.navigate([`/upgrade/list-order-maskapai`]);
    //   }
    // });
  }
}
