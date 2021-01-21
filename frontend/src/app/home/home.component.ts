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

  displayedColumns: string[] = ['idstructure', 'structurename', 'STRUCTURECODELIKE', 'EMAILGROUPMANAGERS', 'STATUSSTRUCTURE', 'action'];

  icon_etat: String = "vert.svg";
  etat: String = "";
  ELEMENT_DATA: Structure[] = [];

  dataSource: MatTableDataSource<Structure> = new MatTableDataSource(this.ELEMENT_DATA);
  formSettings: MbscFormOptions = {
    theme: 'mobiscroll',
    themeVariant: 'light'
  };

  showSpinner: Boolean = false;
  mailRequest:MailRequest={"from":"","msg":"","sturcturename":"","subject":"","to":[],"filesName":[]};
  currentUser:User={"email":"","iduser":0,"name":"","password":"","state":0,"username":""};
  email:EmailDB={"emailgenerationdate":new Date(),"emailobject":"","idemail":0,"iduser":0,"msg":"","receiver":"","sender":""};
  emailSaved:Boolean=false;
  archiveSentFilesSaved:Boolean=false;
  eFiles:Efile[]=[];
  archiveSentFiles:ArchiveSentFiles[]=[];
  updatedStructure:Structure={
    "idstructure":0,
    "idactivity":0,
    "emailgroupmanagers":"",
    "statusstructure":0,
    "structurecodenotlike":"",
    "structurecodelike":"",
    "structurename":""
  };

  

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }


  constructor(iconRegistry: MatIconRegistry,
     sanitizer: DomSanitizer, 
     private homeService:HomeService, 
     private token: TokenStorageService, 
     private router: Router,
     private paramService :ParametreService,
     public dialog: MatDialog) {


    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/' + this.icon_etat));

  }

  ngOnInit() {
    //get current user
    this.currentUser.username=this.token.getUsername();
    this.paramService.getUserByUserName(this.currentUser).subscribe(
      (data) => {
      if(data!=null){
        //console.log(data);
        this.currentUser=data;
      }else{
        this.openDialog();
      }
       

      },
      error => {
        console.log(error);
        alert(error);
        throw error;

      }

    )

    //get all structures
    this.homeService.getAllStructures().subscribe(
      (data) => {
        if(data!=null){
          this.ELEMENT_DATA = data;
          //console.log(data);
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          
        }else{
          this.openDialog();
        }
        
        
      },
      error => {
        //console.log(error);
        alert(error);
        throw error;

      }
    )
  }

//---------------------------------------------------------------------SEND EMAIL----------------------------------------------------------------------------------------------
  sendEmail(structure:Structure){
    
    /**************initialisation of mail request************************************* */
    //this.mailRequest.to=structure.emailgroupmanagers;
    this.mailRequest.to.push("Feriel.Aid@Sonatrach.dz")
    this.mailRequest.to.push(this.currentUser.email); //pour le moment juste pour tester
    this.mailRequest.sturcturename=structure.structurename;
    this.mailRequest.subject="test from angular";
    this.mailRequest.msg="Je vous envoie ci-joint les etats de paie de ce mois.";
    this.mailRequest.from=this.currentUser.email;
     /**************initialisation of mail to save in DB************************************* */
    this.email.emailobject=this.mailRequest.subject;
    this.email.iduser=this.currentUser.iduser;
    this.email.msg= this.mailRequest.msg;
    for(let i=0;i<this.mailRequest.to.length;i++){
      this.email.receiver=this.email.receiver.concat(this.mailRequest.to[i]+";");
    }
   
    this.email.sender=this.mailRequest.from;
     /**************get Efiles for choosed structure************************************* */
     this.updatedStructure.emailgroupmanagers=structure.emailgroupmanagers;
     this.updatedStructure.idactivity=structure.idactivity;
     this.updatedStructure.idstructure=structure.idstructure;
     this.updatedStructure.structurecodelike=structure.structurecodelike;
     this.updatedStructure.structurecodenotlike=structure.structurecodenotlike;
     this.updatedStructure.structurename=structure.structurename;
     this.updatedStructure.statusstructure=0;
    this.homeService.getEfiles(structure).subscribe(
      (data) => {
      
       
        if(data.length!=0){
          console.log(data);
          //send email
          this.eFiles=data;
          this.sendEmailToManagers(this.updatedStructure);
        }else{
          this.openDialog();
        }

      },
      error => {
        console.log(error);
        alert(error);
        throw error;

      }
    )

  }


  sendEmailToManagers(struture:Structure){
    this.homeService.sendEmailZip(this.mailRequest).subscribe(
      (data) => {
      
        console.log(data);
        if(data!=null){
          if(data.status==true){
            this.saveEmailDB(struture);
           
          
          }else{
            this.openDialog();
          }
        }else{
          this.openDialog();
        }

      },
      error => {
        console.log(error);
        alert(error);
        throw error;

      }


    );
  }

  saveEmailDB(struture:Structure){
    this.archiveSentFiles=[];
    this.homeService.SaveSentEmail(this.email).subscribe(
      (data) => {
      
        console.log(data);
        if(data!=null){
          this.emailSaved=true;
          for(let i=0;i<this.eFiles.length;i++){
            this.archiveSentFiles.push({"idemail":data.idemail,"idfile":this.eFiles[i].idfile});
          }
          console.log(this.archiveSentFiles)
          this.saveArchiveSentFiles();
        }else{
          this.openDialog();
        }

      },
      error => {
        console.log(error);
        alert(error);
        throw error;

      }


    )
    this.homeService.updateStructureStatus(struture).subscribe(
      (data) => {
      
        if(data!=null){
          console.log(data);
        }else{
         this.openDialog();
        }
       
       

      },
      error => {
        console.log(error);
        alert(error);
        throw error;

      }

    )
  }

  saveArchiveSentFiles(){
    this.homeService.SaveArchiveSentFiles(this.archiveSentFiles).subscribe(
      (data) => {
      
        console.log(data);
        if(data!=null){
          this.archiveSentFilesSaved=true;
          this.showAlert("Envoie Email","L'email a bien été envoyé aux gestionnaires");
        }else{
          this.openDialog();
        }

      },
      error => {
        console.log(error);
        alert(error);
        throw error;

      }


    )
  }

  showAlert(title:String,msg:String) {
      mobiscroll.alert({
        title: title,
        message: msg
         ,callback: function () {
          window.location.reload();
         }
      });
    
   
  }


  //----------------------------------------------------------------Suspendre/activer Structure-----------------------------------------------------------------------
  suspendreStructure(structure:Structure){
    let etat=structure.statusstructure;
    structure.statusstructure=2;
    this.homeService.suspendreStructure(structure).subscribe(

      (data) => {
      
        console.log(data);
        if(data!=null){
          
          this.showAlert("Suspension Structure","La structure a bien été suspendue");
        }else{
          
          structure.statusstructure=etat;
          this.openDialog();
        }

      },
      error => {
        console.log(error);
        alert(error);
        throw error;

      }



    )
  }



  activerStructure(structure:Structure){
    let etat=structure.statusstructure;
    structure.statusstructure=1;
    this.homeService.suspendreStructure(structure).subscribe(

      (data) => {
      
        console.log(data);
        if(data!=null){
          
          this.showAlert("Activation Structure","La structure a bien été activée");
        }else{
          
          structure.statusstructure=etat;
          this.openDialog();
        }

      },
      error => {
        console.log(error);
        alert(error);
        throw error;

      }



    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openDialog() {
    const dialogRef = this.dialog.open(AlertDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }
}
