import { AfterViewInit, Component,  ViewChild } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import Swal from "sweetalert2";
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../../services/group.service';
import { Group } from '../../models/group.model';
import { MatSelectionList } from '@angular/material/list';
import { forkJoin } from 'rxjs';

@Component({
  templateUrl: 'users-edit.component.html'
})
export class UsersEditComponent implements AfterViewInit {
  user: User = new User();
  groups: Group[] = [];
  selectedGroups: string[] = [];
  errors: any = {
    'username' : '',
    'nama' : ''
  };

  @ViewChild(MatSelectionList) sGroups : MatSelectionList;

  constructor(
    private userService : UserService,
    public router : Router,
    private groupService : GroupService,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngAfterViewInit() {
    let groupRequest = this.groupService.get();
    let userRequest = this.userService.getById(this.activatedRoute.snapshot.params.id);
    let groupUserRequest = this.userService.getGroups(this.activatedRoute.snapshot.params.id);

    forkJoin(
      [groupRequest, userRequest, groupUserRequest]
    ).subscribe(data => {
      this.groups = data[0].data.groups;
      this.user = data[1].data;

      data[2].data.forEach(group => {
        this.selectedGroups.push(group.id);
      });
    });
  }

  updateUser() {
    this.userService.update(this.user).subscribe(
      res => {
        let nama = res.data.nama;
        this.userService.updateGroups(res.data.id,this.selectedGroups).subscribe(
          res => {
            Swal.fire(
              `Action Success!`,
              `User ${nama} has been updated.`,
              'success'
            )
            this.router.navigate(['/user']);
          },
          err => {
            this.errors = err.error.errors;
          }
        )
      },
      err => {
        this.errors = err.error.errors;
      }
    )
  }
}
