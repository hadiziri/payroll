import { TokenStorageService } from './auth/token-storage.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'first-app';
  public connection:Boolean=false;

  constructor(private tokenStorage: TokenStorageService){

  }
 
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.connection=true;
    }
  }
}
