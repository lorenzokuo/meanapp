import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  addRest(rest){
    console.log("in service addRest: ", rest);
    return this._http.post('/newRest', rest)
  }
  addReview(review, id){
    console.log("in service addReview: ", review, id);
    return this._http.post("/rest/" + id, review)
  }
  getRests(){
    console.log("in service getRests");
    return this._http.get("/rests")
  }
  getRest(id){
    console.log("in service getRest");
    return this._http.get("/rest/" + id);
  }
  getReviews(id){
    console.log('in service getReviews');
    return this._http.get("/reviews/" + id);
  }
  deleteRest(id){
    console.log("in service deleteRest");
   return this._http.delete("/rest/" + id);
  }
  editRest(rest, id){
    console.log("in service editRest");
    return this._http.put("/rest/" + id, rest);
  }
}
