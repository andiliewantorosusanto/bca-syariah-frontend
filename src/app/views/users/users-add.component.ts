import { AfterViewInit, Component } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import Swal from "sweetalert2";
import { Router } from '@angular/router';
import { GroupService } from '../../services/group.service';
import { Group } from '../../models/group.model';

@Component({
  templateUrl: 'users-add.component.html'
})
export class UsersAddComponent implements AfterViewInit {
  user: User = new User();
  groups: Group[] = [];
  selectedGroups: string[] = [];
  errors: any = {
    'username' : '',
    'nama' : ''
  };

  constructor(
    private userService : UserService,
    public router : Router,
    private groupService : GroupService
  ) {

  }

  ngAfterViewInit() {
    this.groupService.get().subscribe(
      res => {
        this.groups = res.data.data;
      },
      err => {
        console.log(err);
      }
    )
  }

  insertUser() {
    this.user.sts = true;
    this.userService.create(this.user).subscribe(
      res => {
        let nama = res.data.nama;
        this.userService.updateGroups(res.data.id,this.selectedGroups).subscribe(
          res => {
            Swal.fire(
              `Action Success!`,
              `User ${nama} has been created.`,
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
