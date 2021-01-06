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
import { error } from 'protractor';
import { newArray, stringify } from '@angular/compiler/src/util';
import { mobiscroll, MbscFormOptions } from '@mobiscroll/angular-lite';
import { Folder } from '../Models/folder';
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
  etat: String = "";
  ELEMENT_DATA: clotureFiles[] = [];
  folderCategories: Folder[] = [];
  state: number = -1;
  array = Array<EtatElement>();
  showSpinner: Boolean = false;

  dataSource: MatTableDataSource<clotureFiles> = new MatTableDataSource(this.ELEMENT_DATA);
  formSettings: MbscFormOptions = {
    theme: 'mobiscroll',
    themeVariant: 'light'
  };


  fileToPrintFormGroup: FormGroup = new FormGroup({});




  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
     private clotureService: CloturePaieService, 
     private homeService:HomeService,
    ) {


    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/' + this.icon_etat));

  }

  ngOnInit() {
    this.homeService.getAllStructures().subscribe(
      (data) => {

        console.log(data);
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

      },
      error => {
        console.log(error);
        alert(error);
        throw error;

      }
    );

    this.clotureService.getallFolders().subscribe(
      (data) => {
        if (data != null) {
          console.log(data);
          this.folderCategories = data;

        } else {
          alert("Une erreur s'est produite.Veuillez réessayer plus tard");
        }
      },
      (error) => {
        console.log(error);
        alert(error);
        throw error;
      }


    );
  }

  getFiles(event: any) {

    this.ELEMENT_DATA.slice(0, this.ELEMENT_DATA.length);
    console.log("here")
    let folder: Folder = { "idfolder": 0, "foldername": event.tab.textLabel, "folderpath": "", "statusfolder": 0 };
    console.log(folder);
    this.clotureService.getFilesByFolder(folder).subscribe(
      (data) => {
        //console.log(data);
        this.ELEMENT_DATA = data;

        for (let i = 0; i < data.length; i++) {

          this.getEtatFile(data[i]);

        }
        console.log(this.array.length)


      },
      (error) => {
        console.log(error);
        alert(error);
        throw error;
      }


    );
  }


  getEtatFile(file: clotureFiles) {
    this.array.splice(0, this.array.length)
    this.clotureService.getEtatFile(file).subscribe(

      (data) => {
        console.log(data);
        this.state = data;
        this.array.push({ "idFile": file.idfiletype, "etat": this.state })
        console.log(this.array)
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

      },
      (error) => {
        console.log(error);
        alert(error);
        throw error;
      }


    );

  }

  generateFiles(description:string){
    console.log(description);
    this.showSpinner=true;
   switch (description) {
			case "TABLES":
				this.clotureService.generateTableFiles().subscribe(
          (data)=>{
            if(data!=null){
              console.log(data);
              let msg="Les fichiers tables ont bien été générés et la paie a bien été cloturée.";
              this.showSpinner=false;
              this.showAlert(msg);
            }else{
              alert("Une erreur s'est produite.Veuillez réessayer plus tard");
            }
            
          },

          (error) => {
            console.log(error);
            alert(error);
            throw error;
          }
    


        );
				break;

			case "SYSTEME":
        this.clotureService.generateSystemFiles().subscribe(
          (data)=>{
            if(data!=null){
            console.log(data);
            let msg="Les fichiers systèmes ont bien été générés et la paie a bien été cloturée.";
            this.showSpinner=false;
            this.showAlert(msg);
            }else{
              alert("Une erreur s'est produite.Veuillez réessayer plus tard");
            }

          },

          (error) => {
            console.log(error);
            alert(error);
            throw error;
          }

        )
	
				break;

			case "FRUB":
          this.clotureService.generateFrubFiles().subscribe(
            (data)=>{
              if(data!=null){
                console.log(data);
                let msg="Les fichiers frub ont bien été générés et la paie a bien été cloturée.";
                this.showSpinner=false;
                this.showAlert(msg);
              }else{
                alert("Une erreur s'est produite.Veuillez réessayer plus tard");
              }
             
            },
  
            (error) => {
              console.log(error);
              alert(error);
              throw error;
            }
          )
				break;

			case "PERS":
		this.clotureService.generatePersFiles().subscribe(

      (data)=>{
        if(data!=null){
          console.log(data);
          let msg="Les fichiers pers ont bien été générés et la paie a bien été cloturée.";
          this.showSpinner=false;
          this.showAlert(msg);
        }else{
          alert("Une erreur s'est produite.Veuillez réessayer plus tard");
        }
       
      },

      (error) => {
        console.log(error);
        alert(error);
        throw error;
      }
    )
        break;

        case "NEWPAIE":
          console.log("generating NEWPAIE ");
        this.clotureService.generateNewPaieFiles().subscribe(
          (data)=>{
            if(data!=null){
              console.log(data);
              let msg="Les fichiers newpaie ont bien été générés et la paie a bien été cloturée.";
              this.showSpinner=false;
              this.showAlert(msg);
            }else{
              alert("Une erreur s'est produite.Veuillez réessayer plus tard");
            }
            
          },

          (error) => {
            console.log(error);
            alert(error);
            throw error;
          }
        )
				break;

  }
}


showAlert(message:string) {
  mobiscroll.alert({
    title: 'Cloture Paie',
    message: message
   
     ,callback: function () {
      window.location.reload();
     }
  });
  
}
}
