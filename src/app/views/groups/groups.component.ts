import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { User } from '../../models/user.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {fromEvent, merge, Observable, of as observableOf} from 'rxjs';
import {catchError, debounceTime, map, startWith, switchMap, throttleTime} from 'rxjs/operators';
import Swal from "sweetalert2";
import { Router } from '@angular/router';
import { GroupService } from '../../services/group.service';

@Component({
  templateUrl: 'groups.component.html'
})
export class GroupsComponent implements AfterViewInit {
  keyword: string = "";

  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['id','group','status','action'];
  alternateColumns: any = {
    'id' : 'id',
    'group' : 'group_name',
    'status' : 'sts',
    'action' : 'action'
  };

  groups : any[] = [];

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter : ElementRef;

  constructor(
    private groupService : GroupService,
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
          return this.groupService!.get(
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
          return res.data.groups;
        })
      ).subscribe(data => {
        this.groups = data;
        this.dataSource = new MatTableDataSource(this.groups);
      });
  }

  toggleActive(event,row) {
    let toggleMessage = (row.sts) ? 'deactivate' : 'activate';
    event.preventDefault();

    Swal.fire({
      title: 'Are You Sure?',
      text: `This action will ${toggleMessage} ${row.group_name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.groupService.toggleStatus(row.id).subscribe(
          res => {
            row.sts = res.data.sts;

            Swal.fire(
              `Action Success!`,
              `Group ${row.group_name} has been ${toggleMessage}d.`,
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
  }
}
