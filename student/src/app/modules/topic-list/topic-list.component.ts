import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  selectTopic(event): void {
    if (event == 1) {
      this.router.navigate(['/topic']);
    }
  }

}
