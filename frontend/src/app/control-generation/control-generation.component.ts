import { GenerateControlledEtatFichierComponent } from './../generate-controlled-etat-fichier/generate-controlled-etat-fichier.component';
import { ErrorDialogComponent } from './../error-dialog/error-dialog.component';
import { AlertDialogComponent } from './../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ParametreService } from './../Services/parametre.service';
import { Router } from '@angular/router';
import { TokenStorageService } from './../auth/token-storage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MbscFormOptions } from '@mobiscroll/angular-lite';
import { MatTableDataSource } from '@angular/material/table';
import { User } from './../Models/User';
import { Structure } from './../Models/Structure';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-control-generation',
  templateUrl: './control-generation.component.html',
  styleUrls: ['./control-generation.component.css']
})
export class ControlGenerationComponent implements OnInit {

  displayedColumns: string[] = ['idstructure', 'structurename', 'STRUCTURECODELIKE', 'EMAILGROUPMANAGERS',  'action'];

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


  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private token: TokenStorageService, private router: Router,
    private paramService:ParametreService,public dialog: MatDialog) {


    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/' + this.icon_etat));

  }


  ngOnInit(): void {
    
    this.paramService.getNotGeneratedStructure().subscribe(
      (data) => {
      if(data!=null){
        this.ELEMENT_DATA=data;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
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
    )
  }

  selectEtatFichier(structure:Structure){
    const dialogRef = this.dialog.open(GenerateControlledEtatFichierComponent, {
      width: '450px',
      data:{
        
        "structure":structure
        
  
       }
    });
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
