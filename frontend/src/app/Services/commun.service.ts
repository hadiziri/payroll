import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CommunService {
  public host:String="http://10.100.105.81:8080/";
  constructor(private http: HttpClient) { 
    this.getJSON().subscribe(data => {
      console.log(data.host);
     // this.host=data.host;
    
  });
  }

  public getJSON(): Observable<any> {
    return this.http.get("./assets/hostPath.JSON");
}
  public  getHost():String{
   //console.log(this.host)
    return this.host;
  }
}
