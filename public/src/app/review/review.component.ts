import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})

export class ReviewComponent implements OnInit {

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  rest: any;
  id: any;
  review: any;

  ngOnInit() {
    this.getRest(this.id);
  }

  getRest(id){
    let observable = this._httpService.getRest(this._route.params['value'].id);
    observable.subscribe(data => { 
    this.rest = data;
    });
  }
}
