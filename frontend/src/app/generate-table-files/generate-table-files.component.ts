import { HomeService } from './../Services/home.service';
import { ArchiveSentFiles } from './../Models/ArchiveSentFiles';
import { EmailDB } from './../Models/EmailDB';
import { User } from './../Models/User';
import { TokenStorageService } from './../auth/token-storage.service';
import { ParametreService } from './../Services/parametre.service';
import { MailRequest } from './../Models/MailRequest';
import { SendTableFilesService } from './../Services/send-table-files.service';
import {  mobiscroll,MbscFormOptions } from '@mobiscroll/angular-lite';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { clotureFiles } from './../Models/cloturesFiles';
import { AlertDialogComponent } from './../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Folder } from './../Models/Folder';
import { CloturePaieService } from './../Services/cloture-paie.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generate-table-files',
  templateUrl: './generate-table-files.component.html',
  styleUrls: ['./generate-table-files.component.css']
})
export class GenerateTableFilesComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  allTableFiles:clotureFiles[]=[];
  tempTableFiles:clotureFiles[]=[];
  mailRequest:MailRequest={"from":"","msg":"","sturcturename":"","subject":"","to":[],"filesName":[]};
  currentUser:User={"email":"","iduser":0,"name":"","password":"","state":0,"username":""};
  email:EmailDB={"emailgenerationdate":new Date(),"emailobject":"","idemail":0,"iduser":0,"msg":"","receiver":"","sender":""};
  archiveSentFiles:ArchiveSentFiles[]=[];
  emailSaved:Boolean=false;
  archiveSentFilesSaved:Boolean=false;
  formSettings: MbscFormOptions = {
    theme: 'mobiscroll',
    themeVariant: 'light'
  };
  
  constructor(private clotureService: CloturePaieService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private homeService:HomeService, 
    private SendTableFilesService:SendTableFilesService,
    private token: TokenStorageService, 
    private paramService :ParametreService) {
    this.formGroup = this.fb.group({
      message: new FormControl('',[Validators.required]),
      object:new FormControl('',[Validators.required]),
      emailgroupemanagers: this.fb.array([]) ,
    });
  
   }

   emails() : FormArray {
    return this.formGroup.get("emailgroupemanagers") as FormArray
  }
  ngOnInit(): void {
    //this.formGroup.setControl()
    let folder: Folder = { "idfolder": 0, "foldername": "TABLES", "folderpath": "", "statusfolder": 0 };

    this.clotureService.getFilesByFolder(folder).subscribe(
      (data) => {
        if (data != null) {
          console.log(data);
          this.allTableFiles=data;
          //this.globalStatusFolder(data,folder.foldername);
        } else {
          this.openDialog();
        }



      },
      (error) => {
        // console.log(error);
        alert(error);
        throw error;
      }


    );

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
  }

  openDialog() {
    const dialogRef = this.dialog.open(AlertDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }
  ischekedindex(file:clotureFiles){
   
      return this.tempTableFiles.indexOf(file);
    
    
  }

  updateCheckedFiles(file:clotureFiles){
    console.log(file)
    if(this.tempTableFiles.length>0){
      let index=this.ischekedindex(file);
      if(index!=-1){
        this.tempTableFiles.splice(index,1);
      }else{
        this.tempTableFiles.push(file);
      }
    }else{
      this.tempTableFiles.push(file);
    }
    
    console.log(this.tempTableFiles)
  }

  getErrorEmail() {
    let object = this.formGroup.get('emailgroupemanagers');
    if (object != null) {
      return object.valid ? '' : 'Adresse email non valide';
    } else {
      return '';
    }

  }
  onSubmit(post: any) {
   if(this.tempTableFiles.length==0){
    this.showAlert("Envoie email","Vous devez sélectionner au moins un fichier à envoyer!")
   }else{
    console.log(post)
    this.mailRequest.subject=post.object;
    this.mailRequest.msg=post.message;
    this.mailRequest.to=post.emailgroupemanagers;
    this.mailRequest.from=this.currentUser.email;
    for(let i=0;i<this.tempTableFiles.length;i++){
      this.mailRequest.filesName.push(this.tempTableFiles[i].prefixfiletype)
    }
    console.log(this.mailRequest)
     /**************initialisation of mail to save in DB************************************* */
     this.email.sender=this.mailRequest.from;
     this.email.emailobject=this.mailRequest.subject;
     this.email.iduser=this.currentUser.iduser;
     this.email.msg= this.mailRequest.msg;
     for(let i=0;i<this.mailRequest.to.length;i++){
       this.email.receiver=this.email.receiver.concat(this.mailRequest.to[i]+";");
     }
    this.SendTableFilesService.sendEmailFiles(this.mailRequest).subscribe(
      (data) => {
        if(data!=null){
          //console.log(data);
          if(data.status==true){
            this.saveEmailDB();
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
  
    )
   }
  
}
saveEmailDB(){
  this.archiveSentFiles=[];
  this.homeService.SaveSentEmail(this.email).subscribe(
    (data) => {
    
      console.log(data);
      if(data!=null){
        this.emailSaved=true;
        for(let i=0;i<this.tempTableFiles.length;i++){
          this.archiveSentFiles.push({"idemail":data.idemail,"idfile":this.tempTableFiles[i].idfiletype});
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
  newEmail(): FormControl {
    return this.fb.control('',[Validators.required,Validators.email]);
  }
  addInput() {
   return this.emails().push(this.newEmail())
  }

    //alert pour le FileToPrint selection
    showAlert(title:String,msg:String) {
        mobiscroll.alert({
          title: title,
          message: msg
          /* ,callback: function () {
               mobiscroll.toast({
                   message: 'Alert closed'
               });
           }*/
        });
      
     
    }
}
