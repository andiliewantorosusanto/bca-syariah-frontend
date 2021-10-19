import { AfterViewInit, Component,  ViewChild } from '@angular/core';
import Swal from "sweetalert2";
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../../services/group.service';
import { Group } from '../../models/group.model';
import { MatSelectionList } from '@angular/material/list';
import { forkJoin } from 'rxjs';
import { Menu } from '../../models/menu.model';
import { MenuService } from '../../services/menu.service';

@Component({
  templateUrl: 'groups-edit.component.html'
})
export class GroupsEditComponent implements AfterViewInit {
  group: Group = new Group();
  menus: Menu[] = [];
  selectedMenus: string[] = [];
  errors: any = {
    'username' : '',
    'nama' : ''
  };
  btnEditDisabled: boolean = false;

  @ViewChild(MatSelectionList) sMenus : MatSelectionList;

  constructor(
    private menuService : MenuService,
    public router : Router,
    private groupService : GroupService,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngAfterViewInit() {
    let menuRequest = this.menuService.get();
    let groupRequest = this.groupService.getById(this.activatedRoute.snapshot.params.id);
    let groupMenuRequest = this.groupService.getMenu(this.activatedRoute.snapshot.params.id);

    forkJoin(
      [menuRequest, groupRequest, groupMenuRequest]
    ).subscribe(data => {
      this.menus = data[0].data.menus;
      this.group = data[1].data;

      data[2].data.forEach(menu => {
        this.selectedMenus.push(menu.id);
      });
    });
  }

  updateGroup() {
    this.btnEditDisabled = true;
    this.groupService.update(this.group).subscribe(
      res => {
        let groupName = res.data.group_name;
        this.groupService.updateMenu(res.data.id,this.selectedMenus).subscribe(
          res => {
            Swal.fire(
              `Action Success!`,
              `Group ${groupName} has been updated.`,
              'success'
            )
            this.router.navigate(['/group']);
          },
          err => {
            this.btnEditDisabled = false;
            this.errors = err.error.errors;
          }
        )
      },
      err => {
        this.btnEditDisabled = false;
        this.errors = err.error.errors;
      }
    )
  }
}
