import { Component, Input, OnInit } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-statistic-card',
  templateUrl: './statistic-card.component.html',
  styleUrls: ['./statistic-card.component.scss'],
})
export class StatisticCardComponent implements OnInit {

  @Input()
  classification;
  
  constructor(private router:Router) { }
  
  ngOnInit() {

    console.log(this.classification);
    
  
};

}
