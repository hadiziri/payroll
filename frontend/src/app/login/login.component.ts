import { Router, Routes } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { AuthLoginInfo } from '../auth/login-info';
import { mobiscroll, MbscFormOptions } from '@mobiscroll/angular-lite';

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

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,private router:Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.router.navigate(["/home"]);

    }
  }

  onSubmit() {
    console.log(this.form);

    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        
        if(data.accessToken=="xx.yy.zz"){
          this.showAlert();
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
        console.log(error);
        this.errorMessage = error.error.message;
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

  showAlert() {
    mobiscroll.alert({
        title: 'Alerte de connexion',
        message: "Votre compte n'est pas activé.Veuillez contacter votre administrateur"
       /* ,callback: function () {
            mobiscroll.toast({
                message: 'Alert closed'
            });
        }*/
    });
}
}
