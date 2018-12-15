import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  rest: any;
  id: any;
  array = [];

  ngOnInit() {
    this.getRest(this.id);
  }
  getRest(id){
    let observable = this._httpService.getRest(this._route.params['value'].id);
    observable.subscribe(data => { 
    this.rest = data;
    console.log(this.rest);
    });
  }
  check(){
    console.log("checking edit.component", this.rest);
    let observable = this._httpService.editRest(this.rest, this.rest._id);
    observable.subscribe(data =>{
      console.log(data);
      if( data['errors']){
        this.array = [];
        for (let error in data['errors']){
          this.array.push(data['errors'][error].message)
          console.log(this.array);
        }
      }else{
        console.log("done check", data['status']);
      this._router.navigate(['']);
      }
    })
  }

}
