import { AlertDialogComponent } from './../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router, Routes } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { AuthLoginInfo } from '../auth/login-info';
import { mobiscroll, MbscFormOptions } from '@mobiscroll/angular-lite';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  state=0;
  private loginInfo: AuthLoginInfo=new AuthLoginInfo("","");
  formSettings: MbscFormOptions = {
    theme: 'mobiscroll',
    themeVariant: 'light'
};

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,private router:Router,public dialog: MatDialog) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      //this.router.navigate(["/home"]);
      this.router.navigate(["cloturePaie"]);

    }
  }

  onSubmit() {
    //console.log(this.form);

    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        
        if(data.accessToken=="xx.yy.zz"){
          this.showAlert('Alerte de connexion',"Votre compte n'est pas activé.Veuillez contacter votre administrateur");
        }else{
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUsername(data.username);
        
  
          this.isLoginFailed = false;
          this.state=2;
          this.isLoggedIn = true;
          this.reloadPage();
        }
        
      
      },
      error => {
       // console.log(error);
       this.showAlert('Alerte de connexion',"Nom d'utilisateur ou mot de passe incorrect");
        //this.errorMessage = error.error.message;
        this.state=0;
        this.isLoginFailed = true;
        
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  register(){
    this.state=1;
  }

  showAlert(title:String,msg:String) {
    mobiscroll.alert({
        title: title,
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
}
