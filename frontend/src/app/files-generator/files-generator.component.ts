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

  showSpinner: Boolean = true;
  mailRequest:MailRequest={"from":"","msg":"","sturcturename":"","subject":"","to":[],"filesName":[]};
  currentUser:User={"email":"","iduser":0,"name":"","password":"","state":0,"username":""};
  email:EmailDB={"emailgenerationdate":new Date(),"emailobject":"","idemail":0,"iduser":0,"msg":"","receiver":"","sender":""};
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
  mand:Boolean=false;
  jour:Boolean=false;
  ret:Boolean=false;
  recap:Boolean=false;
  mip:Boolean=false;
  count:number=0;
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

    //get all etat paie filtered by paymonth
      this.homeService.getEtatJournal().subscribe(
        (data) => {
          if(data!=null){
           console.log(data);
            this.allEtatJournal=data;
            
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
         console.log(data);
            this.allEtatMand=data;
            
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
         console.log(data);
            this.allEtatMip=data;
            
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
           
            this.allEtatRecap=data;
          console.log(this.allEtatRecap);
            this.showSpinner=false;
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
          console.log(data);
            this.allEtatRet=data;
           
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

//---------------------------------------------------------------------SEND EMAIL----------------------------------------------------------------------------------------------
  sendEmail(structure:Structure){
    this.showSpinner=true;
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
          currentStructure.statusstructure=0;
          this.showSpinner=false;
          this.showAlert("Envoie Email","L'email a bien été envoyé aux gestionnaires");
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
    let etat=structure.statusstructure;
    structure.statusstructure=2;
    this.homeService.suspendreStructure(structure).subscribe(

      (data) => {
      
       //  //console.log(data);
        if(data!=null){
          
          this.showAlert("Suspension Structure","La structure a bien été suspendue");
        }else{
          
          structure.statusstructure=etat;
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
    let etat=structure.statusstructure;
    structure.statusstructure=1;
    this.homeService.suspendreStructure(structure).subscribe(

      (data) => {
      
      //   //console.log(data);
        if(data!=null){
          
          this.showAlert("Activation Structure","La structure a bien été activée");
        }else{
          
          structure.statusstructure=etat;
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
  
    //----------------------------------------------------------------générer fichiers-----------------------------------------------------------------------
    genererFichier(structure:Structure){
      this.showSpinner=true;
      this.codeStructure=[];
     if(structure.structurecodelike.includes("/")){
       this.codeStructure=structure.structurecodelike.split("/");
       
     }else{
        this.codeStructure.push(structure.structurecodelike);
     }
     // //console.log(this.codeStructure);
     if(this.allEtatJournal.length==0||this.allEtatMand.length==0||this.allEtatMip.length==0||this.allEtatRecap.length==0||this.allEtatRet.length==0){
        this.showAlertInit("Initialisation des données","Veuillez patienter un petit moment s'il vous plait pour générer les fichiers");
        //this.filtrerEtats(this.codeStructure,structure);
     }else{
        this.filtrerEtats(this.codeStructure,structure);
     }
    }
      
    showAlertInit(title:String,msg:String) {
      mobiscroll.alert({
        title: title,
        message: msg
      });
    
  }

   
    filtrerEtats(codeLike:string[],str:Structure){
      this.filteredEtatJournal=[];
      this.filteredEtatMand=[];
      this.filteredEtatMip=[];
      this.filteredEtatRecap=[];
      this.filteredEtatRet=[];
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
    if(str.structurecodenotlike!="0"){
      this.filteredEtatJournal=this.isExistCodeNotLike(this.filteredEtatJournal,this.codeNotLike)
      
      // //console.log(this.isExistCodeNotLike(this.filteredEtatJournal,this.codeNotLike));
    }
    // //console.log(this.filteredEtatJournal)
     
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
      if(str.structurecodenotlike!="0"){
     //  //console.log(this.filteredEtatMand);
      this.filteredEtatMand=this.isExistCodeNotLike(this.filteredEtatMand,this.codeNotLike)
      // //console.log(this.isExistCodeNotLike(this.filteredEtatJournal,this.codeNotLike));
      }
     //  //console.log(this.filteredEtatMand)

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
      if(str.structurecodenotlike!="0"){
     //  //console.log(this.filteredEtatMip);
      this.filteredEtatMip=this.isExistCodeNotLike(this.filteredEtatMip,this.codeNotLike)
      // //console.log(this.isExistCodeNotLike(this.filteredEtatJournal,this.codeNotLike));
      }
     //  //console.log(this.filteredEtatMip)

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
      if(str.structurecodenotlike!="0"){
     //  //console.log(this.filteredEtatRecap);
      this.filteredEtatRecap=this.isExistCodeNotLike(this.filteredEtatRecap,this.codeNotLike)
      // //console.log(this.isExistCodeNotLike(this.filteredEtatJournal,this.codeNotLike));
      }
     //  //console.log(this.filteredEtatRecap)

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
      if(str.structurecodenotlike!="0"){
      // //console.log(this.filteredEtatRet);
      this.filteredEtatRet=this.isExistCodeNotLike(this.filteredEtatRet,this.codeNotLike)
      // //console.log(this.isExistCodeNotLike(this.filteredEtatJournal,this.codeNotLike));
      }
    //   //console.log(this.filteredEtatRet)
      this.generateEtatFiles(str);
     
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
  generateEtatFiles(structure:Structure){
   //  //console.log("generation des fichiers")
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
        this.saveGeneratedFilesInDB(structure);
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
          this.saveGeneratedFilesInDB(structure);
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
          this.saveGeneratedFilesInDB(structure);
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
          this.saveGeneratedFilesInDB(structure);
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
          this.saveGeneratedFilesInDB(structure);
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
saveGeneratedFilesInDB(structure:Structure){
if(this.jour&&this.mip&&this.mand&&this.ret&&this.recap){
this.homeService.saveGeneratedFiles(this.efiles).subscribe(
  (data) => {
      
    // //console.log("save generated files in db")
   //  //console.log(data);
    if(data!=null){
      
      this.updateStatusStructure(structure);
      
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

updateStatusStructure(structure:Structure){
  this.homeService.updateStructureFilesGenerated(structure).subscribe(
    (data) => {
      
     //  //console.log("updateStatusStructure")
     //  //console.log(data);
      if(data!=null){
        structure.statusstructure=1;
        this.showSpinner=false;
        this.showAlertGeneration("Génération etats paie","Les etats ont bien été généré.");
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


