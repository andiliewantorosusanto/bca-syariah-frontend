import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTextfileComponent } from './create-textfile.component';
import { UploadTextfileComponent } from './upload-textfile.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Users'
    },
    children : [
      {
        path: 'create',
        component: CreateTextfileComponent,
        data: {
          title: 'Create Text File'
        },
      },
      {
        path: 'upload',
        component: UploadTextfileComponent,
        data: {
          title: 'Upload Text File'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TextfileRoutingModule {}
