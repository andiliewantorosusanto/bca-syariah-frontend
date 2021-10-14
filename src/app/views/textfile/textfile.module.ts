import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { CreateTextfileComponent } from './create-textfile.component';
import { UploadTextfileComponent } from './upload-textfile.component';
import { TextfileRoutingModule } from './textfile-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule  } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxMaskModule } from 'ngx-mask';
@NgModule({
  imports: [
    TextfileRoutingModule,
    ChartsModule,
    BsDropdownModule,
    NgxPaginationModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSliderModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    CommonModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatListModule,
    MatDatepickerModule,
    BsDatepickerModule,
    NgxMaskModule
  ],
  declarations: [ CreateTextfileComponent,UploadTextfileComponent  ],
  providers: [CurrencyPipe]
})
export class TextfileModule { }
