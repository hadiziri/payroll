import { FormControl } from '@angular/forms';
import { SelectEtatFichierComponent } from './../select-etat-fichier/select-etat-fichier.component';
import { ErrorDialogComponent } from './../error-dialog/error-dialog.component';
import { AlertDialogComponent } from './../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ParametreService } from './../Services/parametre.service';
import { TokenStorageService } from './../auth/token-storage.service';
import { HomeService } from './../Services/home.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { User } from './../Models/User';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {  mobiscroll,MbscFormOptions } from '@mobiscroll/angular-lite';
import { MatTableDataSource } from '@angular/material/table';
import { Structure } from './../Models/Structure';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-send-etat-fichier',
  templateUrl: './send-etat-fichier.component.html',
  styleUrls: ['./send-etat-fichier.component.css']
})
export class SendEtatFichierComponent implements OnInit {
  displayedColumns: string[] = ['idstructure', 'structurename', 'STRUCTURECODELIKE', 'EMAILGROUPMANAGERS', 'action'];


  etat: String = "";
  ELEMENT_DATA: Structure[] = [];
  

  dataSource: MatTableDataSource<Structure> = new MatTableDataSource(this.ELEMENT_DATA);
  formSettings: MbscFormOptions = {
    theme: 'mobiscroll',
    themeVariant: 'light'
  };
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

 
  
  startDate = new Date(2000, 0, 2);
  moisPaie=new FormControl();
  dateDebut=new FormControl();
  dateFin=new FormControl();
  selectedPaieMonth:String[]=[];
  constructor(iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer, 
    private homeService:HomeService, 
    
    private paramService :ParametreService,
    public dialog: MatDialog,
    private _adapter: DateAdapter<any>) {

      this._adapter.setLocale('fr');
  

 }

  ngOnInit(): void {
    
    //get all structures
    this.homeService.getAllStructures().subscribe(
      (data) => {
        if(data!=null){
          this.ELEMENT_DATA = data;
         //console.log(data);
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          
        }else{
          this.openDialog();
        }
        
        
      },
      error => {
        // //console.log(error);
        this.openDialogError(error);
        throw error;

      }
    );
  

}

//envoyer des états 
sendEtat(structure:Structure){
  this.selectedPaieMonth=[];
  if(this.moisPaie.value!=null){
    let selectedMonth:String=this.getMoisPaie(this.moisPaie.value.toString());
    
    this.selectedPaieMonth.push(selectedMonth);
    console.log(this.selectedPaieMonth)
    this.selectEtatFichier(1,structure);
  }else{
    if(this.dateDebut.value!=null&&this.dateFin.value!=null){
      console.log("range")
    let selectedDateDebut:String=this.getMoisPaie(this.dateDebut.value.toString());
    
    
    let selectedDateFin:String=this.getMoisPaie(this.dateFin.value.toString());
   
    this.selectedPaieMonth=this.dateRange(selectedDateDebut,selectedDateFin)
    console.log(this.selectedPaieMonth)
    this.selectEtatFichier(1,structure);
    }else{
      this.showAlert("&#9888;"+"Alerte Envoi Etats","Veuillez sélectionner un mois paie ou bien un interval de mois")
    }
    
  }
  
 

}
//envoyer des fichiers
sendFichier(structure:Structure){
  this.selectedPaieMonth=[];
  if(this.moisPaie.value!=null){
    let selectedMonth:String=this.getMoisPaie(this.moisPaie.value.toString());
    this.selectedPaieMonth.push(selectedMonth);
    console.log(this.selectedPaieMonth)
    this.selectEtatFichier(2,structure);
  }else{
    if(this.dateDebut.value!=null&&this.dateFin.value!=null){
      console.log("range")
      let selectedDateDebut:String=this.getMoisPaie(this.dateDebut.value.toString()); 
      let selectedDateFin:String=this.getMoisPaie(this.dateFin.value.toString());
      this.selectedPaieMonth=this.dateRange(selectedDateDebut,selectedDateFin)
      console.log(this.selectedPaieMonth)
      this.selectEtatFichier(2,structure);
    }else{
        this.showAlert("&#9888;"+"Alerte Envoi Fichiers","Veuillez sélectionner un mois paie ou bien un interval de mois")
    }
   
  }
  
 
  
}
selectEtatFichier(state:number,structure:Structure){
  const dialogRef = this.dialog.open(SelectEtatFichierComponent, {
    width: '450px',
    data:{
      "state":state,
      "structure":structure,
      "selectedMonths":this.selectedPaieMonth

     }
  });
}
//to get all months selected from range
dateRange(startDate:String, endDate:String):String[] {
  var start      = startDate.split('-');
  var end        = endDate.split('-');
  var startYear  = parseInt(start[0]);
  var endYear    = parseInt(end[0]);
  var dates   :String[]    = [];

  for(var i = startYear; i <= endYear; i++) {
    var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
    var startMon = i === startYear ? parseInt(start[1])-1 : 0;
    for(var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j+1) {
      var month = j+1;
      var displayMonth = month < 10 ? '0'+month : month;
      dates.push([i, displayMonth].join('-'));
    }
  }
  return dates;
}
//to get selected month from date
getMoisPaie(selectedValue:String):String{
  let monthS:String=selectedValue.substr(4,3);
  let year:String=selectedValue.substr(11,4);
  let monthN:String="0"+this.getMonthFromString(monthS);
  let selectedMonth:String=year+"-"+monthN;
  return selectedMonth;
}
//to get month with number format from string(selected month from date is in string format)
getMonthFromString(mon:String):number{
  return new Date(Date.parse(mon +" 1, 2012")).getMonth()+1;
}
//****************************************************POUR LA RECHERCHE ET LES ERRURS ****************************************************************** */

showAlert(title:String,msg:String) {
  mobiscroll.alert({
    title: title,
    message: msg
    /* ,callback: function () {
      window.location.reload();
     }*/
  });


}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
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