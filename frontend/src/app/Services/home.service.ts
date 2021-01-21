import { ArchiveSentFiles } from './../Models/ArchiveSentFiles';
import { Efile } from './../Models/Efile';
import { EmailDB } from './../Models/EmailDB';
import { MailRequest } from './../Models/MailRequest';
import { CommunService } from './commun.service';
import { Structure } from './../Models/Structure';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError  } from 'rxjs/operators';
import { MailResponse } from '../Models/MailResponse';

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

  public sendEmailZip( mailReq:MailRequest):Observable<MailResponse>{
    return this.httpClient.post<MailResponse>(this.host+"sendEmailZip",mailReq).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
    
  }

  public SaveSentEmail(email:EmailDB):Observable<EmailDB>{
    return this.httpClient.post<EmailDB>(this.host+"SaveSentEmail",email).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
    
  }

  public SaveArchiveSentFiles(files:ArchiveSentFiles[]):Observable<Array<ArchiveSentFiles>>{
    return this.httpClient.post<Array<ArchiveSentFiles>>(this.host+"SaveArchiveSentFiles",files).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public getEfiles(structure:Structure):Observable<Array<Efile>>{
    return this.httpClient.post<Array<Efile>>(this.host+"getEfiles",structure).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public suspendreStructure(structure:Structure):Observable<Structure>{
    return this.httpClient.post<Structure>(this.host+"suspendreStructure",structure).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public activerStructure(structure:Structure):Observable<Structure>{
    return this.httpClient.post<Structure>(this.host+"activerStructure",structure).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public updateStructureStatus(structure:Structure):Observable<Structure>{
    return this.httpClient.post<Structure>(this.host+"updateStructureStatus",structure).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

}
