import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)},
  {path: 'courses', loadChildren: () => import('./modules/course-list/course-list.module').then(m => m.CourseListModule)},
  {path: 'topics', loadChildren: () => import('./modules/topic-list/topic-list.module').then(m => m.TopicListModule)},
  {path: 'topic', loadChildren: () => import('./modules/topic-view/topic-view.module').then(m => m.TopicViewModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
