import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
public host:string;
  constructor(private httpClient:HttpClient) { 
    this.host = 'http://localhost:8080/generate2/';
  }

   public getFiles(name:String){
     return this.httpClient.get(this.host+name);
   }



}
