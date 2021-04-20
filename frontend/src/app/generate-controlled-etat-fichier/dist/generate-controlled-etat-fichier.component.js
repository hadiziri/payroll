"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.GenerateControlledEtatFichierComponent = void 0;
var error_dialog_component_1 = require("./../error-dialog/error-dialog.component");
var alert_dialog_component_1 = require("./../alert-dialog/alert-dialog.component");
var dialog_1 = require("@angular/material/dialog");
var core_1 = require("@angular/core");
var angular_lite_1 = require("@mobiscroll/angular-lite");
var GenerateControlledEtatFichierComponent = /** @class */ (function () {
    function GenerateControlledEtatFichierComponent(homeService, token, paramService, sendEtatFichierService, dialog, dialogRef, data) {
        //console.log(data)
        this.homeService = homeService;
        this.token = token;
        this.paramService = paramService;
        this.sendEtatFichierService = sendEtatFichierService;
        this.dialog = dialog;
        this.dialogRef = dialogRef;
        this.data = data;
        this.tousLesEtats = [];
        this.tousLesFichiers = [];
        this.codeStructure = [];
        this.selectedFiles = [];
        this.tempFichiers = [];
        this.currentStructure = {
            "idstructure": 0,
            "idactivity": 0,
            "emailgroupmanagers": "",
            "statusstructure": 0,
            "structurecodenotlike": "",
            "structurecodelike": "",
            "structurename": "",
            "isactif": 0,
            "flagetat": 0,
            "flagfichier": 0,
            "fichiercodelike": "",
            "fichiercodenotlike": ""
        };
        this.showSpinner = false;
        this.formSettings = {
            theme: 'mobiscroll',
            themeVariant: 'light'
        };
        this.currentStructure = data.structure;
        //console.log(this.selectedPaieMonth)
    }
    GenerateControlledEtatFichierComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    GenerateControlledEtatFichierComponent.prototype.ngOnInit = function () {
        var _this = this;
        //get all Fichiers
        this.sendEtatFichierService.getAllFichiers().subscribe(function (data) {
            if (data != null) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].prefixfiletype != "FRUBNUM") {
                        if (data[i].prefixfiletype == "FRUBALPH") {
                            data[i].prefixfiletype = "FRUB";
                            _this.tousLesFichiers.push(data[i]);
                        }
                        else {
                            _this.tousLesFichiers.push(data[i]);
                        }
                    }
                }
                //  this.tousLesFichiers = data;
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
    //******************************************************************FICHIERS********************************************************************************************* */
    //check if etat is checked or not
    GenerateControlledEtatFichierComponent.prototype.ischekedindexF = function (file) {
        return this.tempFichiers.indexOf(file);
    };
    //update list of checked etats
    GenerateControlledEtatFichierComponent.prototype.updateCheckedFichier = function (file) {
        // console.log(file)
        if (this.tempFichiers.length > 0) {
            var index = this.ischekedindexF(file);
            if (index != -1) {
                this.tempFichiers.splice(index, 1);
            }
            else {
                this.tempFichiers.push(file);
            }
        }
        else {
            this.tempFichiers.push(file);
        }
        //console.log(this.tempFichiers)
    };
    GenerateControlledEtatFichierComponent.prototype.genererFichier = function () {
        var _this = this;
        this.showSpinner = true;
        this.selectedFiles = [];
        this.codeStructure = [];
        if (this.currentStructure.structurecodelike.includes("/")) {
            this.codeStructure = this.currentStructure.structurecodelike.split("/");
        }
        else {
            this.codeStructure.push(this.currentStructure.structurecodelike);
        }
        // console.log(this.codeStructure)
        //console.log(this.selectedFiles)
        for (var i = 0; i < this.tempFichiers.length; i++) {
            if (this.tempFichiers[i].prefixfiletype == "PERS") {
                this.homeService.generatePersStr(this.currentStructure).subscribe(function (data) {
                    // console.log(data);
                    if (data != null) {
                        _this.selectedFiles.push(true);
                        _this.showAlert();
                    }
                    else {
                        _this.openDialog();
                    }
                }, function (error) {
                    // //console.log(error);
                    _this.openDialogError(error);
                    throw error;
                });
            }
            else {
                if (this.tempFichiers[i].prefixfiletype == "NEWPAIE") {
                    this.homeService.generateNewPaieStr(this.currentStructure).subscribe(function (data) {
                        // console.log(data);
                        if (data != null) {
                            _this.selectedFiles.push(true);
                            _this.showAlert();
                        }
                        else {
                            _this.openDialog();
                        }
                    }, function (error) {
                        // //console.log(error);
                        _this.openDialogError(error);
                        throw error;
                    });
                }
                else {
                    if (this.codeStructure.map(function (s) { return (/^[a-z].*/i.test(s)); }).includes(true)) {
                        //console.log("alph")
                        this.homeService.generateFrubAStr(this.currentStructure).subscribe(function (data) {
                            if (data != null) {
                                _this.selectedFiles.push(true);
                                _this.showAlert();
                            }
                            else {
                                _this.openDialog();
                            }
                        }, function (error) {
                            // //console.log(error);
                            _this.openDialogError(error);
                            throw error;
                        });
                    }
                    else {
                        //FRUBNUM
                        this.homeService.generateFrubNStr(this.currentStructure).subscribe(function (data) {
                            //console.log(data);
                            if (data != null) {
                                _this.selectedFiles.push(true);
                                _this.showAlert();
                            }
                            else {
                                _this.openDialog();
                            }
                        }, function (error) {
                            // //console.log(error);
                            _this.openDialogError(error);
                            throw error;
                        });
                    }
                }
            }
        }
    };
    GenerateControlledEtatFichierComponent.prototype.showAlert = function () {
        if (this.tempFichiers.length == this.selectedFiles.length) {
            this.onNoClick();
            this.showSpinner = false;
            angular_lite_1.mobiscroll.alert({
                title: "Génération Fichiers",
                message: "Les fichiers sélectionnés ont bien été générés",
                callback: function () {
                    window.location.reload();
                }
            });
        }
    };
    //****************************************ERRORS***************************************************************** */
    GenerateControlledEtatFichierComponent.prototype.openDialog = function () {
        var dialogRef = this.dialog.open(alert_dialog_component_1.AlertDialogComponent);
        dialogRef.afterClosed().subscribe(function (result) {
            window.location.reload();
        });
    };
    GenerateControlledEtatFichierComponent.prototype.openDialogError = function (error) {
        var dialogRef = this.dialog.open(error_dialog_component_1.ErrorDialogComponent, {
            width: '650px',
            data: { message: error }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            window.location.reload();
        });
    };
    GenerateControlledEtatFichierComponent = __decorate([
        core_1.Component({
            selector: 'app-generate-controlled-etat-fichier',
            templateUrl: './generate-controlled-etat-fichier.component.html',
            styleUrls: ['./generate-controlled-etat-fichier.component.css']
        }),
        __param(6, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], GenerateControlledEtatFichierComponent);
    return GenerateControlledEtatFichierComponent;
}());
exports.GenerateControlledEtatFichierComponent = GenerateControlledEtatFichierComponent;
