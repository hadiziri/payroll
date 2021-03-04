import { ArchiveSentGfiles } from './../Models/ArchiveSentGfiles';
import { Gfile } from './../Models/Gfile';
import { Efile } from './../Models/Efile';
import { Observable } from 'rxjs';
import { MailResponse } from './../Models/MailResponse';
import { MailRequest } from './../Models/MailRequest';
import { CommunService } from './commun.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SendTableFilesService {

  public host:String;
  constructor(private httpClient:HttpClient,communService:CommunService) { 
    this.host = communService.getHost();
  }

  public sendEmailFiles( mailReq:MailRequest):Observable<MailResponse>{
    return this.httpClient.post<MailResponse>(this.host+"sendEmailFiles",mailReq).pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
    
  }

  public getGfilesTable():Observable<Array<Gfile>>{
    return this.httpClient.get<Array<Gfile>>(this.host+"getGfilesTable").pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public saveArchiveSentGfiles(files:Array<ArchiveSentGfiles>):Observable<Array<ArchiveSentGfiles>>{
    return this.httpClient.post<Array<ArchiveSentGfiles>>(this.host+"saveArchiveSentGfiles",files).pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }
}
