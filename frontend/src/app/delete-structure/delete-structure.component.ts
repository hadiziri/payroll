import { ArchiveStructure } from './../Models/ArchiveStructure';
import { ParametreService } from './../Services/parametre.service';
import { User } from './../Models/User';
import { HomeService } from './../Services/home.service';
import { NavigationExtras, Router } from '@angular/router';
import { TokenStorageService } from './../auth/token-storage.service';



import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Structure } from '../Models/Structure';

import { error, element } from 'protractor';
import { newArray, stringify } from '@angular/compiler/src/util';
import { mobiscroll, MbscFormOptions } from '@mobiscroll/angular-lite';

@Component({
  selector: 'app-delete-structure',
  templateUrl: './delete-structure.component.html',
  styleUrls: ['./delete-structure.component.css']
})
export class DeleteStructureComponent implements OnInit {

  displayedColumns: string[] = ['idstructure', 'structurename', 'STRUCTURECODELIKE', 'EMAILGROUPMANAGERS', 'STATUSSTRUCTURE', 'action'];

  icon_etat: String = "vert.svg";
  etat: String = "";
  ELEMENT_DATA: Structure[] = [];
  currentUser:User={
    "email":"",
    "iduser":0,
    "name":"",
    "password":"",
    "state":0,
    "username":""

  };
  structureArchive:ArchiveStructure={
    "archemailgroupemanagers":"",
    "archstatusstructure":-1,
    "archstructurecodelike":"",
    "archstructurecodenotlike":"",
    "idactivity":0,
    "archstructurename":"",
    "idstructure":0,
    "iduser":0,
    "structurearchiveddate":new Date()
  }

  dataSource: MatTableDataSource<Structure> = new MatTableDataSource(this.ELEMENT_DATA);
  formSettings: MbscFormOptions = {
    theme: 'mobiscroll',
    themeVariant: 'light'
  };

  showSpinner: Boolean = false;



  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }


  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private homeService:HomeService, private token: TokenStorageService, private router: Router,private paramService:ParametreService) {


    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/' + this.icon_etat));

  }

  ngOnInit() {
    this.homeService.getAllStructures().subscribe(
      (data) => {
        this.ELEMENT_DATA = data;
        console.log(data);
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

      },
      error => {
        console.log(error);
        alert(error);
        throw error;

      }
    );
    //get currentUser
this.currentUser.username=this.token.getUsername();
console.log(this.currentUser)
this.paramService.getUserByUserName(this.currentUser).subscribe(
  data=>{
    if(data!=null){
      
      console.log(data);
      this.currentUser.iduser=data.iduser;
    }else{
      alert("Une erreur s'est produite.Veuillez réessayer plus tard");
    }
  },
  error=>{
    console.log(error);
    alert(error);
    throw error;
  }


)
  }

 

  updateStructure(element:Structure){
    console.log(element)
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "idstructure":element.idstructure,
        "idactivity":element.idactivity,
        "emailgroupmanagers":element.emailgroupmanagers,
        "statusstructure":element.statusstructure,
        "structurecodenotlike":element.structurecodenotlike,
        "structurecodelike":element.structurecodelike,
        "structurename":element.structurename
      }
  };
  this.router.navigate(["updateStructure/"+element.idstructure], navigationExtras);
    
  }

  deleteStructure(element:Structure){
 
    this.structureArchive.idstructure=element.idstructure;
    this.structureArchive.iduser=this.currentUser.iduser;
    this.structureArchive.archstatusstructure=element.statusstructure;
    this.structureArchive.archemailgroupemanagers=element.emailgroupmanagers;
    this.structureArchive.archstructurecodelike=element.structurecodelike;
    this.structureArchive.archstructurecodenotlike=element.structurecodenotlike;
    this.structureArchive.archstructurename=element.structurename;
    this.structureArchive.idactivity=element.idactivity;
    
    console.log(this.structureArchive)
    this.showConfirm();
  
  }

  showConfirm() {
 
    mobiscroll.confirm({
      title: 'Suppression',
      message: 'Etes vous sur de vouloir supprimer la structure?',
      okText: 'Supprimer',
      cancelText: 'Annuler'
    
  }).then( (result) => {
    //console.log(result ? 'Agreed.' : 'Disagreed.');
    if(result){
      this.paramService.deleteStructure(this.structureArchive).subscribe(
        data=>{
          if(data!=null){
            
            console.log(data);
            this.showAlert();
           
          }else{
            alert("Une erreur s'est produite.Veuillez réessayer plus tard");
          }
        },
        error=>{
          console.log(error);
          alert(error);
          throw error;
        }
  
  
  
        
      )
    }
  }); 
  
  }

   //alert pour le FileToPrint selection
   showAlert() {
   
      mobiscroll.alert({
        title: 'Suppression de structure',
        message: "La structure séléctionnée a bien été supprimée"
      }).then( (result) => {
        window.location.reload();
      }
      )
    }
   
  

}
