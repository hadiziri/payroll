import { CommunService } from './commun.service';
import { Structure } from './../Models/Structure';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public host:String;
  constructor(private httpClient:HttpClient,communService:CommunService) { 
    this.host = communService.getHost();
  }
  public getAllStructures():Observable <Array<Structure>>{
    return this.httpClient.get <Array<Structure>>(this.host+"getAllStructures").pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
    
  
  }
}
