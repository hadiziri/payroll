import { ErrorDialogComponent } from './../error-dialog/error-dialog.component';
import { AlertDialogComponent } from './../alert-dialog/alert-dialog.component';
import { TokenStorageService } from './../auth/token-storage.service';
import { ParametreService } from './../Services/parametre.service';
import { Router } from '@angular/router';
import { FileToPrint } from './../Models/FileToPrint';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { Observable } from 'rxjs';

import { User } from './../Models/User';
import { UserService } from './../Services/user.service';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MustExist, MustMatch } from '../helpers/must-match-validator';
import { mobiscroll, MbscFormOptions } from '@mobiscroll/angular-lite';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  //encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class SettingsComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup = new FormGroup({});
  secondFormGroup: FormGroup = new FormGroup({});


  isOpen: number = 1;
  psw: Boolean = false;
  print: Boolean = false;
  registerForm: FormGroup = new FormGroup({});
  submitted = false;
  formSettings: MbscFormOptions = {
    theme: 'mobiscroll',
    themeVariant: 'light'
  };
  isDisabled: Boolean = false;
  panelOpenState = false;
 username:string="";

  constructor(private _formBuilder: FormBuilder, private userService: UserService,private token: TokenStorageService,public dialog: MatDialog) {


  }


  ngOnInit(): void {
  //get currentUser
this.username=this.token.getUsername();
// //console.log(this.username)
    //initialisation des forms pour le changement du psw
    this.firstFormGroup = this._formBuilder.group({
      username: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      psw: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validator: MustMatch('psw', 'confirm')
    }
    );

  }


  //chnager le mot de passe et le sauvgarder
  changerPsw() {
    let user: User = {
      "password": "",
      "email": "",
      "iduser": 0,
      "name": "",
      "state": 0,
      "username": ""
    };
    
    let ancienPsw: string = this.firstFormGroup.controls['username'].value;
    // //console.log(ancienPsw)
    let psw:string=this.secondFormGroup.controls['psw'].value;
    // //console.log(psw)
    user.username = this.username;
    user.password = ancienPsw;
    this.userService.comparePsw(user).subscribe(
      data => {
        if(data!=null){
          if(data.state==1){
            user.password=psw;
              this.updatePsw(user)
          }else{
              this.showAlert("Votre ancien mot de passe est incorrect.Veuillez le modifier et réessayer.")
          }
        }else{
          this.openDialog();
        }
      },
      error => {
        // //console.log(error);
         this.openDialogError(error);;
        throw error;

      }

    );






  }

  updatePsw(user:User){

    this.userService.updatePsw(user).subscribe(
      data => {
        if(data!=null){
      // //console.log(data);
      this.showAlert("Votre mot de passe  a bien été modifié.");
      this.isDisabled = true;
        }else{
          this.openDialog();
        }
        
      },
      error => {
        // //console.log(error);
         this.openDialogError(error);;
        throw error;

      }
    );
  }
  //alert pour le changement du psw
  showAlert(msg:String) {
    mobiscroll.alert({
      title: 'Changement du mot de passe',
      message: msg
      /* ,callback: function () {
           mobiscroll.toast({
               message: 'Alert closed'
           });
       }*/
    });
  }

  openDialog() {
    this.dialog.open(AlertDialogComponent);
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
