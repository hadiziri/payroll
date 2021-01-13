import { HomeService } from './../Services/home.service';
import { FormGroup } from '@angular/forms';


import { Router } from '@angular/router';
import { TokenStorageService } from './../auth/token-storage.service';


import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
@Component({
  selector: 'app-cloture-paie',
  templateUrl: './cloture-paie.component.html',
  styleUrls: ['./cloture-paie.component.css']
})

export class CloturePaieComponent implements OnInit {

  displayedColumns: string[] = ['IDFILE', 'FILENAME', 'FOLDERPATH', 'STATUSFILE'];

  icon_etat: String = "vert.svg";
  ELEMENT_DATA: clotureFiles[] = [];
  folderCategories: Folder[] = [];
  state: number = -1;
  FrubAlph: Boolean = false;
  FrubNum: Boolean = false;
  EtatArray = Array<EtatElement>();
  showSpinner: Boolean = false;

  dataSource: MatTableDataSource<clotureFiles> = new MatTableDataSource(this.ELEMENT_DATA);
  formSettings: MbscFormOptions = {
    theme: 'mobiscroll',
    themeVariant: 'light'
  };


  fileToPrintFormGroup: FormGroup = new FormGroup({});




  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
    private clotureService: CloturePaieService,
    private homeService: HomeService,
  ) {


    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/' + this.icon_etat));

  }

  ngOnInit() {
    this.clotureService.getAllCloturePaie().subscribe(

      (data) => {

        //console.log(data);
        if (data != null) {
          for (let i = 0; i < data.length; i++) {
            this.getEtatFile(data[i]);
          }
        }


      },
      error => {
       // console.log(error);
        alert(error);
        throw error;

      }






    );


    this.clotureService.getallFolders().subscribe(
      (data) => {
        if (data != null) {
          //console.log(data);
          for (let i = 0; i < data.length; i++) {
            if (data[i].foldername != "ETAT") {
              this.folderCategories.push(data[i]);
            }
          }


        } else {
          alert("Une erreur s'est produite.Veuillez réessayer plus tard");
        }
      },
      (error) => {
       // console.log(error);
        alert(error);
        throw error;
      }


    );
  }
  getStatusFile(idFile: number) {
    /* this.EtatArray.forEach(
       (element)=>{
         console.log(element)
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
    //console.log(this.EtatArray)

    let folder: Folder = { "idfolder": 0, "foldername": event.tab.textLabel, "folderpath": "", "statusfolder": 0 };

    this.clotureService.getFilesByFolder(folder).subscribe(
      (data) => {
        //console.log(data);
        this.ELEMENT_DATA = data;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);



      },
      (error) => {
       // console.log(error);
        alert(error);
        throw error;
      }


    );
  }


  getEtatFile(file: clotureFiles) {
    this.EtatArray.splice(0, this.EtatArray.length)
    this.clotureService.getEtatFile(file).subscribe(

      (data) => {
        //console.log(data);
        this.state = data;
        this.EtatArray.push({ "idFile": file.idfiletype, "etat": this.state })

        //console.log(this.dataSource)


      },
      (error) => {
        //console.log(error);
        alert(error);
        throw error;
      }


    );

  }

  generateFiles(description: string) {
    //console.log(description);
    this.showSpinner = true;
    switch (description) {
      case "TABLES":
        this.clotureService.generateTableFiles().subscribe(
          (data) => {
            if (data != null) {
              //console.log(data);
              let msg = "Les fichiers tables ont bien été générés et la paie a bien été cloturée.";
              this.showSpinner = false;
              this.showAlert(msg);
            } else {
              alert("Une erreur s'est produite.Veuillez réessayer plus tard\n(Le processus ne peut pas accéder au fichier car ce fichier est utilisé par un autre processus)");
            }

          },

          (error) => {
            //console.log(error);
            alert(error);
            throw error;
          }



        );
        break;

      case "SYSTEME":
        this.clotureService.generateSystemFiles().subscribe(
          (data) => {
            if (data != null) {
              //console.log(data);
              let msg = "Les fichiers systèmes ont bien été générés et la paie a bien été cloturée.";
              this.showSpinner = false;
              this.showAlert(msg);
            } else {
              this.showSpinner = false;
              alert("Une erreur s'est produite.Veuillez réessayer plus tard\n(Le processus ne peut pas accéder au fichier car ce fichier est utilisé par un autre processus)");
            }

          },

          (error) => {
            //console.log(error);
            alert(error);
            throw error;
          }

        )

        break;

      case "FRUB":
        this.clotureService.generateFrubAlph().subscribe(
          (data) => {
            if (data != null) {
              //console.log(data);
              this.FrubAlph = true;
              this.showAlertFRUB();
            } else {
              alert("Une erreur s'est produite.Veuillez réessayer plus tard\n(Le processus ne peut pas accéder au fichier car ce fichier est utilisé par un autre processus)");
            }

          },

          (error) => {
            //console.log(error);
            alert(error);
            throw error;
          }
        );
        this.clotureService.generateFrubNum().subscribe(
          (data) => {
            if (data != null) {
              //console.log(data);

              this.FrubNum = true;
              this.showAlertFRUB();
            } else {
              alert("Une erreur s'est produite.Veuillez réessayer plus tard\n(Le processus ne peut pas accéder au fichier car ce fichier est utilisé par un autre processus)");
            }

          },
          (error) => {
            //console.log(error);
            alert(error);
            throw error;
          }
        )
        break;

      case "PERS":
        this.clotureService.generatePersFiles().subscribe(

          (data) => {
            if (data != null) {
              //console.log(data);
              let msg = "Les fichiers pers ont bien été générés et la paie a bien été cloturée.";
              this.showSpinner = false;
              this.showAlert(msg);
            } else {
              alert("Une erreur s'est produite.Veuillez réessayer plus tard\n(Le processus ne peut pas accéder au fichier car ce fichier est utilisé par un autre processus)");
            }

          },

          (error) => {
            //console.log(error);
            alert(error);
            throw error;
          }
        )
        break;

      case "NEWPAIE":
        console.log("generating NEWPAIE ");
        this.clotureService.generateNewPaieFiles().subscribe(
          (data) => {
            if (data != null) {
              //console.log(data);
              let msg = "Les fichiers newpaie ont bien été générés et la paie a bien été cloturée.";
              this.showSpinner = false;
              this.showAlert(msg);
            } else {
              alert("Une erreur s'est produite.Veuillez réessayer plus tard\n(Le processus ne peut pas accéder au fichier car ce fichier est utilisé par un autre processus)");
            }

          },

          (error) => {
            //console.log(error);
            alert(error);
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
        message: " Les fichiers frub ont bien été générés et la paie a bien été cloturée."

        , callback: function () {
          window.location.reload();
        }
      });
    }


  }
}
