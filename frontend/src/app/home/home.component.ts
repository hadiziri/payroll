import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorDialogComponent } from './../error-dialog/error-dialog.component';
import { EtatRet } from './../Models/EtatRet';
import { EtatRecap } from './../Models/EtatRecap';
import { EtatMip } from './../Models/EtatMip';
import { EtatMand } from './../Models/EtatMand';
import { EtatJournal } from './../Models/EtatJournal';
import { AlertDialogComponent } from './../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ArchiveSentFiles } from './../Models/ArchiveSentFiles';
import { Efile } from './../Models/Efile';
import { EmailDB } from './../Models/EmailDB';
import { User } from './../Models/User';
import { ParametreService } from './../Services/parametre.service';
import { MailRequest } from './../Models/MailRequest';
import { HomeService } from './../Services/home.service';
import { Router } from '@angular/router';
import { TokenStorageService } from './../auth/token-storage.service';



import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Structure } from '../Models/Structure';

import { error } from 'protractor';
import { newArray, stringify } from '@angular/compiler/src/util';
import { mobiscroll, MbscFormOptions } from '@mobiscroll/angular-lite';


export interface EtatElement {
  
  idStructure: number;

  etatStructure: number;
  
}



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
 


    ngOnInit() {
    
  }


}
