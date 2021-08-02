import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LevelComponent} from './level/level.component';
import { CourseListComponent} from './course-list/course-list.component';
import { TopicListComponent} from './topic-list/topic-list.component';
import { LevelListComponent} from './level-list/level-list.component';

import { MultiComponent } from './level-type/multi/multi.component';
const routes: Routes = [
  { path: 'courseList', component: CourseListComponent },
  { path: 'topicList', component: TopicListComponent },
  { path: 'levelList', component: LevelListComponent },
  { path: 'level', component: LevelComponent},
  { path: 'multi', component: MultiComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
