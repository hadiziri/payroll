import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-files-generator',
  templateUrl: './files-generator.component.html',
  styleUrls: ['./files-generator.component.css']
})
export class FilesGeneratorComponent implements OnInit {
  structures=['9ZK','5X1','ASL','AST','COM','CPE','CRD','DG','DP','EXP','FOR','IAP','LTH','PEC','PED','16','17','18','19'];
  constructor() { }

  ngOnInit(): void {
  }



  GenerateFile(name :number){
   
   /* this.comService.getFiles(this.structures[name]).subscribe(
      data=>{ console.log(data)
        }
      ,
      err=>{ console.log(err);}
      
    );
  }*/
}
   
}
