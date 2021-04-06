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
var table_1 = require("@angular/material/table");
var core_1 = require("@angular/core");
var SendEtatFichierComponent = /** @class */ (function () {
    function SendEtatFichierComponent(iconRegistry, sanitizer, homeService, token, paramService, dialog, _adapter) {
        this.homeService = homeService;
        this.token = token;
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
        this.currentUser = { "email": "", "iduser": 0, "name": "", "password": "", "state": 0, "username": "" };
        this.startDate = new Date(2000, 0, 2);
        this.date = new forms_1.FormControl(new Date());
        this.moisPaie = new forms_1.FormControl();
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
        //get current user
        this.currentUser.username = this.token.getUsername();
        this.paramService.getUserByUserName(this.currentUser).subscribe(function (data) {
            if (data != null) {
                // //console.log(data);
                _this.currentUser = data;
            }
            else {
                _this.openDialog();
            }
        }, function (error) {
            //console.log(error);
            _this.openDialogError(error);
            throw error;
        });
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
    SendEtatFichierComponent.prototype.sendEtat = function (structure) {
        console.log(this.moisPaie.value);
        console.log(this.moisPaie.value.substr(4, 6));
        var dialogRef = this.dialog.open(select_etat_fichier_component_1.SelectEtatFichierComponent, {
            width: '450px',
            data: {
                "state": 1,
                "structure": structure
            }
        });
    };
    SendEtatFichierComponent.prototype.getMoisPaie = function (selectedValue) {
        console.log(selectedValue.substr(4, 6));
    };
    //****************************************************POUR LA RECHERCHE ET LES ERRURS ****************************************************************** */
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
