import { Router } from '@angular/router';
import { TokenStorageService } from './../auth/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { mobiscroll, MbscFormOptions } from '@mobiscroll/angular-lite';
import { CONTEXT_NAME } from '@angular/compiler/src/render3/view/util';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public connection:Boolean=false;
  
  formSettings: MbscFormOptions = {
    theme: 'mobiscroll',
    themeVariant: 'light'
  };
  constructor(private tokenStorage: TokenStorageService,private router: Router) { }


  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.connection=true;
   
    }
  }
  logout() {
    //console.log("deconnexion")
    this.connection=false;
    this.tokenStorage.signOut();
  
    this.router.navigateByUrl("auth/login");
    window.location.reload();
  }
  showConfirm() {
 
  mobiscroll.confirm({
    title: 'Déconnexion',
    message: 'Voulez vous vraiment vous déconnecter?',
    okText: 'Oui',
    cancelText: 'Non'
  
}).then( (result) => {
  //console.log(result ? 'Agreed.' : 'Disagreed.');
  if(result){
   this.logout();
  }
}); 

}



}
