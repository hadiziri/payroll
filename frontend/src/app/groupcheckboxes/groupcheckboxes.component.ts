import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-groupcheckboxes',
  templateUrl: './groupcheckboxes.component.html',
  styleUrls: ['./groupcheckboxes.component.css']
})
export class GroupcheckboxesComponent implements OnInit {
  @Input() 
  selectedEtat:any;
  constructor() { }

  ngOnInit(): void {
  }

   /*sauvgarder les file to print
   SelectFileToPrint() {
    this.selectedStructureIds = this.fileToPrintFormGroup.controls['structureSelected'].value
      .map(
        (checked: any, i: any) =>
          checked ? this.strucures[i].idstructure : null
      )
      .filter((v: any) => v !== null);


    this.selectedEtatsIds = this.fileToPrintFormGroup.controls['etatSelected'].value
      .map((checked: any, i: any) =>
        checked ? this.toutLesEtats[i].idfiletype : null)
      .filter((v: any) => v !== null);

    for (let j = 0; j < this.selectedStructureIds.length; j++) {

      for (let i = 0; i < this.selectedEtatsIds.length; i++) {
        let file: FileToPrint = {
          "idFileType": 0,
          "idStructure": 0,
          "addedDate": new Date()
        };
        file.idStructure = this.selectedStructureIds[j];
        file.idFileType = this.selectedEtatsIds[i];
        console.log(file);
        this.comService.saveFileToPrint(file).subscribe(
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
          })
      }
    }




  }*/
}
