import { Router } from '@angular/router';
import { TokenStorageService } from './../auth/token-storage.service';

import { CustomerService } from './../Services/customer.service';
import { Customer, Representative } from './../Models/costumers';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import { Structure } from '../Models/Structure';
import { CommunicationService } from '../Services/communication.service';
import { error } from 'protractor';
import { newArray, stringify } from '@angular/compiler/src/util';
import { mobiscroll, MbscFormOptions } from '@mobiscroll/angular-lite';


export interface PeriodicElement {
  nomStructure: string;
  position: number;
  codeStructure: String;
  emailGrpeG: string;
  etatStructure:number;
  action:number;
}



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {

  displayedColumns: string[] = ['IDSTRUCTURE','STRUCTURENAME', 'STRUCTURECODELIKE', 'EMAILGROUPMANAGERS', 'STATUSSTRUCTURE','action'];
 
  icon_etat:String="vert.svg";
  etat:String="";
  ELEMENT_DATA:Structure[]=[];
  dataSource :MatTableDataSource<Structure> =new MatTableDataSource(this.ELEMENT_DATA) ;
  formSettings: MbscFormOptions = {
    theme: 'mobiscroll',
    themeVariant: 'light'
};
    
  

  @ViewChild(MatSort) set matSort(sort:MatSort){
    this.dataSource.sort=sort;
  }
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
       this.dataSource.paginator = paginator;
      }

         
        constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,private comService:CommunicationService,private token: TokenStorageService,private router: Router) {
         
           
          iconRegistry.addSvgIcon(
              'thumbs-up',
              sanitizer.bypassSecurityTrustResourceUrl('assets/img/'+this.icon_etat));
              
        }

    ngOnInit() {
      this.comService.getAllStructures().subscribe(
        (data)=>{
        this.ELEMENT_DATA=data;
        this.dataSource=new MatTableDataSource(this.ELEMENT_DATA);

        },
        error=>{
            console.log(error);
        }
      )
        }

        cloturerPaie(){
          this.comService.cloturePaie().subscribe(
            data=>{
                console.log(data);
                this.showAlert();
            },
            error=>{
                console.log(error);
            }
          )
        }
          
        logout() {
          this.token.signOut();
        
          this.router.navigate(['auth/login']);
          window.location.reload();
        }
        showAlert() {
          mobiscroll.alert({
              title: 'Cloture Paie',
              message: "Les fichiers ont bien été générés et la paie a bien été cloturée."
             /* ,callback: function () {
                  mobiscroll.toast({
                      message: 'Alert closed'
                  });
              }*/
          });
      }
}
