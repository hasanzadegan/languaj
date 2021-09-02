import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-spell',
  templateUrl: './spell.component.html',
  styleUrls: ['./spell.component.scss']
})
export class SpellComponent implements OnInit {
  @Output() battery = new EventEmitter();
  @Output() state = new EventEmitter();

  cardStatus;
  form;
  obj = {title: 'Junge', question: ['J', null, 'n', null, 'e'], persian: 'پسر'};


  constructor() {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    const group: any = {};
    for (let i = 0; i < this.obj.question.length; i++) {
      if (this.obj.question[i] === null) {
        group[i] = new FormControl('', Validators.required);
      } else {
        group[this.obj.question[i]] = new FormControl(this.obj.question[i]);
      }
    }
    this.form = new FormGroup(group);
  }

  check(value): void {
    if (this.form.valid) {
      const answerTrue = (value.split('')).sort();
      const answer = [];
      for (const key in this.form.value) {
        answer.push(this.form.value[key]);
      }
      answer.sort();
      if (JSON.stringify(answer) === JSON.stringify(answerTrue)) {
        this.cardStatus = 2;
        setTimeout(() => {
          this.state.emit();
        }, 2000);
      } else {
        this.cardStatus = 3;
        this.battery.emit();
        setTimeout(() => {
          this.state.emit();
        }, 2000);
      }
    }
  }

}
