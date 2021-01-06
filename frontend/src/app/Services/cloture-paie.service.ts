import { Injectable } from '@angular/core';

import {HttpClient, HttpErrorResponse} from '@angular/common/http'

import { Observable } from 'rxjs';


import { throwError } from 'rxjs';
import { catchError  } from 'rxjs/operators';

import { Folder } from '../Models/folder';
import { clotureFiles } from './../Models/cloturesFiles';

@Injectable({
  providedIn: 'root'
})
export class CloturePaieService {

  public host:string;
  constructor(private httpClient:HttpClient) { 
    this.host = 'http://localhost:8080/';
  }


  public getallFolders():Observable<Array<Folder>>{
    return this.httpClient.get<Array<Folder>>(this.host+"getAllFolders").pipe(
     catchError((err) => {
       console.log('error caught in service')
       console.error(err);
       return throwError(err);
     })
   );
  }

  public getFilesByFolder(folder:Folder):Observable<Array<clotureFiles>>{
   return this.httpClient.post<Array<clotureFiles>>(this.host+"getFilesByFolder",folder).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err);
      return throwError(err);
    })
  );
 }


 public getEtatFile(file:clotureFiles):Observable<number>{
   return this.httpClient.post<number>(this.host+"getEtatFile",file).pipe(
     catchError((err) => {
       console.log('error caught in service')
       console.error(err);
       return throwError(err);
     })
   );
 }

 public generateTableFiles():Observable<Array<clotureFiles>>{
  return this.httpClient.get<Array<clotureFiles>>(this.host+"generateTableFiles").pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err);
      return throwError(err);
    })
  );
 }

 
 public generateSystemFiles():Observable<Array<clotureFiles>>{
  return this.httpClient.get<Array<clotureFiles>>(this.host+"generateSystemFiles").pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err);
      return throwError(err);
    })
  );
 }
 
 public generateFrubFiles():Observable<Array<clotureFiles>>{
  return this.httpClient.get<Array<clotureFiles>>(this.host+"generateFrubFiles").pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err);
      return throwError(err);
    })
  );
 }
 
 public generateNewPaieFiles():Observable<Array<clotureFiles>>{
  return this.httpClient.get<Array<clotureFiles>>(this.host+"generateNewPaieFiles").pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err);
      return throwError(err);
    })
  );
 }

 public generatePersFiles():Observable<Array<clotureFiles>>{
  return this.httpClient.get<Array<clotureFiles>>(this.host+"generatePersFiles").pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err);
      return throwError(err);
    })
  );
 }

}
