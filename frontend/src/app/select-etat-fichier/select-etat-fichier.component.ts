import { HomeService } from './../Services/home.service';
import { TokenStorageService } from './../auth/token-storage.service';
import { User } from './../Models/User';
import { MailRequest } from './../Models/MailRequest';
import { SendEtatFichierService } from './../Services/send-etat-fichier.service';
import { Structure } from './../Models/Structure';
import { clotureFiles } from './../Models/cloturesFiles';
import { ErrorDialogComponent } from './../error-dialog/error-dialog.component';
import { AlertDialogComponent } from './../alert-dialog/alert-dialog.component';
import { ParametreService } from './../Services/parametre.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {  mobiscroll,MbscFormOptions } from '@mobiscroll/angular-lite';
@Component({
  selector: 'app-select-etat-fichier',
  templateUrl: './select-etat-fichier.component.html',
  styleUrls: ['./select-etat-fichier.component.css']
})
export class SelectEtatFichierComponent implements OnInit {
  tousLesEtats: clotureFiles[] = [];
  tousLesFichiers : clotureFiles[] = [];
  state:number= 0;
  showSpinner: Boolean = false;
  tempEtatFiles:clotureFiles[]=[];
  tempFichiers:clotureFiles[]=[];
  mailRequest:MailRequest={
    "from":"",
    "msg":"Veuillez trouver ci-attaché les états paie demandés.",
    "sturcturename":"",
    "subject":"états paie",
    "to":[],
    "filesName":[]};
  currentUser:User={"email":"","iduser":0,"name":"","password":"","state":0,"username":""};
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
  selectedPaieMonth:String[]=[];
  
  formGroup: FormGroup = new FormGroup({});
  constructor(
    private homeService:HomeService, 
    private token: TokenStorageService, 
    private sendEtatFichierService:SendEtatFichierService,
    private paramService:ParametreService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SelectEtatFichierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.formGroup = new FormGroup({
        path: new FormControl('', [Validators.required])
      });
      //console.log(data)
      this.state=data.state;
      this.currentStructure=data.structure
      this.selectedPaieMonth=data.selectedMonths;
      //console.log(this.selectedPaieMonth)
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
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

    //get all etats
    this.paramService.getEtats().subscribe(
      (data) => {
        if(data!=null){
          this.tousLesEtats = data;
         
         //console.log(data);
        }else{
          this.openDialog();
        }
       
      },
      error => {
        // //console.log(error);
         this.openDialogError(error);;
        throw error;
      }
    );

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
         
         //console.log(data);
        }else{
          this.openDialog();
        }
       
      },
      error => {
        // //console.log(error);
         this.openDialogError(error);;
        throw error;
      }
    );
  }
//******************************************************************ETATS********************************************************************************************* */
    //check if etat is checked or not
    ischekedindexE(file:clotureFiles){
   
      return this.tempEtatFiles.indexOf(file);
    
    
  }

  //update list of checked etats
  updateCheckedEtats(file:clotureFiles){
     //console.log(file)
     
    if(this.tempEtatFiles.length>0){
      let index=this.ischekedindexE(file);
      if(index!=-1){
        this.tempEtatFiles.splice(index,1);
      }else{
        this.tempEtatFiles.push(file);
      }
    }else{
      this.tempEtatFiles.push(file);
    }
    
     //console.log(this.tempEtatFiles)
  }

  sendEtats(){
   // console.log("sending E")
    this.showSpinner=true;
    let currentDate=this.token.getCurrentMonth().split("/");
    let currentYear=currentDate[1];
    let currentMonth=currentDate[0];
    if(this.selectedPaieMonth.length==1){
      let year:String=this.selectedPaieMonth[0].split("-")[0];
      let month:String=this.selectedPaieMonth[0].split("-")[1];
      /*call api*/
      if(Number(year)<=Number(currentYear)&&Number(month)<=Number(currentMonth)){
          this.sendEmailEtat(year,this.selectedPaieMonth[0]);
      }else{
        this.showAlert( "&#9888;"+"  ATTENTION ","Les états du mois sélectionné ne sont pas encore générés "+this.selectedPaieMonth[0]);
      }
      
    }else{
      for(let i=0;i<this.selectedPaieMonth.length;i++){

        let year:String=this.selectedPaieMonth[i].split("-")[0];
        let month:String=this.selectedPaieMonth[i].split("-")[1];
        /*call api*/
        if(Number(year)<=Number(currentYear)&&Number(month)<=Number(currentMonth)){
          this.sendEmailEtat(year,this.selectedPaieMonth[i]);
        }else{
          this.showAlert( "&#9888;"+"  ATTENTION ","Les états du mois sélectionné ne sont pas encore générés "+this.selectedPaieMonth[i]);
        }
        
        
      }
    }
    
    
   
    
  }

  sendEmailEtat(year:String,paymonth:String){
    this.mailRequest.filesName=[];
    this.mailRequest.to=[];
    for(let i=0;i<this.tempEtatFiles.length;i++){
      let path:String=this.tempEtatFiles[i].folderpath.concat(this.tempEtatFiles[i].foldername.toString()).concat("\\").concat(year.toString()).concat("\\")
      .concat(paymonth.toString()).concat("\\").concat(this.currentStructure.structurename+" "+paymonth.toString()+"\\");
      this.mailRequest.filesName.push(path.toString()+this.tempEtatFiles[i].prefixfiletype+" "+this.currentStructure.structurename+" "+paymonth.toString()+".txt");
    }
    //console.log(this.mailRequest.filesName)
    let zipPath:String=this.tempEtatFiles[0].folderpath.concat(this.tempEtatFiles[0].foldername.toString()).concat("\\").concat(year.toString()).concat("\\")
    .concat(paymonth.toString()).concat("\\").concat(this.currentStructure.structurename+" "+paymonth.toString()+".zip");
    this.mailRequest.to.push(this.currentStructure.emailgroupmanagers);
    this.mailRequest.to.push("DSI-Exploitation_paie@Sonatrach.dz");
    this.mailRequest.to.push("isi-exploitation_paie@sonatrach.dz");
    
    this.mailRequest.from="DSI-Exploitation_paie@Sonatrach.dz";
    this.mailRequest.sturcturename=this.currentStructure.structurename+" "+paymonth.toString()+".zip";
    this.mailRequest.subject="Etats";
    this.mailRequest.msg="Veuillez trouver ci-attaché les états  demandés."
    this.sendEtatFichierService.sendEtats(this.mailRequest,zipPath).subscribe(
      (data) => {
        if(data!=null){
         
        // console.log(data);
         this.homeService.deleteZip(this.currentStructure).subscribe(
          (data) => {
            if(data!=null){
             
              this.dialogRef.close();
             this.showSpinner=false;
             this.showAlert("Envoi états paie","Les états sélectionnés ont bien été envoyés aux gestionnaires")
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
    
    // console.log(this.tempFichiers)
  }

  sendFichier(){
    //console.log("sending f")
    this.showSpinner=true;
    let currentDate=this.token.getCurrentMonth().split("/");
    let currentYear=currentDate[1];
    let currentMonth=currentDate[0];
    if(this.selectedPaieMonth.length==1){
      let year:String=this.selectedPaieMonth[0].split("-")[0];
      let month:String=this.selectedPaieMonth[0].split("-")[1];
      /*call api*/
      if(Number(year)<=Number(currentYear)&&Number(month)<=Number(currentMonth)){
        this.sendEmailFichier(year,this.selectedPaieMonth[0]);
      }else{
        this.showAlert( "&#9888;"+"  ATTENTION ","Les fichiers du mois sélectionné ne sont pas encore générés "+this.selectedPaieMonth[0]);
      }
   
   
     
    }else{
      for(let i=0;i<this.selectedPaieMonth.length;i++){
        let year:String=this.selectedPaieMonth[i].split("-")[0];
        let month:String=this.selectedPaieMonth[i].split("-")[1];
        //console.log(year)
        /*call api*/
        if(Number(year)<=Number(currentYear)&&Number(month)<=Number(currentMonth)){
          this.sendEmailFichier(year,this.selectedPaieMonth[i]);
        }else{
          this.showAlert( "&#9888;"+"  ATTENTION ","Les fichiers du mois sélectionné ne sont pas encore générés "+this.selectedPaieMonth[i]);
        }
               
      }
    }
    
  }
  sendEmailFichier(year:String,paymonth:String){
   
    //console.log(this.tempFichiers.length)
    this.mailRequest.filesName=[];
    this.mailRequest.to=[];
    for(let i=0;i<this.tempFichiers.length;i++){
      console.log(i)
      let path:String=this.tousLesEtats[0].folderpath.concat(this.tousLesEtats[0].foldername.toString()).concat("\\").concat(year.toString()).concat("\\")
      .concat(paymonth.toString()).concat("\\").concat(this.currentStructure.structurename+" "+paymonth.toString()+"\\");
      console.log(path)
      this.mailRequest.filesName.push(path.toString()+this.tempFichiers[i].prefixfiletype+" "+this.currentStructure.structurename+" "+paymonth.toString()+".dbf");
    }
    //console.log(this.mailRequest.filesName)
    let zipPath:String=this.tousLesEtats[0].folderpath.concat(this.tousLesEtats[0].foldername.toString()).concat("\\").concat(year.toString()).concat("\\")
    .concat(paymonth.toString()).concat("\\").concat(this.currentStructure.structurename+" "+paymonth.toString()+".zip");
    this.mailRequest.to.push(this.currentStructure.emailgroupmanagers);
    this.mailRequest.to.push("DSI-Exploitation_paie@Sonatrach.dz");
    this.mailRequest.to.push("isi-exploitation_paie@sonatrach.dz");

    
    this.mailRequest.from="DSI-Exploitation_paie@Sonatrach.dz";
    this.mailRequest.sturcturename=this.currentStructure.structurename+" "+paymonth.toString()+".zip";
    this.mailRequest.subject="Fichiers";
    this.mailRequest.msg="Veuillez trouver ci-attaché les fichiers  demandés."
    this.sendEtatFichierService.sendEtats(this.mailRequest,zipPath).subscribe(
      (data) => {
        if(data!=null){
         
         //console.log(data);
         this.homeService.deleteZip(this.currentStructure).subscribe(
          (data) => {
            if(data!=null){
             
              this.dialogRef.close();
              this.showSpinner=false;
              this.showAlert("Envoi fichiers paie","Les fichiers sélectionnés ont bien été envoyés aux gestionnaires")
             
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


//***********************************************Error ******************************************************************************************************************/
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
  showAlert(title:String,msg:String) {
    mobiscroll.alert({
      title: title,
      message: msg
       ,callback: function () {
        window.location.reload();
       }
    });
  
  
  }
}
