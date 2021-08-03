import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {CourseListComponent} from './course-list/course-list.component';

@NgModule({
    declarations: [
        CourseListComponent,
        ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [CourseListComponent]
})
export class AppModule {
}
