import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTextfileComponent } from './create-textfile.component';
import { UploadTextfileViewComponent } from './upload-textfile-view.component';
import { UploadTextfileComponent } from './upload-textfile.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Textfile'
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
      },
      {
        path: 'upload/view/:batchNo',
        component: UploadTextfileViewComponent,
        data: {
          title: 'View Upload Text File'
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
