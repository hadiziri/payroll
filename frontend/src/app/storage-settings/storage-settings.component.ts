import { HomeService } from './../Services/home.service';
import { Router } from '@angular/router';
import { TokenStorageService } from './../auth/token-storage.service';


import { Customer, Representative } from './../Models/costumers';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import { Structure } from '../Models/Structure';

import { error } from 'protractor';
import { newArray, stringify } from '@angular/compiler/src/util';
import { mobiscroll, MbscFormOptions } from '@mobiscroll/angular-lite';

@Component({
  selector: 'app-storage-settings',
  templateUrl: './storage-settings.component.html',
  styleUrls: ['./storage-settings.component.css']
})
export class StorageSettingsComponent implements OnInit {

  displayedColumns: string[] = ['IDSTRUCTURE','STRUCTURENAME', 'STRUCTURECODELIKE', 'EMAILGROUPMANAGERS','action'];
 
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

       
      constructor(private homeService:HomeService,private router: Router) {
       
         
      
            
      }

  ngOnInit() {
    this.homeService.getAllStructures().subscribe(
      (data)=>{
      this.ELEMENT_DATA=data;
      //console.log(data);
      this.dataSource=new MatTableDataSource(this.ELEMENT_DATA);

      },
      error=>{
       //   console.log(error);
          alert(error);
          throw error;
          
      }
    )
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
