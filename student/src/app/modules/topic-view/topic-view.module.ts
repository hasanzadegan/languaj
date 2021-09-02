import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TopicViewComponent} from './topic-view.component';
import {MatIconModule} from '@angular/material/icon';
import {ExtendedModule, FlexModule} from '@angular/flex-layout';
import {IntroComponent} from './intro/intro.component';
import {MatButtonModule} from '@angular/material/button';
import {SpellComponent} from './spell/spell.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { OrderComponent } from './order/order.component';
import { MultiComponent } from './multi/multi.component';
import { PairComponent } from './pair/pair.component';
import { AchivementComponent } from './achivement/achivement.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

const routes: Routes = [
  {path: '', component: TopicViewComponent}
];

@NgModule({
  declarations: [TopicViewComponent, IntroComponent, SpellComponent, OrderComponent, MultiComponent, PairComponent, AchivementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    FlexModule,
    MatButtonModule,
    ExtendedModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
  ]
})
export class TopicViewModule {
}
