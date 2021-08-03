import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit {

  public levelId: any ;
  public topicId: any ;


  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.forEach(params=>{
      this.topicId = params.topicId;
      this.levelId = params.levelId;
    })


  }

}
