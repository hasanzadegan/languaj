import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopicListComponent} from './topic-list.component';
import {RouterModule, Routes} from '@angular/router';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatRippleModule} from '@angular/material/core';

const routes: Routes = [
  {path: '', component: TopicListComponent}
];

@NgModule({
  declarations: [TopicListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexModule,
    MatIconModule,
    FlexLayoutModule,
    MatRippleModule,
  ]
})
export class TopicListModule {
}
