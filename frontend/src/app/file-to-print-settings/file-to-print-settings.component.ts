import { FileToPrint } from './../Models/FileToPrint';
import { Component, OnInit, AfterViewInit, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { Structure } from '../Models/Structure';
import { clotureFiles } from '../Models/cloturesFiles';
import { MatCheckbox } from '@angular/material/checkbox';
import { CommunicationService } from './../Services/communication.service';
import { ViewChildren, QueryList } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { mobiscroll, MbscFormOptions } from '@mobiscroll/angular-lite';
import { coerceStringArray } from '@angular/cdk/coercion';

export interface Element {
  "idStructure": number,
  "idEtat": [number]
}

@Component({
  selector: 'app-file-to-print-settings',
  templateUrl: './file-to-print-settings.component.html',
  styleUrls: ['./file-to-print-settings.component.css']
})
export class FileToPrintSettingsComponent implements OnInit,AfterViewChecked,AfterContentChecked{
  @ViewChildren("checkboxes", { read: MatCheckbox }) checkboxes: QueryList<MatCheckbox> = new QueryList;
  fileToPrintFormGroup: FormGroup = new FormGroup({});
  strucures: Structure[] = [];
  toutLesEtats: clotureFiles[] = [];
  finalEtatSelected:FileToPrint[] = [];
  finalEtatDeselected:FileToPrint[] = [];
  allFileToPrint: FileToPrint[] = [];
  intermediaireFileToPrint: FileToPrint[] = [];
  selectedStructureIds: [] = [];
  selectedEtatsIds: [] = [];
  exist:Boolean=false;
    index:number=0;
  dontPush:Boolean=false;
  initialisation:Boolean=true;
  formSettings: MbscFormOptions = {
    theme: 'mobiscroll',
    themeVariant: 'light'
  };

  etatSelectedForStructure: Element[] = [];
  selectedCheckBoxes:[number] = [0];
  size: number = 0;
  get etatFormArray() {
    return this.fileToPrintFormGroup.controls['etatSelected'] as FormArray;
  }
  get structureFormArray() {
    return this.fileToPrintFormGroup.controls['structureSelected'] as FormArray;
  }
  constructor(private _formBuilder: FormBuilder, private comService: CommunicationService) {


  }

  addToggles() {
    console.log("toggles");
    let i: number = 0;
    let exist: Boolean = false;
    //
    for (let j = 0; j < this.strucures.length; j++) {
      i = 0;

      while (i < this.allFileToPrint.length) {
        exist = false;
        if (this.strucures[j].idstructure == this.allFileToPrint[i].idStructure) {

          exist = true;
          break;
        }
        i++;
      }
      if (!exist) {
        this.structureFormArray.push(new FormControl(false))


      } else {
        this.structureFormArray.push(new FormControl(true))

      }
     

    }


  }

  getAllSelectedEtatWithStructure() {
    console.log("structureswithEtat");
    let i = 0;
    for (i; i < this.strucures.length; i++) {
      let file: FileToPrint = {
        "idFileType": i,
        "idStructure": this.strucures[i].idstructure,
        "addedDate": new Date()
      };

      this.getEtatsPrinted(file);
    }


  }


  getEtatsPrinted(file: FileToPrint) {
    console.log("getEtatsPrinted")
    let ids: [number] = [0];
    let idS: number;
    ids.pop();
    this.comService.getSelectedEtat(file).subscribe(
      data => {

        if (data.length != 0) {
        
          if(data.length==1){
            this.etatSelectedForStructure.push({
              "idStructure": data[0].idStructure,
              "idEtat": [data[0].idFileType]
            });
          }
          let i = 1;
          while (i < data.length) {


            if (data[i - 1].idStructure == data[i].idStructure) {
              ids.push(data[i - 1].idFileType);
              idS = file.idStructure;
            
            }
            i++;
           // console.log(data[i].idStructure+"  "+data[i+1].idStructure);
             
          }

          ids.push(data[data.length - 1].idFileType);

          this.size = this.etatSelectedForStructure.push({
            "idStructure": idS,
            "idEtat": ids
          });
        //  console.log(this.etatSelectedForStructure);

        }

        if (file.idStructure == this.strucures.length) {
          this.addCheckboxes();

        }


      },
      error => {
        console.log(error);
        alert(error);
        throw error;

      }
    );


  }
  private addCheckboxes() {

    for (let k = 0; k < this.toutLesEtats.length; k++) {
     
      this.etatFormArray.push(new FormControl(false));
      }
    

  }

test(){
  return true;
}

  isChecked(idStructure: number, idEtat: number):Boolean {
    for(let i=0;i<this.etatSelectedForStructure.length;i++){
      if(this.etatSelectedForStructure[i].idStructure==idStructure){
        if(this.etatSelectedForStructure[i].idEtat.indexOf(idEtat)!=-1){
          return true;
        }
      }
    }
    return false;
  }

  ngAfterViewChecked(){
    
  }
  ngAfterContentChecked(){
  
   
  }

  ngOnInit(): void {
    console.log("onInit");
    //get all structures pour les file to print
    this.comService.getAllStructures().subscribe(
      (data) => {
        this.strucures = data;
        console.log(data);
        //this.getAllSelectedEtatWithStructure();


      },
      error => {
        console.log(error);
        alert(error);
        throw error;

      }
    );


    //initilaisation du form pour selection de la structure et des etats
    this.fileToPrintFormGroup = this._formBuilder.group({
      structureSelected: new FormArray([]),
      etatSelected: new FormArray([])
    });



    

    //get all etats to select file to print

    this.comService.getEtats().subscribe(
      (data) => {
        this.toutLesEtats = data;
        this.addToggles();
        this.getAllSelectedEtatWithStructure();
        console.log(data);


      },
      error => {
        console.log(error);
        alert(error);
        throw error;

      }
    );

    //get all files to print
    this.comService.getAllFileToPrint().subscribe(
      (data) => {
        this.allFileToPrint = data;

        console.log(data);


      },
      error => {
        console.log(error);
        alert(error);
        throw error;

      }
    );

  }



  //sauvgarder les file to print
  SelectFileToPrint() {
 
      this.comService.saveFileToPrint(this.finalEtatSelected).subscribe(
        data => {
          console.log(data);
          if (data === null) {
            alert("Une erreur s'est produite.Veuillez réessayer plus tard");
            setTimeout(function () {
              window.location.reload();
            }, 2000);
          } else {
            this.showAlert();

            setTimeout(function () {
              window.location.reload();
            }, 2000);
          }

        },
        error => {
          console.log(error);
          alert(error);
          throw error;
        });
    


      this.comService.deleteFileToPrint(this.finalEtatDeselected).subscribe(
        data => {
          console.log(data);
          if (data === null) {
            alert("Une erreur s'est produite.Veuillez réessayer plus tard");
            setTimeout(function () {
              window.location.reload();
            }, 2000);
          } else {
            this.showAlert();

            setTimeout(function () {
              window.location.reload();
            }, 2000);
          }

        },
        error => {
          console.log(error);
          alert(error);
          throw error;
        });
    
    
      }
    




  

  updateCheckBoxes(){
      if(this.initialisation){
        this.selectedCheckBoxes.splice(0,this.selectedCheckBoxes.length);
    
    
        for(let i=0;i<this.strucures.length;i++){
          for(let j=0;j<this.toutLesEtats.length;j++){
              if(this.isChecked(this.strucures[i].idstructure,this.toutLesEtats[j].idfiletype)){
                  this.selectedCheckBoxes.push(1);
              }else{
                this.selectedCheckBoxes.push(-1);
              }
          }
        }
        
        this.checkboxes.forEach((element,k:number) => {
          
          if(this.selectedCheckBoxes[k]==1){
            element.checked=true;
            
          }
         
        });
       
        console.log(this.selectedCheckBoxes);
        this.initialisation=false;
      }
     
    
    }
  //alert pour le FileToPrint selection
  showAlert() {
    mobiscroll.alert({
      title: 'Fichier à imprimer',
      message: "Vos modification ont bien été enregistrées"
      /* ,callback: function () {
           mobiscroll.toast({
               message: 'Alert closed'
           });
       }*/
    });
  }

  updateSelectedEtatForStructure(idEtat:number,idStructure:number){
    let file:FileToPrint={
      "idFileType":idEtat,
      "idStructure":idStructure,
      "addedDate":new Date()
    }
    
    this.intermediaireFileToPrint=this.allFileToPrint;
    for(let i=0;i<this.intermediaireFileToPrint.length;i++){
      if(this.intermediaireFileToPrint[i].idStructure==idStructure && this.intermediaireFileToPrint[i].idFileType==idEtat){
        this.exist=true;
        this.index=i;
      }
    }
    
   
    if(this.exist){
      this.finalEtatDeselected.push(file);
      this.intermediaireFileToPrint.splice(this.index,1);
    }else{
      
      for(let i=0;i<this.finalEtatDeselected.length;i++){
        if(this.finalEtatDeselected[i].idStructure==idStructure && this.finalEtatDeselected[i].idFileType==idEtat){
          this.finalEtatDeselected.splice(i,1);
          this.dontPush=true;
        }
      }
      if(!this.dontPush){
        this.finalEtatSelected.push(file);
      }
     
    }
    console.log(this.finalEtatDeselected);
    console.log(this.finalEtatSelected);
  }

}
