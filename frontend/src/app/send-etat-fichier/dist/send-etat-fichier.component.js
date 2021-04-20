"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SendEtatFichierComponent = void 0;
var forms_1 = require("@angular/forms");
var select_etat_fichier_component_1 = require("./../select-etat-fichier/select-etat-fichier.component");
var error_dialog_component_1 = require("./../error-dialog/error-dialog.component");
var alert_dialog_component_1 = require("./../alert-dialog/alert-dialog.component");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var angular_lite_1 = require("@mobiscroll/angular-lite");
var table_1 = require("@angular/material/table");
var core_1 = require("@angular/core");
var SendEtatFichierComponent = /** @class */ (function () {
    function SendEtatFichierComponent(iconRegistry, sanitizer, homeService, paramService, dialog, _adapter) {
        this.homeService = homeService;
        this.paramService = paramService;
        this.dialog = dialog;
        this._adapter = _adapter;
        this.displayedColumns = ['idstructure', 'structurename', 'STRUCTURECODELIKE', 'EMAILGROUPMANAGERS', 'action'];
        this.etat = "";
        this.ELEMENT_DATA = [];
        this.dataSource = new table_1.MatTableDataSource(this.ELEMENT_DATA);
        this.formSettings = {
            theme: 'mobiscroll',
            themeVariant: 'light'
        };
        this.startDate = new Date(2000, 0, 2);
        this.moisPaie = new forms_1.FormControl();
        this.dateDebut = new forms_1.FormControl();
        this.dateFin = new forms_1.FormControl();
        this.selectedPaieMonth = [];
        this._adapter.setLocale('fr');
    }
    Object.defineProperty(SendEtatFichierComponent.prototype, "matSort", {
        set: function (sort) {
            this.dataSource.sort = sort;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SendEtatFichierComponent.prototype, "matPaginator", {
        set: function (paginator) {
            this.dataSource.paginator = paginator;
        },
        enumerable: false,
        configurable: true
    });
    SendEtatFichierComponent.prototype.ngOnInit = function () {
        var _this = this;
        //get all structures
        this.homeService.getAllStructures().subscribe(function (data) {
            if (data != null) {
                _this.ELEMENT_DATA = data;
                //console.log(data);
                _this.dataSource = new table_1.MatTableDataSource(_this.ELEMENT_DATA);
            }
            else {
                _this.openDialog();
            }
        }, function (error) {
            // //console.log(error);
            _this.openDialogError(error);
            throw error;
        });
    };
    //envoyer des états 
    SendEtatFichierComponent.prototype.sendEtat = function (structure) {
        this.selectedPaieMonth = [];
        if (this.moisPaie.value != null) {
            var selectedMonth = this.getMoisPaie(this.moisPaie.value.toString());
            this.selectedPaieMonth.push(selectedMonth);
            //console.log(this.selectedPaieMonth)
            this.selectEtatFichier(1, structure);
        }
        else {
            if (this.dateDebut.value != null && this.dateFin.value != null) {
                //console.log("range")
                var selectedDateDebut = this.getMoisPaie(this.dateDebut.value.toString());
                var selectedDateFin = this.getMoisPaie(this.dateFin.value.toString());
                this.selectedPaieMonth = this.dateRange(selectedDateDebut, selectedDateFin);
                //console.log(this.selectedPaieMonth)
                this.selectEtatFichier(1, structure);
            }
            else {
                this.showAlert("&#9888;" + "  Alerte Envoi Etats", "Veuillez sélectionner un mois paie ou bien un interval de mois");
            }
        }
    };
    //envoyer des fichiers
    SendEtatFichierComponent.prototype.sendFichier = function (structure) {
        this.selectedPaieMonth = [];
        if (this.moisPaie.value != null) {
            var selectedMonth = this.getMoisPaie(this.moisPaie.value.toString());
            this.selectedPaieMonth.push(selectedMonth);
            //console.log(this.selectedPaieMonth)
            this.selectEtatFichier(2, structure);
        }
        else {
            if (this.dateDebut.value != null && this.dateFin.value != null) {
                //console.log("range")
                var selectedDateDebut = this.getMoisPaie(this.dateDebut.value.toString());
                var selectedDateFin = this.getMoisPaie(this.dateFin.value.toString());
                this.selectedPaieMonth = this.dateRange(selectedDateDebut, selectedDateFin);
                //console.log(this.selectedPaieMonth)
                this.selectEtatFichier(2, structure);
            }
            else {
                this.showAlert("&#9888;" + "  Alerte Envoi Fichiers", "Veuillez sélectionner un mois paie ou bien un interval de mois");
            }
        }
    };
    SendEtatFichierComponent.prototype.selectEtatFichier = function (state, structure) {
        var dialogRef = this.dialog.open(select_etat_fichier_component_1.SelectEtatFichierComponent, {
            width: '450px',
            data: {
                "state": state,
                "structure": structure,
                "selectedMonths": this.selectedPaieMonth
            }
        });
    };
    //to get all months selected from range
    SendEtatFichierComponent.prototype.dateRange = function (startDate, endDate) {
        var start = startDate.split('-');
        var end = endDate.split('-');
        var startYear = parseInt(start[0]);
        var endYear = parseInt(end[0]);
        var dates = [];
        for (var i = startYear; i <= endYear; i++) {
            var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
            var startMon = i === startYear ? parseInt(start[1]) - 1 : 0;
            for (var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
                var month = j + 1;
                var displayMonth = month < 10 ? '0' + month : month;
                dates.push([i, displayMonth].join('-'));
            }
        }
        return dates;
    };
    //to get selected month from date
    SendEtatFichierComponent.prototype.getMoisPaie = function (selectedValue) {
        var monthS = selectedValue.substr(4, 3);
        var year = selectedValue.substr(11, 4);
        var monthN = "0" + this.getMonthFromString(monthS);
        var selectedMonth = year + "-" + monthN;
        return selectedMonth;
    };
    //to get month with number format from string(selected month from date is in string format)
    SendEtatFichierComponent.prototype.getMonthFromString = function (mon) {
        return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1;
    };
    //****************************************************POUR LA RECHERCHE ET LES ERRURS ****************************************************************** */
    SendEtatFichierComponent.prototype.showAlert = function (title, msg) {
        angular_lite_1.mobiscroll.alert({
            title: title,
            message: msg
            /* ,callback: function () {
              window.location.reload();
             }*/
        });
    };
    SendEtatFichierComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    SendEtatFichierComponent.prototype.openDialog = function () {
        var dialogRef = this.dialog.open(alert_dialog_component_1.AlertDialogComponent);
        dialogRef.afterClosed().subscribe(function (result) {
            window.location.reload();
        });
    };
    SendEtatFichierComponent.prototype.openDialogError = function (error) {
        var dialogRef = this.dialog.open(error_dialog_component_1.ErrorDialogComponent, {
            width: '650px',
            data: { message: error }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            window.location.reload();
        });
    };
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], SendEtatFichierComponent.prototype, "matSort");
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], SendEtatFichierComponent.prototype, "matPaginator");
    SendEtatFichierComponent = __decorate([
        core_1.Component({
            selector: 'app-send-etat-fichier',
            templateUrl: './send-etat-fichier.component.html',
            styleUrls: ['./send-etat-fichier.component.css']
        })
    ], SendEtatFichierComponent);
    return SendEtatFichierComponent;
}());
exports.SendEtatFichierComponent = SendEtatFichierComponent;
