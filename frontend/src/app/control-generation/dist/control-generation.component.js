"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ControlGenerationComponent = void 0;
var generate_controlled_etat_fichier_component_1 = require("./../generate-controlled-etat-fichier/generate-controlled-etat-fichier.component");
var error_dialog_component_1 = require("./../error-dialog/error-dialog.component");
var alert_dialog_component_1 = require("./../alert-dialog/alert-dialog.component");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var core_1 = require("@angular/core");
var ControlGenerationComponent = /** @class */ (function () {
    function ControlGenerationComponent(iconRegistry, sanitizer, token, router, paramService, dialog) {
        this.token = token;
        this.router = router;
        this.paramService = paramService;
        this.dialog = dialog;
        this.displayedColumns = ['idstructure', 'structurename', 'STRUCTURECODELIKE', 'EMAILGROUPMANAGERS', 'action'];
        this.icon_etat = "vert.svg";
        this.etat = "";
        this.ELEMENT_DATA = [];
        this.currentUser = {
            "email": "",
            "iduser": 0,
            "name": "",
            "password": "",
            "state": 0,
            "username": ""
        };
        this.dataSource = new table_1.MatTableDataSource(this.ELEMENT_DATA);
        this.formSettings = {
            theme: 'mobiscroll',
            themeVariant: 'light'
        };
        this.showSpinner = false;
        iconRegistry.addSvgIcon('thumbs-up', sanitizer.bypassSecurityTrustResourceUrl('assets/img/' + this.icon_etat));
    }
    Object.defineProperty(ControlGenerationComponent.prototype, "matSort", {
        set: function (sort) {
            this.dataSource.sort = sort;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ControlGenerationComponent.prototype, "matPaginator", {
        set: function (paginator) {
            this.dataSource.paginator = paginator;
        },
        enumerable: false,
        configurable: true
    });
    ControlGenerationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.paramService.getNotGeneratedStructure().subscribe(function (data) {
            if (data != null) {
                _this.ELEMENT_DATA = data;
                _this.dataSource = new table_1.MatTableDataSource(_this.ELEMENT_DATA);
                //console.log(data);
            }
            else {
                _this.openDialog();
            }
        }, function (error) {
            // //console.log(error);
            _this.openDialogError(error);
            ;
            throw error;
        });
    };
    ControlGenerationComponent.prototype.selectEtatFichier = function (structure) {
        var dialogRef = this.dialog.open(generate_controlled_etat_fichier_component_1.GenerateControlledEtatFichierComponent, {
            width: '450px',
            data: {
                "structure": structure
            }
        });
    };
    //****************************************ERRORS***************************************************************** */
    ControlGenerationComponent.prototype.openDialog = function () {
        var dialogRef = this.dialog.open(alert_dialog_component_1.AlertDialogComponent);
        dialogRef.afterClosed().subscribe(function (result) {
            window.location.reload();
        });
    };
    ControlGenerationComponent.prototype.openDialogError = function (error) {
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
    ], ControlGenerationComponent.prototype, "matSort");
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], ControlGenerationComponent.prototype, "matPaginator");
    ControlGenerationComponent = __decorate([
        core_1.Component({
            selector: 'app-control-generation',
            templateUrl: './control-generation.component.html',
            styleUrls: ['./control-generation.component.css']
        })
    ], ControlGenerationComponent);
    return ControlGenerationComponent;
}());
exports.ControlGenerationComponent = ControlGenerationComponent;
