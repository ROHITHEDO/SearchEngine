import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private _http:HttpClient) {

   }

   headers1 = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:4200',
  });
  options = { headers: this.headers1, withCredentials: true };

  getPlaces(placeType: string, locationName: string): Observable<any> {
    const url = `https://localhost:7295/api/places/${placeType}/${locationName}`;
    return this._http.get<any>(url,this.options);
  }

  getExercises(value:any):Observable<any>{
       const url=`https://localhost:7295/api/places/Exercise?name=${value}`;
       return this._http.get<any>(url,this.options);
  }


getNews(value:any):Observable<any>
{
  const url=`https://localhost:7295/api/places/News?location=${value}`;
  return this._http.get<any>(url,this.options);
}

}
