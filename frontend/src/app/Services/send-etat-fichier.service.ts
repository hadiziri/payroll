import { Structure } from './../Models/Structure';
import { MailRequest } from './../Models/MailRequest';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { clotureFiles } from './../Models/cloturesFiles';
import { CommunService } from './commun.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SendEtatFichierService {

  public host:String;
  constructor(private httpClient:HttpClient,communService:CommunService) { 
    this.host = communService.getHost();
  }

  public getAllFichiers():Observable<Array<clotureFiles>>{
    return this.httpClient.get<Array<clotureFiles>>(this.host+"getAllFichiers").pipe(
     catchError((err) => {
        //console.log('error caught in service')
       console.error(err);
       return throwError(err);
     })
   );
  }

  public sendEtats(request:MailRequest,zipPath:String):Observable<Structure>{
    return this.httpClient.post<Structure>(this.host+"sendEtats",request,{params:new HttpParams().set('zipPath', zipPath.toString())}).pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }
}
