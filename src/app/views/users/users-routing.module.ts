import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersAddComponent } from './users-add.component';
import { UsersEditComponent } from './users-edit.component';

import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Users'
    },
    children : [
      {
        path: '',
        component: UsersComponent,
        data: {
          title: 'Users List'
        },
      },
      {
        path: 'add',
        component: UsersAddComponent,
        data: {
          title: 'Users Add'
        }
      },
      {
        path: 'edit/:id',
        component: UsersEditComponent,
        data: {
          title: 'Users Edit'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
