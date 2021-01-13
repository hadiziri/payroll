import { TokenStorageService } from './../auth/token-storage.service';
import { ParametreService } from './../Services/parametre.service';
import { Router } from '@angular/router';
import { FileToPrint } from './../Models/FileToPrint';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { Observable } from 'rxjs';

import { User } from './../Models/User';
import { UserService } from './../Services/user.service';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MustExist, MustMatch } from '../helpers/must-match-validator';
import { mobiscroll, MbscFormOptions } from '@mobiscroll/angular-lite';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
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

  constructor(private _formBuilder: FormBuilder, private userService: UserService,private token: TokenStorageService) {


  }


  ngOnInit(): void {
  //get currentUser
this.username=this.token.getUsername();
//console.log(this.username)
    //initialisation des forms pour le changement du psw
    this.firstFormGroup = this._formBuilder.group({
      username: ['', Validators.required]
    },
    {validator :MustExist(this.username,'username')});
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
    let username: string = this.firstFormGroup.controls['username'].value;
    let psw: string = this.secondFormGroup.controls['psw'].value;
    user.username = username;
    user.password = psw;
    this.userService.updatePsw(user).subscribe(
      data => {
        //console.log(data);
        this.showAlert();
        this.isDisabled = true;
      },
      error => {
        //console.log(error);
        alert(error);
        throw error;

      }
    );
  }
  //alert pour le changement du psw
  showAlert() {
    mobiscroll.alert({
      title: 'Changement du mot de passe',
      message: "Votre mot de passe  a bien été modifié."
      /* ,callback: function () {
           mobiscroll.toast({
               message: 'Alert closed'
           });
       }*/
    });
  }




}
