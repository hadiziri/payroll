import { ErrorDialogComponent } from './../error-dialog/error-dialog.component';
import { FolderArchive } from './../Models/FolderArchive';
import { ArchiveStructure } from './../Models/ArchiveStructure';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MbscFormOptions } from '@mobiscroll/angular-lite';
import { MatTableDataSource } from '@angular/material/table';
import { EmailDB } from './../Models/EmailDB';
import { AlertDialogComponent } from './../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ParametreService } from './../Services/parametre.service';
import { User } from './../Models/User';
import { TokenStorageService } from './../auth/token-storage.service';
import { HistoriqueService } from './../Services/historique.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface FileElement {
  
  idemail: number;

  filename: String[];
  
}

@Component({
  selector: 'app-navigation-history',
  templateUrl: './navigation-history.component.html',
  styleUrls: ['./navigation-history.component.css']
})
export class NavigationHistoryComponent implements OnInit {
  step = 0;
  currentUser: User = {
    "email": "",
    "iduser": 0,
    "name": "",
    "password": "",
    "state": 0,
    "username": ""

  }
  allFiles:FileElement[]=[];
  operationsStructure:String[]=["Structures ajoutées","Structures supprimées","Structures modifiées"]
  operationsFolder:String[]=["Dossiers ajoutés","Dossiers supprimés","Dossiers modifiés"]
  displayedColumnsEmail: string[] = ['idemail', 'receiver', 'emailgenerationdate', 'emailobject','msg','files'];
  displayedColumnsFolder: string[] = [ 'foldername', 'FOLDERPATH','folderarchiveddate'];
  ELEMENT_DATA: EmailDB[] = [];
  archiveStructure:ArchiveStructure[]=[];
  archiveFolder:FolderArchive[]=[];
  dataSourceEmail: MatTableDataSource<EmailDB> = new MatTableDataSource(this.ELEMENT_DATA);
  dataSourceStructure :MatTableDataSource<ArchiveStructure> = new MatTableDataSource(this.archiveStructure);
  dataSourceFolder:MatTableDataSource<FolderArchive> = new MatTableDataSource(this.archiveFolder);
  
  formSettings: MbscFormOptions = {
    theme: 'mobiscroll',
    themeVariant: 'light'
  };
  email:EmailDB={"emailgenerationdate":new Date(),"emailobject":"","idemail":0,"iduser":0,"msg":"","receiver":"","sender":""};
  operation:String="add";
  displayedColumnsStructure: string[] = ['idstructure', 'structurename', 'STRUCTURECODELIKE', 'EMAILGROUPMANAGERS', 'STATUSSTRUCTURE'];
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSourceEmail.sort = sort;
  }
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSourceEmail.paginator = paginator;
  }
 
 
  
  constructor(public dialog: MatDialog,private paramService: ParametreService,private token: TokenStorageService,private historiqueService:HistoriqueService) { }

  ngOnInit(): void {
    //get currentUser
     this.currentUser.username = this.token.getUsername();
     this.currentUser.name=this.operation;
     // //console.log(this.currentUser)
     this.paramService.getUserByUserName(this.currentUser).subscribe(
       data => {
         if (data != null) {
 
           //  //console.log(data);
           this.currentUser.iduser = data.iduser;
           this.getEmails();
         } else {
          this.openDialog();
         }
       },
       error => {
         // //console.log(error);
          this.openDialogError(error);;
         throw error;
       }
 
 
     );

     //all added structure (by default)(added)
     this.historiqueService.getArchiveStructure(this.currentUser).subscribe(
      (data) => {
        if (data != null) {
         
            //console.log(data)
         this.archiveStructure=data;
         this.dataSourceStructure= new MatTableDataSource(this.archiveStructure);
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
  //all added folder (by default)(added)
    this.historiqueService.getArchiveFolder(this.currentUser).subscribe(
      (data) => {
        if (data != null) {
         
            //console.log(data)
        this.archiveFolder=data;
         this.dataSourceFolder= new MatTableDataSource(this.archiveFolder);
        } else {
          this.openDialog();
        }


      },
      (error) => {
        //  //console.log(error);
         this.openDialogError(error);;
        throw error;
      }
    )
   
  }
  
  getEmails(){
    this.historiqueService.getAllEmails(this.currentUser).subscribe(
      (data) => {
        if (data != null) {
         //  //console.log(data);
          this.ELEMENT_DATA=data;
          this.dataSourceEmail = new MatTableDataSource(this.ELEMENT_DATA);
          for(let i=0;i<data.length;i++){
            this.getSentFiles(data[i]);
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

      )
  }

  getSentFiles(email:EmailDB){
    this.historiqueService.getSentFiles(email).subscribe(
      (data) => {
        if (data != null) {
         
           this.allFiles.push({"filename":data,"idemail":email.idemail});
         
         // //console.log(this.allFiles)
        } else {
          this.openDialog();
        }


      },
      (error) => {
        //  //console.log(error);
         this.openDialogError(error);;
        throw error;
      }
    )
  }
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  openDialog() {
    const dialogRef = this.dialog.open(AlertDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }

  getStructure(event:any){
     //console.log(event)
    if(event.tab.textLabel=="Structures ajoutées"){
      this.operation="add";
      
    }else{
      if(event.tab.textLabel=="Structures supprimées"){
        this.operation="delete";
      }else{
        this.operation="update";
      }

    }
    this.currentUser.name=this.operation;

    this.historiqueService.getArchiveStructure(this.currentUser).subscribe(
      (data) => {
        if (data != null) {
         
            //console.log(data)
         this.archiveStructure=data;
         
       
         this.dataSourceStructure= new MatTableDataSource(this.archiveStructure);
         
        } else {
          this.openDialog();
        }


      },
      (error) => {
        //  //console.log(error);
         this.openDialogError(error);;
        throw error;
      }
    )
  }

  getFolder(event:any){
    if(event.tab.textLabel=="Dossiers ajoutés"){
      this.operation="add";
    }else{
      if(event.tab.textLabel=="Dossiers supprimés"){
        this.operation="delete";
      }else{
        this.operation="update";
      }

    }
    this.currentUser.name=this.operation;
    this.historiqueService.getArchiveFolder(this.currentUser).subscribe(
      (data) => {
        if (data != null) {
         
            //console.log(data)
        this.archiveFolder=data;
        
         this.dataSourceFolder= new MatTableDataSource(this.archiveFolder);
        } else {
          this.openDialog();
        }


      },
      (error) => {
        //  //console.log(error);
         this.openDialogError(error);;
        throw error;
      }
    )
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


