import { FileToPrint } from './../Models/FileToPrint';
import { Component, OnInit } from '@angular/core';
import { Structure } from '../Models/Structure';
import { clotureFiles } from '../Models/cloturesFiles';
import { MatCheckbox} from '@angular/material/checkbox';
import { CommunicationService } from './../Services/communication.service';
import { ViewChildren, QueryList } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { mobiscroll, MbscFormOptions } from '@mobiscroll/angular-lite';

@Component({
  selector: 'app-file-to-print-settings',
  templateUrl: './file-to-print-settings.component.html',
  styleUrls: ['./file-to-print-settings.component.css']
})
export class FileToPrintSettingsComponent implements OnInit {
  @ViewChildren("checkboxes",{ read: MatCheckbox }) checkboxes: QueryList<MatCheckbox>=new QueryList;
  fileToPrintFormGroup: FormGroup= new FormGroup({});
  strucures:Structure[]=[];
  toutLesEtats:clotureFiles[]=[];
  selectedStructureIds :[]=[];
  selectedEtatsIds :[]=[];
  formSettings: MbscFormOptions = {
    theme: 'mobiscroll',
    themeVariant: 'light'
};
  
  
  get etatFormArray() {
    return this.fileToPrintFormGroup.controls['etatSelected'] as FormArray;
  }
  get structureFormArray() {
    return this.fileToPrintFormGroup.controls['structureSelected'] as FormArray;
  }
  constructor(private _formBuilder: FormBuilder,private comService:CommunicationService) { 
     //initilaisation du form pour selection de la structure et des etats
     this.fileToPrintFormGroup=this._formBuilder.group({
      structureSelected: new FormArray([]),
      etatSelected: new FormArray([])
    });
    //get all etats to select file to print

    this.comService.getEtats().subscribe(
      (data)=>{
      this.toutLesEtats=data;
      this.addCheckboxes();
      console.log(data);
      

      },
      error=>{
          console.log(error);
          alert(error);
          throw error;
          
      }
    );

     //get all structures pour les file to print
     this.comService.getAllStructures().subscribe(
      (data)=>{
      this.strucures=data;
      this.addToggles();
      console.log(data);
      

      },
      error=>{
          console.log(error);
          alert(error);
          throw error;
          
      }
    );
      
  }
  
  private addCheckboxes() {
    this.toutLesEtats.forEach(() => this.etatFormArray.push(new FormControl(false)));
  }
  addToggles(){
    this.strucures.forEach(() => this.structureFormArray.push(new FormControl(false)));
    
  }
  ngOnInit(): void {
  }


  //sauvgarder les file to print
SelectFileToPrint(){
  this.selectedStructureIds = this.fileToPrintFormGroup.controls['structureSelected'].value
    .map(
      (checked:any, i:any) => 
        checked ?  this.strucures[i].idstructure: null
      )
      .filter((v:any )=> v !== null);
      
     
      this.selectedEtatsIds = this.fileToPrintFormGroup.controls['etatSelected'].value
      .map((checked:any, i:any) => 
      checked ? this.toutLesEtats[i].idfiletype : null)
      .filter((v:any )=> v !== null);
      
      for(let j=0;j<this.selectedStructureIds.length;j++){
    
        for(let i=0;i<this.selectedEtatsIds.length;i++){
          let file:FileToPrint={
            "idFileType":0,
            "idStructure":0,
            "addedDate":new Date()
          };
          file.idStructure=this.selectedStructureIds[j];
          file.idFileType=this.selectedEtatsIds[i];
          console.log(file);
          this.comService.saveFileToPrint(file).subscribe(
            data=>{
              console.log(data);
              if(data===null){
                alert("Une erreur s'est produite.Veuillez réessayer plus tard");
                setTimeout(function(){
                  window.location.reload();
               }, 2000);
              }else{
                this.showAlert();
              
                setTimeout(function(){
                  window.location.reload();
               }, 2000);
              }
              
          },
          error=>{
          console.log(error);
          alert(error);
          throw error;
          })
        }
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
/*uncheckAll() {
console.log(this.fileToPrintFormGroup.controls['etatSelected'].value);
this.checkboxes.forEach((element) => {
  
      for(let i=0;i<this.selectedEtatsIds.length;i++){
        let id=this.selectedEtatsIds[i].id;
        this.fileToPrintFormGroup.controls['etatSelected'].value[id]=false;
      }
      
});
this.selectedEtatsIds=[{"idEtat":null,"id":null}];
console.log(this.fileToPrintFormGroup.controls['etatSelected'].value);
}*/
}
