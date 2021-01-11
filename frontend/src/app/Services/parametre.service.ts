import { User } from './../Models/User';
import { ArchiveStructure } from './../Models/ArchiveStructure';
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { threadId } from 'worker_threads';
import { Observable } from 'rxjs';
import { Structure } from '../Models/Structure';

import { throwError } from 'rxjs';
import { catchError  } from 'rxjs/operators';
import { FileToPrint } from '../Models/FileToPrint';
import { ShActivity } from '../Models/ShActivity';

import { clotureFiles } from './../Models/cloturesFiles';


@Injectable({
  providedIn: 'root'
})
export class ParametreService {
  public host:string;
  constructor(private httpClient:HttpClient) { 
    this.host = 'http://10.100.105.81:8080/';
  }

   public getEtats():Observable<Array<clotureFiles>>{
     return this.httpClient.get<Array<clotureFiles>>(this.host+"allEtats").pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
   }

  


  public saveFileToPrint(file:Array<FileToPrint>):Observable<Array<FileToPrint>>{
    return this.httpClient.post<Array<FileToPrint>>(this.host+"saveFileToPrint",file).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public deleteFileToPrint(file:Array<FileToPrint>):Observable<Array<FileToPrint>>{
    return this.httpClient.post<Array<FileToPrint>>(this.host+"deleteFileToPrint",file).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public getAllFileToPrint():Observable<Array<FileToPrint>>{
    return this.httpClient.get<Array<FileToPrint>>(this.host+"allFileToPrint").pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }
  public  getSelectedEtat(file:FileToPrint):Observable<Array<FileToPrint>>{
    return this.httpClient.post<Array<FileToPrint>>(this.host+"selectedEtats",file).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public getAllShActivities():Observable <Array<ShActivity>>{
    return this.httpClient.get <Array<ShActivity>>(this.host+"allShActivities").pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
    }

   public getStructureByActivity(activity :ShActivity):Observable <Array<Structure>>{
    return this.httpClient.post<Array<Structure>>(this.host+"getStructurByActivity",activity).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
   }


   public updateStructure(structure:Structure):Observable<Structure>{
     return this.httpClient.post<Structure>(this.host+"updateStructure",structure).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
   }

   public updateStructureArchive(archiveStructure:ArchiveStructure):Observable<ArchiveStructure>{
    return this.httpClient.post<ArchiveStructure>(this.host+"updateStructureArchive",archiveStructure).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
   }

   public getUserByUserName(u:User ):Observable<User>{
     return this.httpClient.post<User>(this.host+"getUserByUserName",u).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
   }

   public deleteStructure(structure:ArchiveStructure):Observable<Structure>{
     return this.httpClient.post<Structure>(this.host+"deleteStructure",structure).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
   }

   public addStructure(structure:Structure):Observable<Structure>{
    return this.httpClient.post<Structure>(this.host+"addStructure",structure).pipe(
     catchError((err) => {
       console.log('error caught in service')
       console.error(err);
       return throwError(err);
     })
   );
}

public addArchiveStructure(structure:ArchiveStructure):Observable<ArchiveStructure>{
  return this.httpClient.post<ArchiveStructure>(this.host+"addArchiveStructure",structure).pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err);
      return throwError(err);
    })
  );
 }
}
