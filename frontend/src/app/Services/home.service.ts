import { EtatRet } from './../Models/EtatRet';
import { EtatRecap } from './../Models/EtatRecap';
import { EtatMip } from './../Models/EtatMip';
import { EtatMand } from './../Models/EtatMand';
import { EtatJournal } from './../Models/EtatJournal';
import { ArchiveSentFiles } from './../Models/ArchiveSentFiles';
import { Efile } from './../Models/Efile';
import { EmailDB } from './../Models/EmailDB';
import { MailRequest } from './../Models/MailRequest';
import { CommunService } from './commun.service';
import { Structure } from './../Models/Structure';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
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
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
    
  
  }

  public sendEmailZip( mailReq:MailRequest):Observable<MailResponse>{
    return this.httpClient.post<MailResponse>(this.host+"sendEmailZip",mailReq).pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
    
  }

  public SaveSentEmail(email:EmailDB):Observable<EmailDB>{
    return this.httpClient.post<EmailDB>(this.host+"SaveSentEmail",email).pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
    
  }

  public SaveArchiveSentFiles(files:ArchiveSentFiles[]):Observable<Array<ArchiveSentFiles>>{
    return this.httpClient.post<Array<ArchiveSentFiles>>(this.host+"SaveArchiveSentFiles",files).pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public getEfiles(structure:Structure):Observable<Array<Efile>>{
    return this.httpClient.post<Array<Efile>>(this.host+"getEfiles",structure).pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public suspendreStructure(structure:Structure):Observable<Structure>{
    return this.httpClient.post<Structure>(this.host+"suspendreStructure",structure).pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public activerStructure(structure:Structure):Observable<Structure>{
    return this.httpClient.post<Structure>(this.host+"activerStructure",structure).pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public updateStructureStatus(structure:Structure):Observable<Structure>{
    return this.httpClient.post<Structure>(this.host+"updateStructureStatus",structure).pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }


  public getEtatJournal():Observable<Array<EtatJournal>>{
    return this.httpClient.get<Array<EtatJournal>>(this.host+"getEtatJournal").pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public getEtatMand():Observable<Array<EtatMand>>{
    return this.httpClient.get<Array<EtatMand>>(this.host+"getEtatMand").pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public getEtatMip():Observable<Array<EtatMip>>{
    return this.httpClient.get<Array<EtatMip>>(this.host+"getEtatMip").pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public getEtatRecap():Observable<Array<EtatRecap>>{
    return this.httpClient.get<Array<EtatRecap>>(this.host+"getEtatRecap").pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public getEtatRet():Observable<Array<EtatRet>>{
    return this.httpClient.get<Array<EtatRet>>(this.host+"getEtatRet").pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public generateJournal(journal:Array<EtatJournal>,nameStructure:String):Observable<Array<EtatJournal>>{
    return this.httpClient.post<Array<EtatJournal>>(this.host+"generateJournal",journal,{params:new HttpParams().set('structure', nameStructure.toString())}).pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public generateMip(mip:Array<EtatMip>,nameStructure:String):Observable<Array<EtatMip>>{
    return this.httpClient.post<Array<EtatMip>>(this.host+"generateMip",mip,{params:new HttpParams().set('structure', nameStructure.toString())}).pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }
  public generateRet(ret:Array<EtatRet>,nameStructure:String):Observable<Array<EtatRet>>{
    return this.httpClient.post<Array<EtatRet>>(this.host+"generateRet",ret,{params:new HttpParams().set('structure', nameStructure.toString())}).pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public generateMand(mand:Array<EtatMand>,nameStructure:String):Observable<Array<EtatMand>>{
    return this.httpClient.post<Array<EtatMand>>(this.host+"generateMand",mand,{params:new HttpParams().set('structure', nameStructure.toString())}).pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }
  public generateRecap(recap:Array<EtatRecap>,nameStructure:String):Observable<Array<EtatRecap>>{
    return this.httpClient.post<Array<EtatRecap>>(this.host+"generateRecap",recap,{params:new HttpParams().set('structure', nameStructure.toString())}).pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public saveGeneratedFiles(files:Array<Efile>):Observable<Array<Efile>>{
    return this.httpClient.post<Array<Efile>>(this.host+"saveGeneratedFiles",files).pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public updateStructureFilesGenerated(structure:Structure):Observable<Structure>{
    return this.httpClient.post<Structure>(this.host+"updateStructureFilesGenerated",structure).pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public deleteZip(structure:Structure):Observable<String>{
    return this.httpClient.post<String>(this.host+"deleteZip",structure).pipe(
      catchError((err) => {
         //console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

}
