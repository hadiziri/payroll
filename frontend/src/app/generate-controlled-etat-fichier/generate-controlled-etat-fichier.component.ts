import { ErrorDialogComponent } from './../error-dialog/error-dialog.component';
import { AlertDialogComponent } from './../alert-dialog/alert-dialog.component';
import { SendEtatFichierService } from './../Services/send-etat-fichier.service';
import { Structure } from './../Models/Structure';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ParametreService } from './../Services/parametre.service';
import { TokenStorageService } from './../auth/token-storage.service';
import { HomeService } from './../Services/home.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { clotureFiles } from './../Models/cloturesFiles';
import { Component, OnInit, Inject } from '@angular/core';
import { mobiscroll, MbscFormOptions } from '@mobiscroll/angular-lite';
export interface FileDetails {
  
  name: String;

  generated: String;
  
}
@Component({
  selector: 'app-generate-controlled-etat-fichier',
  templateUrl: './generate-controlled-etat-fichier.component.html',
  styleUrls: ['./generate-controlled-etat-fichier.component.css']
})
export class GenerateControlledEtatFichierComponent implements OnInit {
  tousLesEtats: clotureFiles[] = [];
  tousLesFichiers : clotureFiles[] = [];
  codeStructure:string[]=[];
  selectedFiles:Boolean[]=[];
 
  tempFichiers:clotureFiles[]=[];
  currentStructure:Structure={
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
  showSpinner: Boolean = false;
  formSettings: MbscFormOptions = {
    theme: 'mobiscroll',
    themeVariant: 'light'
  };
  constructor(
    private homeService:HomeService, 
    private token: TokenStorageService, 
    private paramService:ParametreService,
    private sendEtatFichierService:SendEtatFichierService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<GenerateControlledEtatFichierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
     
      //console.log(data)
     
      this.currentStructure=data.structure
      
      //console.log(this.selectedPaieMonth)
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    

    //get all Fichiers
    this.sendEtatFichierService.getAllFichiers().subscribe(
      (data) => {
        if(data!=null){
          for(let i=0;i<data.length;i++){
            if(data[i].prefixfiletype!="FRUBNUM" ){
              if(data[i].prefixfiletype=="FRUBALPH"){
                data[i].prefixfiletype="FRUB";
                this.tousLesFichiers.push(data[i]);
              }else{
                this.tousLesFichiers.push(data[i]);
              }
              
            }
           
          }
        //  this.tousLesFichiers = data;
         
         //console.log(data);
        }else{
          this.openDialog();
        }
       
      },
      error => {
        // //console.log(error);
         this.openDialogError(error);;
        throw error;
      });
  }



  
//******************************************************************FICHIERS********************************************************************************************* */
    //check if etat is checked or not
    ischekedindexF(file:clotureFiles){
   
      return this.tempFichiers.indexOf(file);
    
    
  }

  //update list of checked etats
  updateCheckedFichier(file:clotureFiles){
    // console.log(file)
    
    if(this.tempFichiers.length>0){
      let index=this.ischekedindexF(file);
      if(index!=-1){
        this.tempFichiers.splice(index,1);
      }else{
        this.tempFichiers.push(file);
      }
    }else{
      this.tempFichiers.push(file);
    }
    
     //console.log(this.tempFichiers)
  }
  genererFichier(){
    this.showSpinner=true;
    this.selectedFiles=[];
    this.codeStructure=[];


  if(this.currentStructure.structurecodelike.includes("/")){
    this.codeStructure=this.currentStructure.structurecodelike.split("/");
    
  }else{
     this.codeStructure.push(this.currentStructure.structurecodelike);
  }
 // console.log(this.codeStructure)
    //console.log(this.selectedFiles)
    for(let i=0;i<this.tempFichiers.length;i++){
      if(this.tempFichiers[i].prefixfiletype=="PERS"){
        this.homeService.generatePersStr(this.currentStructure).subscribe(
          (data) => {
            
           // console.log(data);
               if(data!=null){
                this.selectedFiles.push(true);
                  this.showAlert();
                
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
        if(this.tempFichiers[i].prefixfiletype=="NEWPAIE"){
          this.homeService.generateNewPaieStr(this.currentStructure).subscribe(
            (data) => {
              
             // console.log(data);
                 if(data!=null){
                  this.selectedFiles.push(true);
                    this.showAlert();
                  
                  
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
          if(this.codeStructure.map(s => (/^[a-z].*/i.test(s))).includes(true)){
            //console.log("alph")
            this.homeService.generateFrubAStr(this.currentStructure).subscribe(
              (data) => {
              
                 if(data!=null){
                  this.selectedFiles.push(true);
                    this.showAlert();
                  
               
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
            //FRUBNUM
            this.homeService.generateFrubNStr(this.currentStructure).subscribe(
              (data) => {
              
              //console.log(data);
                 if(data!=null){
                  this.selectedFiles.push(true);
                    this.showAlert();
                  
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
        }
      }
    }
  }

 

  showAlert() {
   

    if(this.tempFichiers.length==this.selectedFiles.length){
      this.onNoClick()
      this.showSpinner=false;
      mobiscroll.alert({
        title: "Génération Fichiers",
        message: "Les fichiers sélectionnés ont bien été générés"
         ,callback: function () {
          window.location.reload();
         }
      });
    }
      
    
  
  }

//****************************************ERRORS***************************************************************** */
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
}
