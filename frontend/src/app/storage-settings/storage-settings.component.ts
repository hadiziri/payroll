import { UpdateStorageSettingsComponent } from './../update-storage-settings/update-storage-settings.component';
import { FolderArchive } from './../Models/FolderArchive';
import { User } from './../Models/User';
import { ParametreService } from './../Services/parametre.service';
import { Folder } from './../Models/Folder';
import { AlertDialogComponent } from './../alert-dialog/alert-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CloturePaieService } from './../Services/cloture-paie.service';
import { HomeService } from './../Services/home.service';
import { Router } from '@angular/router';
import { TokenStorageService } from './../auth/token-storage.service';


import { Customer, Representative } from './../Models/costumers';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Structure } from '../Models/Structure';

import { error } from 'protractor';
import { newArray, stringify } from '@angular/compiler/src/util';
import { mobiscroll, MbscFormOptions } from '@mobiscroll/angular-lite';

@Component({
  selector: 'app-storage-settings',
  templateUrl: './storage-settings.component.html',
  styleUrls: ['./storage-settings.component.css']
})
export class StorageSettingsComponent implements OnInit {

  displayedColumns: string[] = ['idfolder', 'foldername', 'folderpath', 'action'];

  icon_etat: String = "vert.svg";
  etat: String = "";
  ELEMENT_DATA: Folder[] = [];
  pathUpdated:Boolean=false;
  pathUpdatedArchive:Boolean=false;
  dataSource: MatTableDataSource<Folder> = new MatTableDataSource(this.ELEMENT_DATA);
  currentUser: User = {
    "email": "",
    "iduser": 0,
    "name": "",
    "password": "",
    "state": 0,
    "username": ""

  };
  folderArchive: FolderArchive = {
    "archfoldername": "",
    "archfolderpath": "",
    "archstatusfolder": 1,
    "folderarchiveddate": new Date(),
    "idfolder": 0,
    "iduser": 0,
    "folderoperation":""
  }
  folder:Folder={
    "foldername":"",
    "folderpath":"",
    "idfolder":0,
    "statusfolder":1,
    "displayedfolderpath":""
   
  }
  formSettings: MbscFormOptions = {
    theme: 'mobiscroll',
    themeVariant: 'light'
  };
  path: string = "";

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }


  constructor(private homeService: HomeService,
    private router: Router,
    private cloturePaieService: CloturePaieService,
    public dialog: MatDialog,
    private paramService: ParametreService,
    private token: TokenStorageService) {




  }

  ngOnInit() {
    //get currentUser
    this.currentUser.username = this.token.getUsername();
    //console.log(this.currentUser)
    this.paramService.getUserByUserName(this.currentUser).subscribe(
      data => {
        if (data != null) {

          //console.log(data);
          this.currentUser.iduser = data.iduser;
        } else {
          this.openDialog();
        }
      },
      error => {
        //console.log(error);
        alert(error);
        throw error;
      }


    )
    //get all folders
    this.cloturePaieService.getallFolders().subscribe(
      (data) => {
        if (data != null) {
          console.log(data);
          this.ELEMENT_DATA = data;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);


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
  }

  showAlert(title: String, msg: String) {
    mobiscroll.alert({
      title: title,
      message: msg
      , callback: function () {
        window.location.reload();
      }
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(AlertDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }

  deleteFolder(folder: Folder) {
    this.folderArchive.archfoldername = folder.foldername;
    this.folderArchive.archfolderpath = folder.folderpath;
    this.folderArchive.archstatusfolder = folder.statusfolder;
    this.folderArchive.idfolder = folder.idfolder;
    this.folderArchive.iduser = this.currentUser.iduser;
    this.folderArchive.folderoperation="delete";
    this.showConfirm();
  }

  showConfirm() {

    mobiscroll.confirm({
      title: 'Suppression de dossier',
      message: 'Etes vous sur de vouloir supprimer le dossier et tout ses fichiers?',
      okText: 'Supprimer',
      cancelText: 'Annuler'

    }).then((result) => {
      //console.log(result ? 'Agreed.' : 'Disagreed.');
      if (result) {
        this.paramService.deleteFolderPath(this.folderArchive).subscribe(
          data => {
            if (data != null) {

              //console.log(data);
              this.showAlert("Suppression de dossier", "Le dossier et ses fichiers ont bien été supprimés.");

            } else {
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
    });

  }
  updateFolder(folder: Folder): void {
    this.folderArchive.archfoldername = folder.foldername;
    this.folderArchive.archfolderpath = folder.folderpath;
    this.folderArchive.archstatusfolder = folder.statusfolder;
    this.folderArchive.idfolder = folder.idfolder;
    this.folderArchive.iduser = this.currentUser.iduser;
    this.folderArchive.folderoperation="update";

    this.folder.foldername=folder.foldername;
    this.folder.idfolder=folder.idfolder;
    this.folder.statusfolder=folder.statusfolder;
    this.folder.displayedfolderpath=folder.displayedfolderpath;
    this.folder.folderpath=folder.folderpath;
    
    const dialogRef = this.dialog.open(UpdateStorageSettingsComponent, {
      width: '450px',
      data: { path: this.path }
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      this.path = result;
      if (this.path != undefined) {
        console.log(this.path)
        this.folder.displayedfolderpath = this.path;
        console.log(this.folder)
        this.paramService.updateFolderPath(this.folder).subscribe(

          data => {
            if (data != null) {

              console.log(data);
              this.pathUpdated=true;
              this.showAlertUpdate();

            } else {
              console.log("prob")
              this.openDialog();
            }
          },
          error => {
            console.log(error);
            alert(error);
            throw error;
          }

        );
        this.paramService.updateFolderPathArchive(this.folderArchive).subscribe(
          data => {
            if (data != null) {

              console.log(data);
              this.pathUpdatedArchive=true;
              this.showAlertUpdate();

            } else {
              this.openDialog();
            }
          },
          error => {
            //console.log(error);
            alert(error);
            throw error;
          }
        );
      }

    });
  }

  showAlertUpdate() {
    if(this.pathUpdated&&this.pathUpdatedArchive){
      mobiscroll.alert({
        title: "Modification chemin de stockage",
        message:"Vos modifications ont bien été enregistrées."
        , callback: function () {
          window.location.reload();
        }
      });
    }
  
  }

  addNewFolder(){
    this.router.navigateByUrl("addNewFolder");
  }
}



