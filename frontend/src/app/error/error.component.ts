import { mobiscroll, MbscFormOptions } from '@mobiscroll/angular-lite';
import { AuthLoginInfo } from './../auth/login-info';
import { TokenStorageService } from './../auth/token-storage.service';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  form: any = {};
  isLoginFailed = false;
  private loginInfo: AuthLoginInfo=new AuthLoginInfo("","");
  isLoggedIn = false;
  errorMessage = '';
  formSettings: MbscFormOptions = {
    theme: 'mobiscroll',
    themeVariant: 'light'
};
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,private router:Router ) { }

  ngOnInit(): void {
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
         
          this.isLoggedIn = true;
         this.router.navigateByUrl("home");
        }
        
      
      },
      error => {
        console.log(error);
        this.errorMessage = error;
     
        this.isLoginFailed = true;
      }
    );
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
