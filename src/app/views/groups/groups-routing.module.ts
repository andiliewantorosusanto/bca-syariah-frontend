import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupsAddComponent } from './groups-add.component';
import { GroupsEditComponent } from './groups-edit.component';

import { GroupsComponent } from './groups.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Groups'
    },
    children : [
      {
        path: '',
        component: GroupsComponent,
        data: {
          title: 'Groups List'
        },
      },
      {
        path: 'add',
        component: GroupsAddComponent,
        data: {
          title: 'Groups Add'
        }
      },
      {
        path: 'edit/:id',
        component: GroupsEditComponent,
        data: {
          title: 'Groups Edit'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule {}
