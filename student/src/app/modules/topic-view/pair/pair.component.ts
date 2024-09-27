import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pair',
  templateUrl: './pair.component.html',
  styleUrls: ['./pair.component.scss']
})
export class PairComponent implements OnInit {
  @Output() state = new EventEmitter();
  @Output() battery = new EventEmitter();


  obj = [
    {title: 'Frau', mean: 'زن', select: 0},
    {title: 'Kind', mean: 'کودک', select: 0},
  ];

  answer = [];
  trueChoice = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  select(card): void {
    this.answer.push(card);
    if (this.answer.length === 2) {
      this.obj.forEach(i => {
        this.answer.forEach(x => {
          if (i === x) {
            if (this.answer[0] === this.answer[1]) {
              i.select = 1;
            } else {
              i.select = 2;
            }
          }
        });
      });
      this.answer = [];
    }
    setTimeout(() => {
      this.state.emit();
    }, 3000);
  }

  checkAllselcted(): any {
    this.obj.forEach(i => {
      if (i.select === 0) {
        console.warn(i.select);
        return 1;
      }
      return 2;
    });
  }

}
