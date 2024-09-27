import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  @Output() state = new EventEmitter();
  @Output() battery = new EventEmitter();

  obj = {
    trueAnswer:
      [
        'Madchen',
        'Junge',
        'und',
        'Frau',
        'und',
        'Mann'
      ],
    items: [
      'Junge',
      'Frau',
      'und',
      'Mann',
      'Madchen',
      'und',
    ]
  };

  todo = this.obj.items;

  done = [];


  constructor() {
  }

  ngOnInit(): void {
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  compare(array1, array2): any {
    for (let i = 0; i < array2.length; i++) {
      if (array2[i] === array1[i]) {
        // console.warn(array2.indexOf(array1[i]));
        // console.warn();
        return true;
      }
      return false;
    }
  }

  check() {
    console.log(this.obj.trueAnswer);
    if (JSON.stringify(this.obj.trueAnswer) === JSON.stringify(this.done)) {

      setTimeout(() => {
        this.state.emit();
      }, 3000);
    } else if (JSON.stringify(this.obj.trueAnswer) !== JSON.stringify(this.done)) {
      this.battery.emit();
      setTimeout(() => {
        this.state.emit();
      }, 3000);
    }
  }

}
