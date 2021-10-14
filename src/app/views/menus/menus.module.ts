import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { MenusComponent } from './menus.component';
import { MenusRoutingModule } from './menus-routing.module';
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
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    MenusRoutingModule,
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
    MatProgressSpinnerModule
  ],
  declarations: [ MenusComponent ]
})
export class MenusModule { }
