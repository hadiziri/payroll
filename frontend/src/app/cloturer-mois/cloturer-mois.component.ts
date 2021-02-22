import { ErrorDialogComponent } from './../error-dialog/error-dialog.component';
import { AlertDialogComponent } from './../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ClotureMoisService } from './../Services/cloture-mois.service';
import { mobiscroll, MbscFormOptions } from '@mobiscroll/angular-lite';

import { element } from 'protractor';
import { clotureFiles } from './../Models/cloturesFiles';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CloturePaieService } from './../Services/cloture-paie.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Folder } from './../Models/Folder';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

export interface EtatElement {
  idFolder:number,
  etat: number[]
}
@Component({
  selector: 'app-cloturer-mois',
  templateUrl: './cloturer-mois.component.html',
  styleUrls: ['./cloturer-mois.component.css']
})
export class CloturerMoisComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['idfolder', 'foldername', 'FOLDERPATH', 'STATUSFOLDER'];
  folderCategories: Folder[] = [];
  icon_etat: String = "vert.svg";
  dataSource: MatTableDataSource<Folder> = new MatTableDataSource(this.folderCategories);
  EtatArray = Array<EtatElement>();
  state: number[]=[];
  formSettings: MbscFormOptions = {
    theme: 'mobiscroll',
    themeVariant: 'light'
  };
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;


  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
    private clotureService: CloturePaieService,
    private clotureMoisService:ClotureMoisService,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    this.clotureService.getallFolders().subscribe(
      (data) => {
        if (data != null) {
          //console.log(data);
          this.folderCategories = data;

        this.dataSource = new MatTableDataSource(this.folderCategories);
        this.ngAfterViewInit();

        } else {
          this.openDialog();
        }
      },
      (error) => {
        //console.log(error);
         this.openDialogError(error);;
        throw error;
      }


    );

   this.clotureService.getAllCloturePaie().subscribe(

      (data) => {

        console.log(data);
        if(data!=null){
          for(let i=0;i<data.length;i++){
            this.getEtatFile(data[i]);
          }
        }else{
          this.openDialog();
        }


      },
      error => {
       // console.log(error);
         this.openDialogError(error);;
        throw error;

      }






    );

  }
  ngAfterViewInit() {
   if(this.folderCategories.length!=0){
    // console.log(this.folderCategories)
    this.dataSource.sort = this.sort;
   }
    
  }

  getEtatFile(file: clotureFiles) {
    //this.EtatArray.splice(0, this.EtatArray.length)
   
    let exist:Boolean=false;
    this.clotureService.getEtatFile(file).subscribe(
    
      (data) => {
        
        console.log(data);
        if(this.EtatArray.length>0){
          
          
          for(let i=0;i<this.EtatArray.length;i++){
           
            if(this.EtatArray[i].idFolder==file.idfolder){
              //console.log(this.EtatArray[i].idFolder+"==>"+data)
              this.EtatArray[i].etat.push(data)
              //console.log(this.EtatArray[i].etat)
              exist=true;
            }
          }
        }
            if(!exist){
              this.state=[];
             // console.log(this.state)
              this.state.push (data);
              this.EtatArray.push({ "idFolder":file.idfolder, "etat": this.state })
            }
         
        
        

        
        //console.log(this.EtatArray)
        

      },
      (error) => {
        //console.log(error);
         this.openDialogError(error);;
        throw error;
      }


    );

  }

  getStatusFolder(idFolder:number){
   for(let i=0;i<this.EtatArray.length;i++){
     if(this.EtatArray[i].idFolder==idFolder){
       if(this.EtatArray[i].etat.includes(0)&&this.EtatArray[i].etat.includes(1)){
         return 0;
       }else{
        if(this.EtatArray[i].etat.includes(0)&&!this.EtatArray[i].etat.includes(1)){
            return -1;
        }else{
          return 1;
        }
       }
     }
   }
   return 2;
  }

  cloturerMois(){
    let alertUser:Boolean=false;
    this.EtatArray.forEach(
      element=>{
        if(element.etat.includes(0)){
          alertUser=true;
        }
      }
    )

    if(alertUser){
      this.showConfirm();
    }
  }

  showConfirm() {
 
    mobiscroll.confirm({
      title: 'Confirmation Clôture Mois',
      message: 'Voulez vous vraiment vous clôturer ce mois?',
      okText: 'Confirmer',
      cancelText: 'Annuler'
    
  }).then( (result) => {
    //console.log(result ? 'Agreed.' : 'Disagreed.');
    if(result){
     this.confirmClotureMois();
    }
  }); 
  
  }

  confirmClotureMois(){
    //console.log("yes")
    this.clotureMoisService.updatePayMonth().subscribe(
      data=>{
        if(data!=null){
          this.showAlert("Le mois a bien été cloturé.");
        }else{
          this.openDialog();
        }
      },
      (error) => {
        //console.log(error);
         this.openDialogError(error);;
        throw error;
      }
    )
  }

  showAlert(message: string) {
    mobiscroll.alert({
      title: 'Cloture Mois',
      message: message

      , callback: function () {
        window.location.reload();
      }
    });

  }

  openfolder(){
    window.open("file:\\\\\localhost\C:\DIN_DRH");
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
}
