import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CourseListComponent} from './course-list.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatRippleModule} from '@angular/material/core';

const routes: Routes = [
  {path: '', component: CourseListComponent}
];

@NgModule({
  declarations: [CourseListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MatRippleModule,
  ]
})
export class CourseListModule {
}
