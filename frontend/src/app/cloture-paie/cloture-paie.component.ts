import { ErrorDialogComponent } from './../error-dialog/error-dialog.component';
import { AlertDialogComponent } from './../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HomeService } from './../Services/home.service';
import { FormGroup } from '@angular/forms';


import { Router } from '@angular/router';
import { TokenStorageService } from './../auth/token-storage.service';


import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Structure } from '../Models/Structure';
import { CloturePaieService } from '../Services/cloture-paie.service';
import { error, element } from 'protractor';
import { newArray, stringify } from '@angular/compiler/src/util';
import { mobiscroll, MbscFormOptions } from '@mobiscroll/angular-lite';
import { Folder } from '../Models/Folder';
import { clotureFiles } from '../Models/cloturesFiles';

export interface EtatElement {
  idFile: number,
  etat: number
}
export interface EtatFolder {
  idFolder: number,
  etat: number
}
@Component({
  selector: 'app-cloture-paie',
  templateUrl: './cloture-paie.component.html',
  styleUrls: ['./cloture-paie.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class CloturePaieComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['IDFILE', 'FILENAME', 'FOLDERPATH', 'STATUSFILE'];

  icon_etat: String = "vert.svg";
  ELEMENT_DATA: clotureFiles[] = [];
  folderCategories: Folder[] = [];
  state: number = -1;
  FrubAlph: Boolean = false;
  FrubNum: Boolean = false;
  EtatArray = Array<EtatElement>();
  showSpinner: Boolean = false;
  //globalFolderStatus:number=-1;


  dataSource: MatTableDataSource<clotureFiles> = new MatTableDataSource(this.ELEMENT_DATA);
  formSettings: MbscFormOptions = {
    theme: 'mobiscroll',
    themeVariant: 'light'
  };


  fileToPrintFormGroup: FormGroup = new FormGroup({});




  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
    private clotureService: CloturePaieService,
    private homeService: HomeService,
    public dialog: MatDialog
  ) {


    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/' + this.icon_etat));

  }
  ngAfterViewInit(): void {

  }

  ngOnInit() {

    this.clotureService.getAllCloturePaie().subscribe(

      (data) => {

        // //console.log(data);
        if (data != null) {
          for (let i = 0; i < data.length; i++) {
            this.getEtatFile(data[i]);
          }
        } else {
          this.openDialog();
        }



      },
      error => {
        //  //console.log(error);
         this.openDialogError(error);;
        throw error;

      }






    );


    this.clotureService.getallFolders().subscribe(
      (data) => {
        if (data != null) {
          // //console.log(data);
          for (let i = 0; i < data.length; i++) {
            if (data[i].foldername != "ETAT") {
              this.folderCategories.push(data[i]);
            }
          }


        } else {
          this.openDialog();
        }
      },
      (error) => {
        //  //console.log(error);
         this.openDialogError(error);;
        throw error;
      }


    );
  }
  getStatusFile(idFile: number) {
    /* this.EtatArray.forEach(
       (element)=>{
          //console.log(element)
         if(element.idFile==idFile){
           return element.etat;
           
         }else{
           return -1
         }
       }
       );*/

    for (let i = 0; i < this.EtatArray.length; i++) {
      if (this.EtatArray[i].idFile == idFile) {
        return this.EtatArray[i].etat;
      }
    }
    return -1;

  }
  getFiles(event: any) {

    this.ELEMENT_DATA = [];
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    // //console.log(this.EtatArray)

    let folder: Folder = { "idfolder": 0, "foldername": event.tab.textLabel, "folderpath": "", "statusfolder": 0 ,"displayedfolderpath":""};

    this.clotureService.getFilesByFolder(folder).subscribe(
      (data) => {
        if (data != null) {
          // //console.log(data);
          this.ELEMENT_DATA = data;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          //this.globalStatusFolder(data,folder.foldername);
        } else {
          this.openDialog();
        }



      },
      (error) => {
        //  //console.log(error);
         this.openDialogError(error);;
        throw error;
      }


    );
  }
  /* globalStatusFolder(data: clotureFiles[], foldername: string) {
     
    let i=0;
    let exist:boolean=false;
    while(i<data.length){
     
      if(this.getStatusFile(data[i].idfiletype)==1){
        i++;
      }else{
         exist=true;
         i++;
      }
    }
    if(exist){
     this.globalFolderStatus=0;
    }else{
     this.globalFolderStatus=1;
    }
    
     //console.log(this.globalFolderStatus)
   }
 */

  getEtatFile(file: clotureFiles) {
    this.EtatArray.splice(0, this.EtatArray.length)
    this.clotureService.getEtatFile(file).subscribe(

      (data) => {
        if (data != null) {
          // //console.log(data);
          this.state = data;
          this.EtatArray.push({ "idFile": file.idfiletype, "etat": this.state })

          // //console.log(this.dataSource)
        } else {
          this.openDialog();
        }



      },
      (error) => {
        // //console.log(error);
         this.openDialogError(error);;
        throw error;
      }


    );

  }

  generateFiles(description: string) {
    // //console.log(description);
    this.showSpinner = true;
    switch (description) {
      case "TABLES":
        this.clotureService.generateTableFiles().subscribe(
          (data) => {
            if (data != null) {
              // //console.log(data);
              let msg = "Les fichiers tables ont bien été générés et la paie a bien été cloturée.";
              this.showSpinner = false;
              this.showAlert(msg);
            } else {
              this.showSpinner = false;
              this.openDialog();
            }

          },

          (error) => {
            // //console.log(error);
             this.openDialogError(error);;
            throw error;
          }



        );
        break;

      case "SYSTEME":
        this.clotureService.generateSystemFiles().subscribe(
          (data) => {
            if (data != null) {
              // //console.log(data);
              let msg = "Les fichiers systèmes ont bien été générés et la paie a bien été cloturée.";
              this.showSpinner = false;
              this.showAlert(msg);
            } else {
              this.showSpinner = false;
              this.openDialog();
              // alert("Une erreur s'est produite.Veuillez réessayer plus tard\n(Le processus ne peut pas accéder au fichier car ce fichier est utilisé par un autre processus)");
            }

          },

          (error) => {
            // //console.log(error);
             this.openDialogError(error);;
            throw error;
          }

        )

        break;

      case "FRUB":
        this.clotureService.generateFrubAlph().subscribe(
          (data) => {
            if (data != null) {
              //this.showSpinner = false;
              // //console.log(data);
              this.FrubAlph = true;
              this.showAlertFRUB();
            } else {
              this.showSpinner = false;
              this.openDialog();
              // alert("Une erreur s'est produite.Veuillez réessayer plus tard\n(Le processus ne peut pas accéder au fichier car ce fichier est utilisé par un autre processus)");
            }

          },

          (error) => {
            // //console.log(error);
             this.openDialogError(error);;
            throw error;
          }
        );
        this.clotureService.generateFrubNum().subscribe(
          (data) => {
            if (data != null) {
              // //console.log(data);
              //this.showSpinner = false;
              this.FrubNum = true;
              this.showAlertFRUB();
            } else {
              this.showSpinner = false;
              this.openDialog();
              //alert("Une erreur s'est produite.Veuillez réessayer plus tard\n(Le processus ne peut pas accéder au fichier car ce fichier est utilisé par un autre processus)");
            }

          },
          (error) => {
            // //console.log(error);
             this.openDialogError(error);;
            throw error;
          }
        )
        break;

      case "PERS":
        this.clotureService.generatePersFiles().subscribe(

          (data) => {
            if (data != null) {
              // //console.log(data);
              let msg = "Les fichiers pers ont bien été générés et la paie a bien été cloturée.";
              this.showSpinner = false;
              this.showAlert(msg);
            } else {
              this.showSpinner = false;
              this.openDialog();
              //alert("Une erreur s'est produite.Veuillez réessayer plus tard\n(Le processus ne peut pas accéder au fichier car ce fichier est utilisé par un autre processus)");
            }

          },

          (error) => {
            // //console.log(error);
             this.openDialogError(error);;
            throw error;
          }
        )
        break;

      case "NEWPAIE":
         //console.log("generating NEWPAIE ");
        this.clotureService.generateNewPaieFiles().subscribe(
          (data) => {
            if (data != null) {
              // //console.log(data);
              let msg = "Les fichiers newpaie ont bien été générés et la paie a bien été cloturée.";
              this.showSpinner = false;
              this.showAlert(msg);
            } else {
              this.showSpinner = false;
              this.openDialog();
              //alert("Une erreur s'est produite.Veuillez réessayer plus tard\n(Le processus ne peut pas accéder au fichier car ce fichier est utilisé par un autre processus)");
            }

          },

          (error) => {
            // //console.log(error);
             this.openDialogError(error);;
            throw error;
          }
        )
        break;

    }
  }


  showAlert(message: string) {
    mobiscroll.alert({
      title: 'Cloture Paie',
      message: message

      , callback: function () {
        window.location.reload();
      }
    });

  }
  showAlertFRUB() {
    if (this.FrubAlph && this.FrubNum) {
      this.showSpinner = false;
      mobiscroll.alert({
        title: 'Cloture Paie',
        message: " Les fichiers Frub ont bien été générés et la paie a bien été cloturée."

        , callback: function () {
          window.location.reload();
        }
      });
    }


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
