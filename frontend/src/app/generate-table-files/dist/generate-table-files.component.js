"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GenerateTableFilesComponent = void 0;
var rxjs_1 = require("rxjs");
var error_dialog_component_1 = require("./../error-dialog/error-dialog.component");
var angular_lite_1 = require("@mobiscroll/angular-lite");
var forms_1 = require("@angular/forms");
var alert_dialog_component_1 = require("./../alert-dialog/alert-dialog.component");
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var GenerateTableFilesComponent = /** @class */ (function () {
    function GenerateTableFilesComponent(clotureService, dialog, fb, homeService, SendTableFilesService, token, paramService) {
        this.clotureService = clotureService;
        this.dialog = dialog;
        this.fb = fb;
        this.homeService = homeService;
        this.SendTableFilesService = SendTableFilesService;
        this.token = token;
        this.paramService = paramService;
        this.formGroup = new forms_1.FormGroup({});
        this.allTableFiles = [];
        this.tempTableFiles = [];
        this.mailRequest = { "from": "", "msg": "", "sturcturename": "", "subject": "", "to": [], "filesName": [] };
        this.currentUser = { "email": "", "iduser": 0, "name": "", "password": "", "state": 0, "username": "" };
        this.email = { "emailgenerationdate": new Date(), "emailobject": "", "idemail": 0, "iduser": 0, "msg": "", "receiver": "", "sender": "", "emailstatus": 0 };
        this.archiveSentGfiles = [];
        this.emailSaved = false;
        this.eFiles = [];
        this.idEmail = 0;
        this.nbClick = 0;
        this.options = ['DSI-Exploitation_paie@Sonatrach.dz', 'isi-exploitation_paie@sonatrach.dz'];
        this.filteredOptions = new rxjs_1.Observable;
        this.archiveSentFilesSaved = false;
        this.formSettings = {
            theme: 'mobiscroll',
            themeVariant: 'light'
        };
        this.formGroup = this.fb.group({
            message: new forms_1.FormControl('', [forms_1.Validators.required]),
            object: new forms_1.FormControl('', [forms_1.Validators.required]),
            emailgroupemanagers: this.fb.array([])
        });
    }
    GenerateTableFilesComponent.prototype.emails = function () {
        return this.formGroup.get("emailgroupemanagers");
    };
    GenerateTableFilesComponent.prototype.ngOnInit = function () {
        var _this = this;
        //this.formGroup.setControl()
        var folder = { "idfolder": 0, "foldername": "TABLES", "folderpath": "", "statusfolder": 0, "displayedfolderpath": "" };
        //get all table files
        this.clotureService.getFilesByFolder2(folder).subscribe(function (data) {
            if (data != null) {
                // console.log(data);
                _this.allTableFiles = data;
                //this.globalStatusFolder(data,folder.foldername);
            }
            else {
                _this.openDialog();
            }
        }, function (error) {
            //  //console.log(error);
            _this.openDialogError(error);
            ;
            throw error;
        });
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
            ;
            throw error;
        });
        this.homeService.getAllStructures().subscribe(function (data) {
            if (data != null) {
                for (var i = 0; i < data.length; i++) {
                    _this.options.push(data[i].emailgroupmanagers);
                }
                _this.options.sort();
                var object = _this.formGroup.get('emailgroupemanagers');
                if (object != null) {
                    _this.filteredOptions = object.valueChanges.pipe(operators_1.startWith(''), operators_1.map(function (value) { return _this._filter(value); }));
                    /* console.log(this.filteredOptions.subscribe(
                       data=>{
                         console.log(data)
                       }
                     ))*/
                }
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
    GenerateTableFilesComponent.prototype.removeItem = function () {
        this.nbClick--;
        var controls = this.emails();
        controls.removeAt(0);
        // remove from filteredOptions too.
    };
    GenerateTableFilesComponent.prototype._filter = function (value) {
        var filterValue = value.toLowerCase();
        return this.options.filter(function (option) { return option.toLowerCase().indexOf(filterValue) === 0; });
    };
    GenerateTableFilesComponent.prototype.openDialog = function () {
        var dialogRef = this.dialog.open(alert_dialog_component_1.AlertDialogComponent);
        dialogRef.afterClosed().subscribe(function (result) {
            window.location.reload();
        });
    };
    //check if file is checked or not
    GenerateTableFilesComponent.prototype.ischekedindex = function (file) {
        return this.tempTableFiles.indexOf(file);
    };
    //update list of checked files
    GenerateTableFilesComponent.prototype.updateCheckedFiles = function (file) {
        //console.log(file)
        if (this.tempTableFiles.length > 0) {
            var index = this.ischekedindex(file);
            if (index != -1) {
                this.tempTableFiles.splice(index, 1);
            }
            else {
                this.tempTableFiles.push(file);
            }
        }
        else {
            this.tempTableFiles.push(file);
        }
        //console.log(this.tempTableFiles)
    };
    //to print email error
    GenerateTableFilesComponent.prototype.getErrorEmail = function () {
        var object = this.formGroup.get('emailgroupemanagers');
        if (object != null) {
            return object.valid ? '' : 'Adresse email non valide';
        }
        else {
            return '';
        }
    };
    //submit action
    GenerateTableFilesComponent.prototype.onSubmit = function (post) {
        var _this = this;
        //check if at leat one file is selected
        if (this.tempTableFiles.length == 0) {
            this.showAlert("&#9888;" + "Echec envoi email", "Vous devez sélectionner au moins un fichier à envoyer!");
        }
        else {
            /**************initialisation of mail request************************************* */
            this.mailRequest.subject = post.object;
            this.mailRequest.msg = post.message;
            this.mailRequest.to = post.emailgroupemanagers;
            this.mailRequest.from = this.currentUser.email;
            for (var i = 0; i < this.tempTableFiles.length; i++) {
                this.mailRequest.filesName.push(this.tempTableFiles[i].prefixfiletype);
            }
            //console.log(this.mailRequest)
            /**************initialisation of mail to save in DB************************************* */
            this.email.sender = this.mailRequest.from;
            this.email.emailobject = this.mailRequest.subject;
            this.email.iduser = this.currentUser.iduser;
            this.email.msg = this.mailRequest.msg;
            for (var i = 0; i < this.mailRequest.to.length; i++) {
                this.email.receiver = this.email.receiver.concat(this.mailRequest.to[i] + ";");
            }
            /**************send email************************************* */
            this.SendTableFilesService.sendEmailFiles(this.mailRequest).subscribe(function (data) {
                if (data != null) {
                    // //console.log(data);
                    if (data.status == true) {
                        /************** save email in DB************************************* */
                        _this.saveEmailDB();
                    }
                }
                else {
                    _this.openDialog();
                }
            }, function (error) {
                //console.log(error);
                _this.openDialogError(error);
                ;
                throw error;
            });
        }
    };
    GenerateTableFilesComponent.prototype.saveEmailDB = function () {
        var _this = this;
        this.archiveSentGfiles = [];
        this.idEmail = 0;
        this.homeService.SaveSentEmail(this.email).subscribe(function (data) {
            //console.log(data);
            if (data != null) {
                _this.emailSaved = true;
                _this.idEmail = data.idemail;
                _this.getGfilesTable();
            }
            else {
                _this.openDialog();
            }
        }, function (error) {
            //console.log(error);
            _this.openDialogError(error);
            ;
            throw error;
        });
    };
    GenerateTableFilesComponent.prototype.saveArchiveSentFiles = function () {
        var _this = this;
        this.SendTableFilesService.saveArchiveSentGfiles(this.archiveSentGfiles).subscribe(function (data) {
            //console.log(data);
            if (data != null) {
                _this.archiveSentFilesSaved = true;
                _this.showAlert("Envoie Email", "L'email a bien été envoyé aux gestionnaires");
            }
            else {
                _this.openDialog();
            }
        }, function (error) {
            //console.log(error);
            _this.openDialogError(error);
            ;
            throw error;
        });
    };
    GenerateTableFilesComponent.prototype.getGfilesTable = function () {
        var _this = this;
        this.archiveSentGfiles = [];
        this.SendTableFilesService.getGfilesTable().subscribe(function (data) {
            //console.log(data);
            if (data != null) {
                for (var i = 0; i < _this.tempTableFiles.length; i++) {
                    for (var j = 0; j < data.length; j++) {
                        if (_this.tempTableFiles[i].prefixfiletype == data[j].gfilename) {
                            _this.archiveSentGfiles.push({ "idemail": _this.idEmail, "idgfile": data[j].idgfile });
                        }
                    }
                }
                _this.saveArchiveSentFiles();
            }
            else {
                _this.openDialog();
            }
        }, function (error) {
            //console.log(error);
            _this.openDialogError(error);
            ;
            throw error;
        });
    };
    GenerateTableFilesComponent.prototype.newEmail = function () {
        return this.fb.control('', [forms_1.Validators.required, forms_1.Validators.email]);
    };
    GenerateTableFilesComponent.prototype.addInput = function () {
        this.nbClick++;
        return this.emails().push(this.newEmail());
    };
    //alert pour le FileToPrint selection
    GenerateTableFilesComponent.prototype.showAlert = function (title, msg) {
        angular_lite_1.mobiscroll.alert({
            title: title,
            message: msg,
            callback: function () {
                window.location.reload();
            }
        });
    };
    GenerateTableFilesComponent.prototype.openDialogError = function (error) {
        var dialogRef = this.dialog.open(error_dialog_component_1.ErrorDialogComponent, {
            width: '650px',
            data: { message: error }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            window.location.reload();
        });
    };
    GenerateTableFilesComponent = __decorate([
        core_1.Component({
            selector: 'app-generate-table-files',
            templateUrl: './generate-table-files.component.html',
            styleUrls: ['./generate-table-files.component.css']
        })
    ], GenerateTableFilesComponent);
    return GenerateTableFilesComponent;
}());
exports.GenerateTableFilesComponent = GenerateTableFilesComponent;
