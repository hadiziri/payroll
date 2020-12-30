import { clotureFiles } from './../Models/cloturesFiles';
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { threadId } from 'worker_threads';
import { Observable } from 'rxjs';
import { Structure } from '../Models/Structure';

import { throwError } from 'rxjs';
import { catchError  } from 'rxjs/operators';
import { FileToPrint } from '../Models/FileToPrint';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
public host:string;
  constructor(private httpClient:HttpClient) { 
    this.host = 'http://localhost:8080/';
  }

   public getEtats():Observable<Array<clotureFiles>>{
     return this.httpClient.get<Array<clotureFiles>>(this.host+"allEtats"+name).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
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

  public cloturePaie() :Observable<Array<clotureFiles>>{
    return this.httpClient.get<Array<clotureFiles>>(this.host+"generateTableFiles").pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
    
  }

  public saveFileToPrint(file:FileToPrint):Observable<FileToPrint>{
    return this.httpClient.post<FileToPrint>(this.host+"fileToPrint",file).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

}
