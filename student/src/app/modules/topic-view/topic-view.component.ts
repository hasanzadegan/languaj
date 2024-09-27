import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-topic-view',
  templateUrl: './topic-view.component.html',
  styleUrls: ['./topic-view.component.scss']
})
export class TopicViewComponent implements OnInit {

  state = 1;
  battery = 0;

  constructor() {
  }

  ngOnInit(): void {

  }

  batteryState(): any {
    return `0  -${this.battery}px`;
  }

  changeState(): void {
    this.state++;
  }

  batteryMinus(): void {
    const pre = this.battery + 18;
    this.battery = pre;
  }

}
