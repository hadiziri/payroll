

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


export interface FileDetails {
  
  name: String;

  progress: number;
  
}


@Component({
  selector: 'app-files-generator',
  templateUrl: './files-generator.component.html',
  styleUrls: ['./files-generator.component.css']
})
export class FilesGeneratorComponent implements OnInit {
 
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
  showProgressInit: Boolean = false;
  color: String = "warn";
  showProgress: Boolean = false;
  mailRequest:MailRequest={"from":"","msg":"","sturcturename":"","subject":"","to":[],"filesName":[]};
  currentUser:User={"email":"","iduser":0,"name":"","password":"","state":0,"username":""};
  email:EmailDB={"emailgenerationdate":new Date(),"emailobject":"","idemail":0,"iduser":0,"msg":"","receiver":"","sender":"","emailstatus":0};
  emailSaved:Boolean=false;
  archiveSentFilesSaved:Boolean=false;
  eFiles:Efile[]=[];
  archiveSentFiles:ArchiveSentFiles[]=[];
  allEtatJournal:EtatJournal[]=[];
  allEtatMand:EtatMand[]=[];
  allEtatMip:EtatMip[]=[];
  allEtatRecap:EtatRecap[]=[];
  allEtatRet:EtatRet[]=[];
  filteredEtatJournal:EtatJournal[]=[];
  filteredEtatMand:EtatMand[]=[];
  filteredEtatMip:EtatMip[]=[];
  filteredEtatRecap:EtatRecap[]=[];
  filteredEtatRet:EtatRet[]=[];
  codeStructure:string[]=[];
  codeNotLike:string[]=[];
  efiles:Efile[]=[];
  efichiers:Efile[]=[];
  mand:Boolean=false;
  jour:Boolean=false;
  ret:Boolean=false;
  recap:Boolean=false;
  mip:Boolean=false;
  newpaie:Boolean=false;
  pers:Boolean=false;
  frub:Boolean=false;
  allmand:Boolean=false;
  alljour:Boolean=false;
  allret:Boolean=false;
  allrecap:Boolean=false;
  allmip:Boolean=false;
  isDataLoaded:Boolean=false;
  index:number=0;
  indexE:number=0;
  generatedStructure:String="";
  showProgressAllFichier:Boolean=false;
  generatedStructureE:String="";
  showProgressAllEtat:Boolean=false;
  count:number=0;
  updatedStructure:Structure={
    "idstructure":0,
    "idactivity":0,
    "emailgroupmanagers":"",
    "statusstructure":0,
    "structurecodenotlike":"",
    "structurecodelike":"",
    "structurename":"",
    "isactif":0,
    "flagetat":0,
    "flagfichier":0,
    "fichiercodelike":"",
    "fichiercodenotlike":""
  };

  uploadedFiles:FileDetails[]=[{"name":"Journal","progress":0},{"name":"Mand","progress":0},{"name":"Mip","progress":0},{"name":"Ret","progress":0},{"name":"Recap","progress":0}];
  uploadedFichiers:FileDetails[]=[{"name":"NewPaie","progress":0},{"name":"Pers","progress":0},{"name":"Frub","progress":0}];
  initProgress:number=0;
  showProgressFichier:Boolean=false;
  

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
        // //console.log(data);
        this.currentUser=data;
      }else{
        this.openDialog();
      }
       

      },
      error => {
         //console.log(error);
        
        this.openDialogError(error);
        throw error;

      }

    )

    //get all structures
    this.homeService.getAllStructures().subscribe(
      (data) => {
        if(data!=null){
          this.ELEMENT_DATA = data;
          // //console.log(data);
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          
        }else{
          this.openDialog();
        }
        
        
      },
      error => {
        // //console.log(error);
        this.openDialogError(error);
        throw error;

      }
    );
/*
   
    */
  }

  disableSpinner(){
    if(this.alljour&&this.allmip&&this.allmand&&this.allret&&this.allrecap){
      this.showProgressInit=false;
      this.isDataLoaded=true;
    }
  }

  getStatus(element:Structure):number{
    if(element.statusstructure==3){
      return 3;
    }else{
      if(element.statusstructure==2){
        return 2;
      }else{
        return element.statusstructure*(element.flagetat+element.flagfichier)*element.isactif
      }
     
    }
    
  }

  chargerDonnees(){
    this.initProgress=10;
   this.showProgressInit=true;
   this.alljour=false;
   this.allmip=false;
   this.allmand=false;
   this.allret=false;
   this.allrecap=false;
 //get all etat paie filtered by paymonth
 this.homeService.getEtatJournal().subscribe(
  (data) => {
    if(data!=null){
     //console.log(data);
     this.initProgress=this.initProgress+15;
      this.allEtatJournal=data;
      this.alljour=true;
      this.disableSpinner();
      
    }else{
      this.openDialog();
    }
    
    
  },
  error => {
    // //console.log(error);
    this.openDialogError(error);
    throw error;

  }
);

this.homeService.getEtatMand().subscribe(
  (data) => {
    if(data!=null){
   //console.log(data);
   this.initProgress=this.initProgress+15;
      this.allEtatMand=data;
      this.allmand=true;
      this.disableSpinner();
    }else{
      this.openDialog();
    }
    
    
  },
  error => {
    // //console.log(error);
    this.openDialogError(error);
    throw error;

  }
);

this.homeService.getEtatMip().subscribe(
  (data) => {
    if(data!=null){
   //console.log(data);
   this.initProgress=this.initProgress+15;
      this.allEtatMip=data;
      this.allmip=true;
      this.disableSpinner();
    }else{
      this.openDialog();
    }
    
    
  },
  error => {
    // //console.log(error);
    this.openDialogError(error);
    throw error;

  }
);

this.homeService.getEtatRecap().subscribe(
  (data) => {
    if(data!=null){
      this.initProgress=this.initProgress+15;
      this.allEtatRecap=data;
    //console.log(this.allEtatRecap);
    this.allrecap=true;
    this.disableSpinner();
    
    }else{
      this.openDialog();
    }
    
    
  },
  error => {
    // //console.log(error);
    this.openDialogError(error);
    throw error;

  }
);

this.homeService.getEtatRet().subscribe(
  (data) => {
    if(data!=null){
    //console.log(data);
   this.initProgress=this.initProgress+15;
      this.allEtatRet=data;
      this.allret=true;
      this.disableSpinner();
     
    }else{
      this.openDialog();
    }
    
    
  },
  error => {
    // //console.log(error);
    this.openDialogError(error);
    throw error;

  }
);
this.initProgress=25;
  }
//---------------------------------------------------------------------SEND EMAIL----------------------------------------------------------------------------------------------
  sendEmail(structure:Structure){
    this.showSpinner=true;
    this.eFiles=[];
    this.mailRequest.to=[];
    this.email.receiver="";
    /**************initialisation of mail request************************************* */
    //this.mailRequest.to=structure.emailgroupmanagers;
    //this.mailRequest.to.push("DSI-Exploitation_paie@Sonatrach.dz")
    this.mailRequest.to.push("Feriel.Aid@Sonatrach.dz");
    this.mailRequest.to.push(this.currentUser.email); //pour le moment juste pour tester
    this.mailRequest.sturcturename=structure.structurename;
    this.mailRequest.subject="états paie";
    this.mailRequest.msg="Veuillez trouver ci-attaché les état paie du mois.";
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
     this.updatedStructure.statusstructure=2;
    this.homeService.getEfiles(structure).subscribe(
      (data) => {
      
       
        if(data.length!=0){
        //   //console.log(data);
          //send email
          this.eFiles=data;
          this.sendEmailToManagers(this.updatedStructure,structure);
        }else{
          this.openDialog();
        }

      },
      error => {
        // //console.log(error);
        this.openDialogError(error);
        
        throw error;

      }
    )

  }


  sendEmailToManagers(struture:Structure,currentStructure:Structure){
    this.homeService.sendEmailZip(this.mailRequest).subscribe(
      (data) => {
      
       //  //console.log(data);
        if(data!=null){
          if(data.status==true){
            this.saveEmailDB(struture,currentStructure);
           
          
          }else{
            this.openDialog();
          }
        }else{
          this.openDialog();
        }

      },
      error => {
       //  //console.log(error);
        this.openDialogError(error);
        throw error;

      }


    );
  }

  saveEmailDB(struture:Structure,currentStructure:Structure){
    this.archiveSentFiles=[];
    this.homeService.SaveSentEmail(this.email).subscribe(
      (data) => {
      
        // //console.log(data);
        if(data!=null){
          this.emailSaved=true;
          for(let i=0;i<this.eFiles.length;i++){
            this.archiveSentFiles.push({"idemail":data.idemail,"idfile":this.eFiles[i].idfile});
          }
          // //console.log(this.archiveSentFiles)
          this.saveArchiveSentFiles(currentStructure);
        }else{
          this.openDialog();
        }

      },
      error => {
        // //console.log(error);
        this.openDialogError(error);
        throw error;

      }


    )
    this.homeService.updateStructureStatus(struture).subscribe(
      (data) => {
      
        if(data!=null){
         //  //console.log(data);
        }else{
         this.openDialog();
        }
       
       

      },
      error => {
       //  //console.log(error);
        this.openDialogError(error);
        throw error;

      }

    )
  }

  saveArchiveSentFiles(currentStructure:Structure){
    this.homeService.SaveArchiveSentFiles(this.archiveSentFiles).subscribe(
      (data) => {
      
       //  //console.log(data);
        if(data!=null){
          this.archiveSentFilesSaved=true;
          currentStructure.statusstructure=2;
          this.showSpinner=false;
          this.showAlert("Envoie Email","L'email a bien été envoyé aux gestionnaires");
         this.deleteZip(currentStructure);
          this.copyFileToPrint(currentStructure);
        }else{
          this.openDialog();
        }

      },
      error => {
      //   //console.log(error);
        this.openDialogError(error);
        throw error;

      }


    )
  }

  copyFileToPrint(str:Structure){
    this.homeService.copyFileToPrint(str).subscribe(
      (data) => {
      
        if(data!=null){
        console.log(data);
        }else{
         //this.openDialog();
        }
       
       

      },
      error => {
       console.log(error);
        //this.openDialogError(error);
        throw error;

      }
    )
  }

  deleteZip(currentStructure:Structure){
    this.homeService.deleteZip(currentStructure).subscribe(
      (data) => {
      
        if(data!=null){
        //console.log(data);
        }else{
         //this.openDialog();
        }
       
       

      },
      error => {
       console.log(error);
        //this.openDialogError(error);
        throw error;

      }
    )
  }

  showAlert(title:String,msg:String) {
      mobiscroll.alert({
        title: title,
        message: msg
        /* ,callback: function () {
          window.location.reload();
         }*/
      });
    
   
  }


  //----------------------------------------------------------------Suspendre/activer Structure-----------------------------------------------------------------------
  suspendreStructure(structure:Structure){
    let etat=structure.isactif;
    
    structure.isactif=0;
    this.homeService.suspendreStructure(structure).subscribe(

      (data) => {
      
       //  //console.log(data);
        if(data!=null){
          
          this.showAlert("Suspension Structure","La structure a bien été suspendue");
        }else{
          
          structure.isactif=etat;
          this.openDialog();
        }

      },
      error => {
       //  //console.log(error);
        this.openDialogError(error);
        throw error;

      }



    )
  }



  activerStructure(structure:Structure){
    let etat=structure.isactif;
    
    structure.isactif=1;
    
    this.homeService.activerStructure(structure).subscribe(

      (data) => {
      
      //console.log(data);
        if(data!=null){
          
          this.showAlert("Activation Structure","La structure a bien été activée");
        }else{
          
          structure.isactif=etat;
          this.openDialog();
        }

      },
      error => {
     //    //console.log(error);
        this.openDialogError(error);
        throw error;

      }



    )
  }
  
    //----------------------------------------------------------------générer etats-----------------------------------------------------------------------
    genererEtats(structure:Structure,state:number){
     
      
      //console.log(this.showProgress)
      this.codeStructure=[];
     if(structure.structurecodelike.includes("/")){
       this.codeStructure=structure.structurecodelike.split("/");
       
     }else{
        this.codeStructure.push(structure.structurecodelike);
     }
     // //console.log(this.codeStructure);
     if(this.allEtatJournal.length==0||this.allEtatMand.length==0||this.allEtatMip.length==0||this.allEtatRecap.length==0||this.allEtatRet.length==0){
        this.showConfirm();
      
     }else{
        this.filtrerEtats(this.codeStructure,structure,state);
     }
    }
      
    showAlertInit(title:String,msg:String) {
      mobiscroll.alert({
        title: title,
        message: msg
      });
    
  }

  showConfirm() {
 
    mobiscroll.confirm({
      title: "Chargement des données",
      message: "Aucune donnée n'est chargée! Voulez vous charger les données?",
      okText: 'Charger',
      cancelText: 'Annuler'
    
  }).then( (result) => {
    // //console.log(result ? 'Agreed.' : 'Disagreed.');
    if(result){
     this.chargerDonnees();
    }
  }); 
  
  }
   
    filtrerEtats(codeLike:string[],str:Structure,state:number){
      if(state==1){
        this.showProgress=true;
      }else{
        this.showProgressAllEtat=true;
      }
      
      this.filteredEtatJournal=[];
      this.filteredEtatMand=[];
      this.filteredEtatMip=[];
      this.filteredEtatRecap=[];
      this.filteredEtatRet=[];
      this.codeNotLike=[];
      if(str.structurecodenotlike!="0"){
         this.codeNotLike=str.structurecodenotlike.split("/");
       // //console.log(this.codeNotLike);
      }
      //filtrer journal
      for(let i=0;i<this.allEtatJournal.length;i++){
        
        if(codeLike.length==1){
          if(this.allEtatJournal[i].cstr.startsWith(codeLike[0])){
            this.filteredEtatJournal.push(this.allEtatJournal[i]);
          }
        }else{
          for(let j=0;j<codeLike.length;j++){
            if(this.allEtatJournal[i].cstr.startsWith(codeLike[j])){
              this.filteredEtatJournal.push(this.allEtatJournal[i]);
            }
          }
        }

       
      }
    //   //console.log(this.filteredEtatJournal);
    this.uploadedFiles[0].progress=25;
    if(str.structurecodenotlike!="0"){
      this.filteredEtatJournal=this.isExistCodeNotLike(this.filteredEtatJournal,this.codeNotLike)
      
      // //console.log(this.isExistCodeNotLike(this.filteredEtatJournal,this.codeNotLike));
    }
    // //console.log(this.filteredEtatJournal)
    this.uploadedFiles[0].progress=50;
      //filtrer mand
      for(let i=0;i<this.allEtatMand.length;i++){
        if(codeLike.length==1){
          if(this.allEtatMand[i].dir.startsWith(codeLike[0])){
            this.filteredEtatMand.push(this.allEtatMand[i]);
          }
        }else{
          for(let j=0;j<codeLike.length;j++){
            if(this.allEtatMand[i].dir.startsWith(codeLike[j])){
              this.filteredEtatMand.push(this.allEtatMand[i]);
            }
          }
        }
      }
      this.uploadedFiles[1].progress=25;
      if(str.structurecodenotlike!="0"){
     //  //console.log(this.filteredEtatMand);
      this.filteredEtatMand=this.isExistCodeNotLike(this.filteredEtatMand,this.codeNotLike)
      // //console.log(this.isExistCodeNotLike(this.filteredEtatJournal,this.codeNotLike));
      }
     //  //console.log(this.filteredEtatMand)
     this.uploadedFiles[1].progress=50;
      //filtrer mip
      for(let i=0;i<this.allEtatMip.length;i++){
        if(codeLike.length==1){
          if(this.allEtatMip[i].dir.startsWith(codeLike[0])){
            this.filteredEtatMip.push(this.allEtatMip[i]);
          }
        }else{
          for(let j=0;j<codeLike.length;j++){
            if(this.allEtatMip[i].dir.startsWith(codeLike[j])){
              this.filteredEtatMip.push(this.allEtatMip[i]);
            }
          }
        }
      }
      this.uploadedFiles[2].progress=25;
      if(str.structurecodenotlike!="0"){
     //  //console.log(this.filteredEtatMip);
      this.filteredEtatMip=this.isExistCodeNotLike(this.filteredEtatMip,this.codeNotLike)
      // //console.log(this.isExistCodeNotLike(this.filteredEtatJournal,this.codeNotLike));
      }
     //  //console.log(this.filteredEtatMip)
     this.uploadedFiles[2].progress=50;
      //filtrer recap
     
      for(let i=0;i<this.allEtatRecap.length;i++){
        if(codeLike.length==1){
    
        if(this.allEtatRecap[i].dir.startsWith(codeLike[0])){
          this.filteredEtatRecap.push(this.allEtatRecap[i]);
        }
      
          
        }else{
          for(let j=0;j<codeLike.length;j++){
            if(this.allEtatRecap[i].dir.startsWith(codeLike[j])){
              this.filteredEtatRecap.push(this.allEtatRecap[i]);
            }
          }
        }
      }
      this.uploadedFiles[4].progress=25;
      if(str.structurecodenotlike!="0"){
     //  //console.log(this.filteredEtatRecap);
      this.filteredEtatRecap=this.isExistCodeNotLike(this.filteredEtatRecap,this.codeNotLike)
      // //console.log(this.isExistCodeNotLike(this.filteredEtatJournal,this.codeNotLike));
      }
     //  //console.log(this.filteredEtatRecap)
     this.uploadedFiles[4].progress=50;
      //filter ret
      for(let i=0;i<this.allEtatRet.length;i++){
        if(codeLike.length==1){
          if(this.allEtatRet[i].dir.startsWith(codeLike[0])){
            this.filteredEtatRet.push(this.allEtatRet[i]);
          }
        }else{
          for(let j=0;j<codeLike.length;j++){
            if(this.allEtatRet[i].dir.startsWith(codeLike[j])){
              this.filteredEtatRet.push(this.allEtatRet[i]);

            }
          }
        }
      }
      this.uploadedFiles[3].progress=25;
      if(str.structurecodenotlike!="0"){
      // //console.log(this.filteredEtatRet);
      this.filteredEtatRet=this.isExistCodeNotLike(this.filteredEtatRet,this.codeNotLike)
      // //console.log(this.isExistCodeNotLike(this.filteredEtatJournal,this.codeNotLike));
      }
    //   //console.log(this.filteredEtatRet)
    this.uploadedFiles[3].progress=50;
      this.generateEtatFiles(str,state);
     
    }
    isExistCodeNotLike(etatArray:any,codeNotLike:string[]){
      let test: any[]=[];
      if(codeNotLike.length==1){
        for(let i=0;i< etatArray.length;i++){
          if(etatArray[i].dir.startsWith(codeNotLike[0])){
            
            test.push(etatArray[i])
          }
        }
      }else{
        for(let i=0;i< etatArray.length;i++){
        for(let j=0;j<codeNotLike.length;j++){
          
         
            if(etatArray[i].dir.startsWith(codeNotLike[j])){
             
              test.push(etatArray[i])

            }
            
          }
        }
      }
      // //console.log(test)
      etatArray=etatArray.filter( ( el:any ) => !test.includes( el ) );
      return etatArray;
    }
  generateEtatFiles(structure:Structure,state:number){
   //  //console.log("generation des fichiers")
   this.uploadedFiles[1].progress=75;
    this.homeService.generateMand(this.filteredEtatMand,structure.structurename).subscribe(
      (data) => {
      
        // //console.log("mand")
        // //console.log(data);
        if(data!=null){
          let efile:Efile={
            "idfile":0,
            "filename":"MAND",
            "filegenerationdate":new Date(),
            "idfiletype":0,
            "idpaymonth":0,
            "idstructure":structure.idstructure,
            "iduser":this.currentUser.iduser,
            "validatedflag":1
          }
          this.efiles.push(efile);
          this.mand=true;
      this.uploadedFiles[1].progress=100;
        this.saveGeneratedFilesInDB(structure,state);
          //this.showAlert("Activation Structure","La structure a bien été activée");
        }else{
          
          
          this.openDialog();
        }

      },
      error => {
       //  //console.log(error);
        this.openDialogError(error);
        throw error;

      }
    );
    this.uploadedFiles[0].progress=75;
   this.homeService.generateJournal(this.filteredEtatJournal,structure.structurename).subscribe(
      (data) => {
        // //console.log("jour")
        // //console.log(data);
        if(data!=null){
          let efile:Efile={
            "idfile":0,
            "filename":"JOUR",
            "filegenerationdate":new Date(),
            "idfiletype":0,
            "idpaymonth":0,
            "idstructure":structure.idstructure,
            "iduser":this.currentUser.iduser,
            "validatedflag":1
          }
          this.efiles.push(efile);
          this.jour=true;
          this.uploadedFiles[0].progress=100;
          this.saveGeneratedFilesInDB(structure,state);
          //this.showAlert("Activation Structure","La structure a bien été activée");
        }else{
          
          
          this.openDialog();
        }

      },
      error => {
       //  //console.log(error);
        this.openDialogError(error);
        throw error;

      }
    );
    this.uploadedFiles[2].progress=75;
    this.homeService.generateMip(this.filteredEtatMip,structure.structurename).subscribe(
      (data) => {
      
       //  //console.log("mip")
      //   //console.log(data);
        if(data!=null){
          let efile:Efile={
            "idfile":0,
            "filename":"MIP",
            "filegenerationdate":new Date(),
            "idfiletype":0,
            "idpaymonth":0,
            "idstructure":structure.idstructure,
            "iduser":this.currentUser.iduser,
            "validatedflag":1
          }
          this.efiles.push(efile);
          this.mip=true;
          this.uploadedFiles[2].progress=100;
          this.saveGeneratedFilesInDB(structure,state);
          //this.showAlert("Activation Structure","La structure a bien été activée");
        }else{
          
          
          this.openDialog();
        }

      },
      error => {
      //   //console.log(error);
        this.openDialogError(error);
        throw error;

      }
    );
    this.uploadedFiles[3].progress=75;
    this.homeService.generateRet(this.filteredEtatRet,structure.structurename).subscribe(
      (data) => {
      
        // //console.log("ret")
      //   //console.log(data);
        if(data!=null){
          let efile:Efile={
            "idfile":0,
            "filename":"RET",
            "filegenerationdate":new Date(),
            "idfiletype":0,
            "idpaymonth":0,
            "idstructure":structure.idstructure,
            "iduser":this.currentUser.iduser,
            "validatedflag":1
          }
          this.efiles.push(efile);
          this.ret=true;
          this.uploadedFiles[3].progress=100;
          this.saveGeneratedFilesInDB(structure,state);
          //this.showAlert("Activation Structure","La structure a bien été activée");
        }else{
          
          
          this.openDialog();
        }

      },
      error => {
      //   //console.log(error);
        this.openDialogError(error);
        throw error;

      }
    );
    this.uploadedFiles[4].progress=75;
    this.homeService.generateRecap(this.filteredEtatRecap,structure.structurename).subscribe(
      (data) => {
      
      //   //console.log("recap")
      //  //console.log(data);
        if(data!=null){
          let efile:Efile={
            "idfile":0,
            "filename":"REC",
            "filegenerationdate":new Date(),
            "idfiletype":0,
            "idpaymonth":0,
            "idstructure":structure.idstructure,
            "iduser":this.currentUser.iduser,
            "validatedflag":1
          }
          this.efiles.push(efile);
          this.recap=true;
          this.uploadedFiles[4].progress=100;
          this.saveGeneratedFilesInDB(structure,state);
          //this.showAlert("Activation Structure","La structure a bien été activée");
        }else{
          
          
          this.openDialog();
        }

      },
      error => {
        // //console.log(error);
        this.openDialogError(error);
        throw error;

      }
    );
    
  }

  //********************************************SaveGeneratedFilesInDB************************************************************************************************* */
saveGeneratedFilesInDB(structure:Structure,state:number){
if(this.jour&&this.mip&&this.mand&&this.ret&&this.recap){
 
this.homeService.saveGeneratedFiles(this.efiles).subscribe(
  (data) => {
      
    // //console.log("save generated files in db")
   //  //console.log(data);
    if(data!=null){
      
      this.updateStatusStructure(structure,state);
      
      //this.showAlert("Activation Structure","La structure a bien été activée");
    }else{
      
      
      this.openDialog();
    }

  },
  error => {
   //  //console.log(error);
    this.openDialogError(error);
    throw error;

  }
);
}

}

updateStatusStructure(structure:Structure,state:number){
  structure.statusstructure=4;
  structure.isactif=0;
  structure.flagetat=1;
  this.homeService.updateStructureFilesGenerated(structure).subscribe(
    (data) => {
      
     //  //console.log("updateStatusStructure")
     //  //console.log(data);
      if(data!=null){
        if(state==1){
          this.showProgress=false;
        
          this.showAlertGeneration("Génération etats paie","Les etats ont bien été générés.");
        }else{
          this.jour=false;
      this.mip=false;
      this.mand=false;
      this.ret=false;
      this.recap=false;
      this.indexE++;
      if(this.indexE<this.ELEMENT_DATA.length){
        this.genererToutLesEtats(this.indexE);
      }else{
        this.indexE=0;
        this.showProgressAllEtat=false;
        this.showAlert("Génération de tout les états paie","Les états de toutes les structures ont bien été générés.");
      }
     
        }
        
      }else{
        
        
        this.openDialog();
      }
  
    },
    error => {
      // //console.log(error);
      this.openDialogError(error);
      throw error;
  
    }
  );
}


//************************************************************Générer les fichiers (newpaie,pers,frub)***************************************************** */
genererFichiers(structure:Structure,state:number){
  if(state==1){
    this.showProgressFichier=true;
    this.uploadedFichiers[0].progress=10;
    this.uploadedFichiers[1].progress=10;
    this.uploadedFichiers[2].progress=10;
  }else{
    this.showProgressAllFichier=true;
  }
 
  this.codeStructure=[];
  this.efichiers=[];

  if(structure.structurecodelike.includes("/")){
    this.codeStructure=structure.structurecodelike.split("/");
    
  }else{
     this.codeStructure.push(structure.structurecodelike);
  }
 // console.log(this.codeStructure)
  if(this.codeStructure.map(s => (/^[a-z].*/i.test(s))).includes(true)){
    //console.log("alph")
    this.homeService.generateFrubAStr(structure).subscribe(
      (data) => {
      
        //  //console.log("updateStatusStructure")
        //  //console.log(data);
         if(data!=null){
         // console.log(data)
          let efile:Efile={
            "idfile":0,
            "filename":"FRUBALPH",
            "filegenerationdate":new Date(),
            "idfiletype":0,
            "idpaymonth":0,
            "idstructure":structure.idstructure,
            "iduser":this.currentUser.iduser,
            "validatedflag":1
          }
          this.efichiers.push(efile);
          this.frub=true;
          this.uploadedFichiers[2].progress=50;
          this.saveGeneratedFichiersInDB(structure,state)
         }else{
           
           
           this.openDialog();
         }
     
       },
       error => {
         // //console.log(error);
         this.openDialogError(error);
         throw error;
     
       }
    )
  }else{
    this.homeService.generateFrubNStr(structure).subscribe(
      (data) => {
      
      //console.log(data);
         if(data!=null){
          let efile:Efile={
            "idfile":0,
            "filename":"FRUBNUM",
            "filegenerationdate":new Date(),
            "idfiletype":0,
            "idpaymonth":0,
            "idstructure":structure.idstructure,
            "iduser":this.currentUser.iduser,
            "validatedflag":1
          }
          this.efichiers.push(efile);
          this.frub=true;
          this.uploadedFichiers[2].progress=50;
          this.saveGeneratedFichiersInDB(structure,state)
         }else{
           
           
           this.openDialog();
         }
     
       },
       error => {
         // //console.log(error);
         this.openDialogError(error);
         throw error;
     
       }
    )
  }

  this.homeService.generateNewPaieStr(structure).subscribe(
    (data) => {
      
     // console.log(data);
         if(data!=null){
          let efile:Efile={
            "idfile":0,
            "filename":"NEWPAIE",
            "filegenerationdate":new Date(),
            "idfiletype":0,
            "idpaymonth":0,
            "idstructure":structure.idstructure,
            "iduser":this.currentUser.iduser,
            "validatedflag":1
          }
          this.efichiers.push(efile);
           this.newpaie=true;
          this.uploadedFichiers[0].progress=50;
          this.saveGeneratedFichiersInDB(structure,state)
         }else{
           
           
           this.openDialog();
         }
     
       },
       error => {
         // //console.log(error);
         this.openDialogError(error);
         throw error;
     
       }
  )
  this.homeService.generatePersStr(structure).subscribe(
    (data) => {
      
     // console.log(data);
         if(data!=null){
          let efile:Efile={
            "idfile":0,
            "filename":"PERS",
            "filegenerationdate":new Date(),
            "idfiletype":0,
            "idpaymonth":0,
            "idstructure":structure.idstructure,
            "iduser":this.currentUser.iduser,
            "validatedflag":1
          }
          this.efichiers.push(efile);
           this.pers=true;
          this.uploadedFichiers[1].progress=50;
          this.saveGeneratedFichiersInDB(structure,state)
         }else{
           
           
           this.openDialog();
         }
     
       },
       error => {
         // //console.log(error);
         this.openDialogError(error);
         throw error;
     
       }
  )

}


/********************************************SaveGeneratedFilesInDB************************************************************************************************* */
saveGeneratedFichiersInDB(structure:Structure,state:number){
  
  if(this.frub&&this.newpaie&&this.pers){
    if(state==1){
      this.uploadedFichiers[0].progress=80;
      this.uploadedFichiers[1].progress=80;
      this.uploadedFichiers[2].progress=80;
  
    }
   
  this.homeService.saveGeneratedFiles(this.efichiers).subscribe(
    (data) => {
        
      // //console.log("save generated files in db")
     //  //console.log(data);
      if(data!=null){
        
        this.updateStatusStructureFichier(structure,state);
        
        //this.showAlert("Activation Structure","La structure a bien été activée");
      }else{
        
        
        this.openDialog();
      }
  
    },
    error => {
     //  //console.log(error);
      this.openDialogError(error);
      throw error;
  
    }
  );
  }
  
  }
  
  updateStatusStructureFichier(structure:Structure,state:number){
   
    if(state==1){
      this.uploadedFichiers[0].progress=100;
      this.uploadedFichiers[1].progress=100;
      this.uploadedFichiers[2].progress=100;
    }

    structure.statusstructure=5;
          structure.isactif=0;
          structure.flagfichier=1;
    this.homeService.updateStructureFilesGenerated(structure).subscribe(
      (data) => {
        
       //  //console.log("updateStatusStructure")
       //  //console.log(data);
        if(data!=null){
          if(state==1){
            this.showProgressFichier=false;
         
            this.showAlertGenerationFichiers("Génération fichiers paie","Les fichiers ont bien été générés.");
          }else{
            
            
            this.index++;
            this.newpaie=false;
            this.pers=false;
            this.frub=false;
            if(this.index<this.ELEMENT_DATA.length){
              this.genererToutLesFichiers(this.index);
            }else{
              this.index=0;
              this.showProgressAllFichier=false;
              this.showAlert("Génération de tout les fichiers","Les fichiers de toutes les structures ont bien été générés.");
            }
           
          }
          
        }else{
          
          

          this.openDialog();
        }
    
      },
      error => {
        // //console.log(error);
        this.openDialogError(error);
        throw error;
    
      }
    );
  }

  //******************************************************Activer/suspendre All*************************************************************************** */
  activerAll(){
  
    this.homeService.activerAll().subscribe(
      (data) => {
         if(data!=null){
           
           for(let i=0;i<this.ELEMENT_DATA.length;i++){
             this.ELEMENT_DATA[i].isactif=1;
           }
         }else{
           
           
           this.openDialog();
         }
     
       },
       error => {
      //console.log(error);
         this.openDialogError(error);
         throw error;
     
       }
    )
  }
  suspendreAll(){
    this.homeService.suspendreAll().subscribe(
      (data) => {
        if(data!=null){
          
          for(let i=0;i<this.ELEMENT_DATA.length;i++){
            this.ELEMENT_DATA[i].isactif=0;
          }
        }else{
          
          
          this.openDialog();
        }
    
      },
      error => {
     //console.log(error);
        this.openDialogError(error);
        throw error;
    
      }
    )
  }

  //******************************************************Generer tout les fichiers/etats pour toutes les structures******************************************** */
  genererToutLesFichiers(position:number){
    
    this.generatedStructure=this.ELEMENT_DATA[position].structurename;
      this.genererFichiers(this.ELEMENT_DATA[position],2);
    
  }

  genererToutLesEtats(position:number){
    
      this.generatedStructureE=this.ELEMENT_DATA[position].structurename;
      this.genererEtats(this.ELEMENT_DATA[position],2);

  }
  //****************************************************POUR LA RECHERCHE ET LES ERRURS ****************************************************************** */
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

  openDialogError(error:String): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '650px',
      data: {message: error}
    });

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }
  showAlertGeneration(title:String,msg:String) {
    if(this.jour&&this.mip&&this.mand&&this.ret&&this.recap){
      this.jour=false;
      this.mip=false;
      this.mand=false;
      this.ret=false;
      this.recap=false;
      mobiscroll.alert({
        title: title,
        message: msg
        /* ,callback: function () {
          window.location.reload();
         }*/
      });
    }
  
  
  
}
showAlertGenerationFichiers(title:String,msg:String) {
  if(this.newpaie&&this.pers&&this.frub){
    this.newpaie=false;
    this.pers=false;
    this.frub=false;
    
    mobiscroll.alert({
      title: title,
      message: msg
      /* ,callback: function () {
        window.location.reload();
       }*/
    });
  }

}
}


