import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  public courseList: { title: string; courseId: number }[];

  constructor() {
    console.log('courseList loaded');
    this.courseList = [{courseId: 1, title: 'course 1'}];
  }

  ngOnInit(): void {

  }

}
