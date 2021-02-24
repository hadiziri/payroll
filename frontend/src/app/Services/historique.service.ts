import { FolderArchive } from './../Models/FolderArchive';
import { User } from './../Models/User';
import { Injectable } from '@angular/core';
import { CommunService } from './commun.service';


import {HttpClient, HttpErrorResponse} from '@angular/common/http'

import { Observable } from 'rxjs';


import { throwError } from 'rxjs';
import { catchError  } from 'rxjs/operators';
import { EmailDB } from '../Models/EmailDB';
import { ArchiveStructure } from '../Models/ArchiveStructure';
@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {


  public host:String;
  constructor(private httpClient:HttpClient,communService:CommunService) { 
    this.host = communService.getHost();
  }
  public  getAllEmails(user:User):Observable<Array<EmailDB>>{
    return this.httpClient.post<Array<EmailDB>>(this.host+"getAllEmails",user).pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public getSentFiles(email:EmailDB):Observable<Array<String>>{
    return this.httpClient.post<Array<String>>(this.host+"getSentFiles",email).pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public getArchiveStructure(operation:User):Observable<Array<ArchiveStructure>>{
    return this.httpClient.post<Array<ArchiveStructure>>(this.host+"getArchiveStructure",operation).pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public getArchiveFolder(operation:User):Observable<Array<FolderArchive>>{
    return this.httpClient.post<Array<FolderArchive>>(this.host+"getArchiveFolder",operation).pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }
}
