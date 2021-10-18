import { AfterViewInit, Component } from '@angular/core';
import Swal from "sweetalert2";
import { Router } from '@angular/router';
import { GroupService } from '../../services/group.service';
import { Group } from '../../models/group.model';
import { MenuService } from '../../services/menu.service';
import { Menu } from '../../models/menu.model';

@Component({
  templateUrl: 'groups-add.component.html'
})

export class GroupsAddComponent implements AfterViewInit {
  menus: Menu[] = [];
  group: Group = new Group();
  selectedMenus: string[] = [];

  errors: any = {
    'group_name' : ''
  };

  constructor(
    private menuService : MenuService,
    public router : Router,
    private groupService : GroupService
  ) {

  }

  ngAfterViewInit() {
    this.menuService.get().subscribe(
      res => {
        this.menus = res.data.menus;
      },
      err => {
        console.log(err);
      }
    )
  }

  insertGroup() {
    this.group.sts = true;
    this.groupService.create(this.group).subscribe(
      res => {
        let nama = res.data.group_name;
        this.groupService.updateMenu(res.data.id,this.selectedMenus).subscribe(
          res => {
            Swal.fire(
              `Action Success!`,
              `Group ${nama} has been created.`,
              'success'
            )
            this.router.navigate(['/group']);
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
