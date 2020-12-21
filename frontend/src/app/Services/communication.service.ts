import { clotureFiles } from './../Models/cloturesFiles';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { threadId } from 'worker_threads';
import { Observable } from 'rxjs';
import { Structure } from '../Models/Structure';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
public host:string;
  constructor(private httpClient:HttpClient) { 
    this.host = 'http://localhost:8080/';
  }

   public getFiles(name:String){
     return this.httpClient.get(this.host+"generate2/"+name);
   }

  public getAllStructures():Observable <Array<Structure>>{
    return this.httpClient.get <Array<Structure>>(this.host+"getAllStructures");
  }

  public cloturePaie() :Observable<Array<clotureFiles>>{
    return this.httpClient.get<Array<clotureFiles>>(this.host+"generateTableFiles");
  }

}
