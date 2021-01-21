import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from './../alert-dialog/alert-dialog.component';
import { stringify } from '@angular/compiler/src/util';
import { User } from './../Models/User';
import { ArchiveStructure } from './../Models/ArchiveStructure';
import { Structure } from './../Models/Structure';
import { ShActivity } from './../Models/ShActivity';
import { ParametreService } from './../Services/parametre.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomeService } from './../Services/home.service';
import { TokenStorageService } from './../auth/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { mobiscroll, MbscFormOptions } from '@mobiscroll/angular-lite';

@Component({
  selector: 'app-update-structure',
  templateUrl: './update-structure.component.html',
  styleUrls: ['./update-structure.component.css']
})
export class UpdateStructureComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});

  post:any;
  currentUser:User={
    "email":"",
    "iduser":0,
    "name":"",
    "password":"",
    "state":0,
    "username":""

  }
  allShActivities: ShActivity[] = [];

  StructureToUpdate:Structure=
  {"idstructure":0,
  "idactivity":0,
  "emailgroupmanagers":"",
  "statusstructure":3,
  "structurecodenotlike":"",
  "structurecodelike":"",
  "structurename":""};
  structureArchive:ArchiveStructure={
    "archemailgroupemanagers":"",
    "archstatusstructure":3,
    "archstructurecodelike":"",
    "archstructurecodenotlike":"",
    "idactivity":0,
    "archstructurename":"",
    "idstructure":0,
    "iduser":0,
    "structurearchiveddate":new Date()
  }
  messageAdded:Boolean=false;
  messageArchive:Boolean=false;
  formSettings: MbscFormOptions = {
    theme: 'mobiscroll',
    themeVariant: 'light'
};
  constructor(private paramService:ParametreService,private token: TokenStorageService, private router: Router,private activatedRoute:ActivatedRoute,private formBuilder: FormBuilder,
    public dialog: MatDialog) {

    this.formGroup = new FormGroup({
      structurename: new FormControl(''),
      structurecodelike: new FormControl(''),
  
      emailgroupemanagers: new FormControl('', [Validators.email]),
      idactivity: new FormControl(''),
      structurecodenotlike:new FormControl('')
    });

    this.activatedRoute.queryParams.subscribe(params => {
     //console.log(params["idstructure"])
     this.structureArchive.archemailgroupemanagers=params["emailgroupmanagers"];
     this.structureArchive.archstatusstructure=params["statusstructure"];
     this.structureArchive.archstructurecodelike=params["structurecodelike"];
     this.structureArchive.archstructurename=params["structurename"];
     this.structureArchive.idstructure=params["idstructure"];
     this.structureArchive.archstructurecodenotlike=params["structurecodenotlike"];
     this.structureArchive.idactivity=params["idactivity"];

  });
  }
  
  ngOnInit(): void {
  // console.log(this.activatedRoute.snapshot.params.id)
   let object:any=this.formGroup.get("idactivity");
   if(object!=null){
    object.setValue(this.structureArchive.idactivity);
   }
  
 //get all ShActivities
 this.paramService.getAllShActivities().subscribe(
  (data) => {
    if(data!=null){
      this.allShActivities = data;
     // console.log("allshavtivities");
     // console.log(data);
    }else{
      this.openDialog();
    } 
  },
  error => {
   // console.log(error);
    alert(error);
    throw error;
  }
);
  

//get currentUser
this.currentUser.username=this.token.getUsername();
//console.log(this.currentUser)
this.paramService.getUserByUserName(this.currentUser).subscribe(
  data=>{
    if(data!=null){
      
     // console.log(data);
      this.currentUser.iduser=data.iduser;
    }else{
      this.openDialog();
    }
  },
  error=>{
   // console.log(error);
    alert(error);
    throw error;
  }


)
  }

  getErrorEmail() {
    let object =this.formGroup.get('emailgroupemanagers');
    if(object!=null){
      return object.valid ? '' : 'Adresse email non valide';
    }else{
      return '';
    }
    
  }
 

  onSubmit(post:any) {
    this.post = post;
    if(this.post.structurename==""&&this.post.structurecodelike==""&&this.post.emailgroupemanagers==""&&this.post.idactivity==""&&this.post.structurecodenotlike==""){
      alert("Veuillez au moins remplir un champ");
    }else{
      if(this.post.structurename!=""){
        this.StructureToUpdate.structurename=this.post.structurename;

       }
       if(this.post.structurecodelike!=""){
         this.StructureToUpdate.structurecodelike=this.post.structurecodelike;
      
       }
       if(this.post.emailgroupemanagers!=""){
         this.StructureToUpdate.emailgroupmanagers=this.post.emailgroupemanagers;
       
       }
       if(this.post.idactivity!=""){
         this.StructureToUpdate.idactivity=this.post.idactivity;
         
       }
       if(this.post.structurecodenotlike!=""){
         this.StructureToUpdate.structurecodenotlike=this.post.structurecodenotlike;
       }
       this.StructureToUpdate.idstructure=this.activatedRoute.snapshot.params.id;
      // console.log(this.StructureToUpdate)
       this.paramService.updateStructure(this.StructureToUpdate).subscribe(
         data=>{
           if(data!=null){
             this.messageAdded=true;
            // console.log(data)
             this.showAlert();
           }else{
            this.openDialog();
           }
         },
         error=>{
          // console.log(error);
           alert(error);
           throw error;
         }
   
       );
   
       this.structureArchive.idstructure=this.activatedRoute.snapshot.params.id;
        // console.log(this.currentUser)
         this.structureArchive.iduser=this.currentUser.iduser;

       this.paramService.updateStructureArchive(this.structureArchive).subscribe(
   
         data=>{
           if(data!=null){
             this.messageArchive=true;
             //console.log(data)
             this.showAlert();
           }else{
            this.openDialog();
           }
         },
         error=>{
           //console.log(error);
           alert(error);
           throw error;
         }
   
   
   
       );
    }
    

  }

   //alert pour le FileToPrint selection
   showAlert() {
    if(this.messageAdded &&this.messageArchive){
      mobiscroll.alert({
        title: 'Modification de structure',
        message: "Vos modification ont bien été enregistrées"
      }).then( (result) => {
        this.router.navigateByUrl("structures");
      }
      )
    }
   
  }
  openDialog() {
    const dialogRef = this.dialog.open(AlertDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }

}
