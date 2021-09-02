import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-multi',
  templateUrl: './multi.component.html',
  styleUrls: ['./multi.component.scss']
})
export class MultiComponent implements OnInit {
  @Output() state = new EventEmitter();
  @Output() battery = new EventEmitter();

  obj = [
    {title: 'Kind'},
    {title: 'Frau'},
    {title: 'Mann'},
  ];

  choise;

  constructor() {
  }

  ngOnInit(): void {
  }

  select(card): void {
    this.choise = card;
    if (card.title === 'Kind') {
      console.log('true');
      setTimeout(() => {
        this.state.emit();
      }, 2000);
    } else {
      this.battery.emit();
      setTimeout(() => {
        this.state.emit();
      }, 2000);
    }
  }

}
