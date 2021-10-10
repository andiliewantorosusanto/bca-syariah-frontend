import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { User } from '../../models/user.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { UserService } from '../../services/user.service';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  templateUrl: 'users.component.html'
})
export class UsersComponent implements AfterViewInit {
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

  constructor(
    private userService : UserService
  ) {

  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.userService!.get(
                this.alternateColumns[this.sort.active], this.sort.direction, this.paginator.pageIndex
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
