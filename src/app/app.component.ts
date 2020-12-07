import { CommunicationService } from './Services/communication.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'first-app';
  structures=['9ZK','5X1','ASL','AST','COM','CPE','CRD','DG','DP','EXP','FOR','IAP','LTH','PEC','PED','16','17','18','19'];

  constructor(private comService:CommunicationService){

  }
  GenerateFile(name :number){
   
    this.comService.getFiles(this.structures[name]).subscribe(
      data=>{ console.log(data)
        }
      ,
      err=>{ console.log(err);}
      
    );
    alert("report generated in path");
  }
}
