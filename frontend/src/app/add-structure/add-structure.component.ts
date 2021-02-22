import { ErrorDialogComponent } from './../error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from './../alert-dialog/alert-dialog.component';
import { MbscFormOptions, mobiscroll } from '@mobiscroll/angular-lite';
import { Structure } from './../Models/Structure';
import { ArchiveStructure } from './../Models/ArchiveStructure';
import { User } from './../Models/User';
import { ShActivity } from './../Models/ShActivity';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorageService } from './../auth/token-storage.service';
import { ParametreService } from './../Services/parametre.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-structure',
  templateUrl: './add-structure.component.html',
  styleUrls: ['./add-structure.component.css']
})
export class AddStructureComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  titleAlert: string = 'Champ obligatoire';
  allShActivities: ShActivity[] = [];
  StructureToAdd: Structure =
    {
      "idstructure": 0,
      "idactivity": 0,
      "emailgroupmanagers": "",
      "statusstructure": 3,
      "structurecodenotlike": "",
      "structurecodelike": "",
      "structurename": ""
    };
  structureArchive: ArchiveStructure = {
    "archemailgroupemanagers": "",
    "archstatusstructure": 3,
    "archstructurecodelike": "",
    "archstructurecodenotlike": "",
    "idactivity": 0,
    "archstructurename": "",
    "idstructure": 0,
    "iduser": 0,
    "structurearchiveddate": new Date(),
    "structureoperation":""
  }
  currentUser: User = {
    "email": "",
    "iduser": 0,
    "name": "",
    "password": "",
    "state": 0,
    "username": ""

  }
  messageAdded: Boolean = false;
  messageArchive: Boolean = false;
  formSettings: MbscFormOptions = {
    theme: 'mobiscroll',
    themeVariant: 'light'
  };
  constructor(private paramService: ParametreService, private token: TokenStorageService, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder
    ,public dialog: MatDialog) {

    this.formGroup = new FormGroup({
      structurename: new FormControl('', [Validators.required]),
      structurecodelike: new FormControl('', [Validators.required]),

      emailgroupemanagers: new FormControl('', [Validators.email, Validators.required]),
      idactivity: new FormControl('', [Validators.required]),
      structurecodenotlike: new FormControl('', [Validators.required])
    });

  }

  ngOnInit(): void {
    //get all ShActivities
    this.paramService.getAllShActivities().subscribe(
      (data) => {
        if (data != null) {
          this.allShActivities = data;

          //console.log("allshavtivities");
          //console.log(data);
        } else {
          this.openDialog();
        }
      },
      error => {
        //console.log(error);
         this.openDialogError(error);;
        throw error;
      }
    );
    //get currentUser
    this.currentUser.username = this.token.getUsername();
    //console.log(this.currentUser)
    this.paramService.getUserByUserName(this.currentUser).subscribe(
      data => {
        if (data != null) {

          // console.log(data);
          this.currentUser.iduser = data.iduser;
        } else {
          this.openDialog();
        }
      },
      error => {
        //console.log(error);
         this.openDialogError(error);;
        throw error;
      }


    );
  }

  getErrorEmail() {
    let object = this.formGroup.get('emailgroupemanagers');
    if (object != null) {
      return object.valid ? '' : 'Adresse email non valide';
    } else {
      return '';
    }

  }

  onSubmit(post: any) {
    //console.log(post)
    //structure to add
    this.StructureToAdd.structurename = post.structurename;
    this.StructureToAdd.structurecodelike = post.structurecodelike;
    this.StructureToAdd.emailgroupmanagers = post.emailgroupemanagers;
    this.StructureToAdd.idactivity = post.idactivity;
    this.StructureToAdd.structurecodenotlike = post.structurecodenotlike;

    //archive structure
    this.structureArchive.archstructurename = post.structurename;
    this.structureArchive.archstructurecodelike = post.structurecodelike;
    this.structureArchive.archstructurecodenotlike = post.structurecodenotlike;
    this.structureArchive.archemailgroupemanagers = post.emailgroupemanagers;
    this.structureArchive.iduser = this.currentUser.iduser;
    this.structureArchive.idactivity = post.idactivity;
    this.structureArchive.structureoperation="add";
    this.paramService.addStructure(this.StructureToAdd).subscribe(
      data => {
        if (data != null) {
          this.messageAdded = true;
          // console.log(data)
          this.archivateAddedStructure();
        } else {
          alert("Une erreur s'est produite.Veuillez réessayer plus tard");
        }
      },
      error => {
        //console.log(error);
         this.openDialogError(error);;
        throw error;
      }


    );




  }

  archivateAddedStructure() {
    this.paramService.addArchiveStructure(this.structureArchive).subscribe(

      data => {
        if (data != null) {
          this.messageArchive = true;
          // console.log(data)
          this.showAlert();
        } else {
          alert("Une erreur s'est produite.Veuillez réessayer plus tard");
        }
      },
      error => {
        //console.log(error);
         this.openDialogError(error);;
        throw error;
      }




    )
  }

  //alert pour le FileToPrint selection
  showAlert() {

    if (this.messageAdded && this.messageArchive) {
      mobiscroll.alert({
        title: 'Ajout de structure',
        message: "La structure a bien été ajoutée"
      }).then((result) => {
        this.router.navigateByUrl("home");
      }
      )
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
