import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }


  selectCourse(): void {
    this.router.navigate(['../topics']);
  }
}
