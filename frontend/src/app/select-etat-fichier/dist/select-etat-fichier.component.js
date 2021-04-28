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
exports.SelectEtatFichierComponent = void 0;
var error_dialog_component_1 = require("./../error-dialog/error-dialog.component");
var alert_dialog_component_1 = require("./../alert-dialog/alert-dialog.component");
var dialog_1 = require("@angular/material/dialog");
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var angular_lite_1 = require("@mobiscroll/angular-lite");
var SelectEtatFichierComponent = /** @class */ (function () {
    function SelectEtatFichierComponent(homeService, token, sendEtatFichierService, paramService, dialog, dialogRef, data) {
        this.homeService = homeService;
        this.token = token;
        this.sendEtatFichierService = sendEtatFichierService;
        this.paramService = paramService;
        this.dialog = dialog;
        this.dialogRef = dialogRef;
        this.data = data;
        this.tousLesEtats = [];
        this.tousLesFichiers = [];
        this.state = 0;
        this.showSpinner = false;
        this.tempEtatFiles = [];
        this.tempFichiers = [];
        this.mailRequest = {
            "from": "",
            "msg": "Veuillez trouver ci-attaché les états paie demandés.",
            "sturcturename": "",
            "subject": "états paie",
            "to": [],
            "filesName": []
        };
        this.currentUser = { "email": "", "iduser": 0, "name": "", "password": "", "state": 0, "username": "" };
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
        this.selectedPaieMonth = [];
        this.formGroup = new forms_1.FormGroup({});
        this.formGroup = new forms_1.FormGroup({
            path: new forms_1.FormControl('', [forms_1.Validators.required])
        });
        //console.log(data)
        this.state = data.state;
        this.currentStructure = data.structure;
        this.selectedPaieMonth = data.selectedMonths;
        //console.log(this.selectedPaieMonth)
    }
    SelectEtatFichierComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    SelectEtatFichierComponent.prototype.ngOnInit = function () {
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
        //get all etats
        this.paramService.getEtats().subscribe(function (data) {
            if (data != null) {
                _this.tousLesEtats = data;
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
    //******************************************************************ETATS********************************************************************************************* */
    //check if etat is checked or not
    SelectEtatFichierComponent.prototype.ischekedindexE = function (file) {
        return this.tempEtatFiles.indexOf(file);
    };
    //update list of checked etats
    SelectEtatFichierComponent.prototype.updateCheckedEtats = function (file) {
        //console.log(file)
        if (this.tempEtatFiles.length > 0) {
            var index = this.ischekedindexE(file);
            if (index != -1) {
                this.tempEtatFiles.splice(index, 1);
            }
            else {
                this.tempEtatFiles.push(file);
            }
        }
        else {
            this.tempEtatFiles.push(file);
        }
        //console.log(this.tempEtatFiles)
    };
    SelectEtatFichierComponent.prototype.sendEtats = function () {
        // console.log("sending E")
        this.showSpinner = true;
        var currentDate = this.token.getCurrentMonth().split("/");
        var currentYear = currentDate[1];
        var currentMonth = currentDate[0];
        if (this.selectedPaieMonth.length == 1) {
            var year = this.selectedPaieMonth[0].split("-")[0];
            var month = this.selectedPaieMonth[0].split("-")[1];
            /*call api*/
            if (Number(year) <= Number(currentYear) && Number(month) <= Number(currentMonth)) {
                this.sendEmailEtat(year, this.selectedPaieMonth[0]);
            }
            else {
                this.showAlert("&#9888;" + "  ATTENTION ", "Les états du mois sélectionné ne sont pas encore générés " + this.selectedPaieMonth[0]);
            }
        }
        else {
            for (var i = 0; i < this.selectedPaieMonth.length; i++) {
                var year = this.selectedPaieMonth[i].split("-")[0];
                var month = this.selectedPaieMonth[i].split("-")[1];
                /*call api*/
                if (Number(year) <= Number(currentYear) && Number(month) <= Number(currentMonth)) {
                    this.sendEmailEtat(year, this.selectedPaieMonth[i]);
                }
                else {
                    this.showAlert("&#9888;" + "  ATTENTION ", "Les états du mois sélectionné ne sont pas encore générés " + this.selectedPaieMonth[i]);
                }
            }
        }
    };
    SelectEtatFichierComponent.prototype.sendEmailEtat = function (year, paymonth) {
        var _this = this;
        this.mailRequest.filesName = [];
        this.mailRequest.to = [];
        for (var i = 0; i < this.tempEtatFiles.length; i++) {
            var path = this.tempEtatFiles[i].folderpath.concat(this.tempEtatFiles[i].foldername.toString()).concat("\\").concat(year.toString()).concat("\\")
                .concat(paymonth.toString()).concat("\\").concat(this.currentStructure.structurename + " " + paymonth.toString() + "\\");
            this.mailRequest.filesName.push(path.toString() + this.tempEtatFiles[i].prefixfiletype + " " + this.currentStructure.structurename + " " + paymonth.toString() + ".SPL");
        }
        //console.log(this.mailRequest.filesName)
        var zipPath = this.tempEtatFiles[0].folderpath.concat(this.tempEtatFiles[0].foldername.toString()).concat("\\").concat(year.toString()).concat("\\")
            .concat(paymonth.toString()).concat("\\").concat(this.currentStructure.structurename + " " + paymonth.toString() + ".zip");
        this.mailRequest.to.push(this.currentStructure.emailgroupmanagers);
        this.mailRequest.to.push("DSI-Exploitation_paie@Sonatrach.dz");
        this.mailRequest.to.push("isi-exploitation_paie@sonatrach.dz");
        this.mailRequest.from = this.currentUser.email;
        this.mailRequest.sturcturename = this.currentStructure.structurename + " " + paymonth.toString() + ".zip";
        this.mailRequest.subject = "Etats";
        this.mailRequest.msg = "Veuillez trouver ci-attaché les états  demandés.";
        this.sendEtatFichierService.sendEtats(this.mailRequest, zipPath).subscribe(function (data) {
            if (data != null) {
                // console.log(data);
                _this.homeService.deleteZip(_this.currentStructure).subscribe(function (data) {
                    if (data != null) {
                        _this.dialogRef.close();
                        _this.showSpinner = false;
                        _this.showAlert("Envoi états paie", "Les états sélectionnés ont bien été envoyés aux gestionnaires");
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
                _this.openDialog();
            }
        }, function (error) {
            // //console.log(error);
            _this.openDialogError(error);
            throw error;
        });
    };
    //******************************************************************FICHIERS********************************************************************************************* */
    //check if etat is checked or not
    SelectEtatFichierComponent.prototype.ischekedindexF = function (file) {
        return this.tempFichiers.indexOf(file);
    };
    //update list of checked etats
    SelectEtatFichierComponent.prototype.updateCheckedFichier = function (file) {
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
        // console.log(this.tempFichiers)
    };
    SelectEtatFichierComponent.prototype.sendFichier = function () {
        //console.log("sending f")
        this.showSpinner = true;
        var currentDate = this.token.getCurrentMonth().split("/");
        var currentYear = currentDate[1];
        var currentMonth = currentDate[0];
        if (this.selectedPaieMonth.length == 1) {
            var year = this.selectedPaieMonth[0].split("-")[0];
            var month = this.selectedPaieMonth[0].split("-")[1];
            /*call api*/
            if (Number(year) <= Number(currentYear) && Number(month) <= Number(currentMonth)) {
                this.sendEmailFichier(year, this.selectedPaieMonth[0]);
            }
            else {
                this.showAlert("&#9888;" + "  ATTENTION ", "Les fichiers du mois sélectionné ne sont pas encore générés " + this.selectedPaieMonth[0]);
            }
        }
        else {
            for (var i = 0; i < this.selectedPaieMonth.length; i++) {
                var year = this.selectedPaieMonth[i].split("-")[0];
                var month = this.selectedPaieMonth[i].split("-")[1];
                //console.log(year)
                /*call api*/
                if (Number(year) <= Number(currentYear) && Number(month) <= Number(currentMonth)) {
                    this.sendEmailFichier(year, this.selectedPaieMonth[i]);
                }
                else {
                    this.showAlert("&#9888;" + "  ATTENTION ", "Les fichiers du mois sélectionné ne sont pas encore générés " + this.selectedPaieMonth[i]);
                }
            }
        }
    };
    SelectEtatFichierComponent.prototype.sendEmailFichier = function (year, paymonth) {
        var _this = this;
        //console.log(this.tempFichiers.length)
        this.mailRequest.filesName = [];
        this.mailRequest.to = [];
        for (var i = 0; i < this.tempFichiers.length; i++) {
            console.log(i);
            var path = this.tousLesEtats[0].folderpath.concat(this.tousLesEtats[0].foldername.toString()).concat("\\").concat(year.toString()).concat("\\")
                .concat(paymonth.toString()).concat("\\").concat(this.currentStructure.structurename + " " + paymonth.toString() + "\\");
            console.log(path);
            this.mailRequest.filesName.push(path.toString() + this.tempFichiers[i].prefixfiletype + " " + this.currentStructure.structurename + " " + paymonth.toString() + ".dbf");
        }
        //console.log(this.mailRequest.filesName)
        var zipPath = this.tousLesEtats[0].folderpath.concat(this.tousLesEtats[0].foldername.toString()).concat("\\").concat(year.toString()).concat("\\")
            .concat(paymonth.toString()).concat("\\").concat(this.currentStructure.structurename + " " + paymonth.toString() + ".zip");
        this.mailRequest.to.push(this.currentStructure.emailgroupmanagers);
        this.mailRequest.to.push("DSI-Exploitation_paie@Sonatrach.dz");
        this.mailRequest.to.push("isi-exploitation_paie@sonatrach.dz");
        this.mailRequest.from = this.currentUser.email;
        this.mailRequest.sturcturename = this.currentStructure.structurename + " " + paymonth.toString() + ".zip";
        this.mailRequest.subject = "Fichiers";
        this.mailRequest.msg = "Veuillez trouver ci-attaché les fichiers  demandés.";
        this.sendEtatFichierService.sendEtats(this.mailRequest, zipPath).subscribe(function (data) {
            if (data != null) {
                //console.log(data);
                _this.homeService.deleteZip(_this.currentStructure).subscribe(function (data) {
                    if (data != null) {
                        _this.dialogRef.close();
                        _this.showSpinner = false;
                        _this.showAlert("Envoi fichiers paie", "Les fichiers sélectionnés ont bien été envoyés aux gestionnaires");
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
                _this.openDialog();
            }
        }, function (error) {
            // //console.log(error);
            _this.openDialogError(error);
            throw error;
        });
    };
    //***********************************************Error ******************************************************************************************************************/
    SelectEtatFichierComponent.prototype.openDialog = function () {
        var dialogRef = this.dialog.open(alert_dialog_component_1.AlertDialogComponent);
        dialogRef.afterClosed().subscribe(function (result) {
            window.location.reload();
        });
    };
    SelectEtatFichierComponent.prototype.openDialogError = function (error) {
        var dialogRef = this.dialog.open(error_dialog_component_1.ErrorDialogComponent, {
            width: '650px',
            data: { message: error }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            window.location.reload();
        });
    };
    SelectEtatFichierComponent.prototype.showAlert = function (title, msg) {
        angular_lite_1.mobiscroll.alert({
            title: title,
            message: msg,
            callback: function () {
                window.location.reload();
            }
        });
    };
    SelectEtatFichierComponent = __decorate([
        core_1.Component({
            selector: 'app-select-etat-fichier',
            templateUrl: './select-etat-fichier.component.html',
            styleUrls: ['./select-etat-fichier.component.css']
        }),
        __param(6, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], SelectEtatFichierComponent);
    return SelectEtatFichierComponent;
}());
exports.SelectEtatFichierComponent = SelectEtatFichierComponent;
