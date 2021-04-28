"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FilesGeneratorComponent = void 0;
var error_dialog_component_1 = require("./../error-dialog/error-dialog.component");
var alert_dialog_component_1 = require("./../alert-dialog/alert-dialog.component");
var core_1 = require("@angular/core");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var paginator_1 = require("@angular/material/paginator");
var angular_lite_1 = require("@mobiscroll/angular-lite");
var FilesGeneratorComponent = /** @class */ (function () {
    function FilesGeneratorComponent(iconRegistry, sanitizer, homeService, token, router, paramService, dialog) {
        this.homeService = homeService;
        this.token = token;
        this.router = router;
        this.paramService = paramService;
        this.dialog = dialog;
        this.displayedColumns = ['idstructure', 'structurename', 'STRUCTURECODELIKE', 'EMAILGROUPMANAGERS', 'STATUSSTRUCTURE', 'action'];
        this.icon_etat = "vert.svg";
        this.etat = "";
        this.ELEMENT_DATA = [];
        this.dataSource = new table_1.MatTableDataSource(this.ELEMENT_DATA);
        this.formSettings = {
            theme: 'mobiscroll',
            themeVariant: 'light'
        };
        this.showSpinner = false;
        this.showProgressInit = false;
        this.color = "warn";
        this.showProgress = false;
        this.mailRequest = { "from": "", "msg": "", "sturcturename": "", "subject": "", "to": [], "filesName": [] };
        this.currentUser = { "email": "", "iduser": 0, "name": "", "password": "", "state": 0, "username": "" };
        this.email = { "emailgenerationdate": new Date(), "emailobject": "", "idemail": 0, "iduser": 0, "msg": "", "receiver": "", "sender": "", "emailstatus": 0 };
        this.emailSaved = false;
        this.archiveSentFilesSaved = false;
        this.eFiles = [];
        this.archiveSentFiles = [];
        this.allEtatJournal = [];
        this.allEtatMand = [];
        this.allEtatMip = [];
        this.allEtatRecap = [];
        this.allEtatRet = [];
        this.filteredEtatJournal = [];
        this.filteredEtatMand = [];
        this.filteredEtatMip = [];
        this.filteredEtatRecap = [];
        this.filteredEtatRet = [];
        this.codeStructure = [];
        this.codeNotLike = [];
        this.efiles = [];
        this.efichiers = [];
        this.mand = false;
        this.jour = false;
        this.ret = false;
        this.recap = false;
        this.mip = false;
        this.newpaie = false;
        this.pers = false;
        this.frub = false;
        this.allmand = false;
        this.alljour = false;
        this.allret = false;
        this.allrecap = false;
        this.allmip = false;
        this.isDataLoaded = false;
        this.countFilesErrorResponse = "";
        this.index = 0;
        this.indexE = 0;
        this.generatedStructure = "";
        this.showProgressAllFichier = false;
        this.generatedStructureE = "";
        this.showProgressAllEtat = false;
        this.count = 0;
        this.updatedStructure = {
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
        this.uploadedFiles = [{ "name": "Journal", "progress": 0 }, { "name": "Mand", "progress": 0 }, { "name": "Mip", "progress": 0 }, { "name": "Ret", "progress": 0 }, { "name": "Recap", "progress": 0 }];
        this.uploadedFichiers = [{ "name": "NewPaie", "progress": 0 }, { "name": "Pers", "progress": 0 }, { "name": "Frub", "progress": 0 }];
        this.initProgress = 0;
        this.showProgressFichier = false;
        iconRegistry.addSvgIcon('thumbs-up', sanitizer.bypassSecurityTrustResourceUrl('assets/img/' + this.icon_etat));
    }
    Object.defineProperty(FilesGeneratorComponent.prototype, "matSort", {
        set: function (sort) {
            this.dataSource.sort = sort;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FilesGeneratorComponent.prototype, "matPaginator", {
        set: function (paginator) {
            this.dataSource.paginator = paginator;
        },
        enumerable: false,
        configurable: true
    });
    FilesGeneratorComponent.prototype.ngOnInit = function () {
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
                // //console.log(data);
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
        /*
           
            */
    };
    FilesGeneratorComponent.prototype.disableSpinner = function () {
        if (this.alljour && this.allmip && this.allmand && this.allret && this.allrecap) {
            this.showProgressInit = false;
            this.isDataLoaded = true;
        }
    };
    FilesGeneratorComponent.prototype.getStatus = function (element) {
        if (element.statusstructure == 3) {
            return 3;
        }
        else {
            if (element.statusstructure == 2) {
                return 2;
            }
            else {
                return element.statusstructure * (element.flagetat + element.flagfichier) * element.isactif;
            }
        }
    };
    FilesGeneratorComponent.prototype.chargerDonnees = function () {
        var _this = this;
        this.initProgress = 10;
        this.showProgressInit = true;
        this.alljour = false;
        this.allmip = false;
        this.allmand = false;
        this.allret = false;
        this.allrecap = false;
        //get all etat paie filtered by paymonth
        this.homeService.getEtatJournal().subscribe(function (data) {
            if (data != null) {
                //console.log(data);
                _this.initProgress = _this.initProgress + 15;
                _this.allEtatJournal = data;
                _this.alljour = true;
                _this.disableSpinner();
            }
            else {
                _this.openDialog();
            }
        }, function (error) {
            // //console.log(error);
            _this.openDialogError(error);
            throw error;
        });
        this.homeService.getEtatMand().subscribe(function (data) {
            if (data != null) {
                //console.log(data);
                _this.initProgress = _this.initProgress + 15;
                _this.allEtatMand = data;
                _this.allmand = true;
                _this.disableSpinner();
            }
            else {
                _this.openDialog();
            }
        }, function (error) {
            // //console.log(error);
            _this.openDialogError(error);
            throw error;
        });
        this.homeService.getEtatMip().subscribe(function (data) {
            if (data != null) {
                //console.log(data);
                _this.initProgress = _this.initProgress + 15;
                _this.allEtatMip = data;
                _this.allmip = true;
                _this.disableSpinner();
            }
            else {
                _this.openDialog();
            }
        }, function (error) {
            // //console.log(error);
            _this.openDialogError(error);
            throw error;
        });
        this.homeService.getEtatRecap().subscribe(function (data) {
            if (data != null) {
                _this.initProgress = _this.initProgress + 15;
                _this.allEtatRecap = data;
                //console.log(this.allEtatRecap);
                _this.allrecap = true;
                _this.disableSpinner();
            }
            else {
                _this.openDialog();
            }
        }, function (error) {
            // //console.log(error);
            _this.openDialogError(error);
            throw error;
        });
        this.homeService.getEtatRet().subscribe(function (data) {
            if (data != null) {
                //console.log(data);
                _this.initProgress = _this.initProgress + 15;
                _this.allEtatRet = data;
                _this.allret = true;
                _this.disableSpinner();
            }
            else {
                _this.openDialog();
            }
        }, function (error) {
            // //console.log(error);
            _this.openDialogError(error);
            throw error;
        });
        this.initProgress = 25;
    };
    //---------------------------------------------------------------------SEND EMAIL----------------------------------------------------------------------------------------------
    FilesGeneratorComponent.prototype.sendEmail = function (structure) {
        var _this = this;
        this.showSpinner = true;
        this.eFiles = [];
        this.mailRequest.to = [];
        this.email.receiver = "";
        // console.log(structure)
        /**************initialisation of mail request************************************* */
        this.mailRequest.to.push(structure.emailgroupmanagers);
        this.mailRequest.to.push("DSI-Exploitation_paie@Sonatrach.dz");
        this.mailRequest.to.push("isi-exploitation_paie@sonatrach.dz");
        this.mailRequest.sturcturename = structure.structurename;
        this.mailRequest.subject = "états paie";
        this.mailRequest.msg = "Veuillez trouver ci-attaché les états paie du mois.";
        this.mailRequest.from = this.currentUser.email;
        /**************initialisation of mail to save in DB************************************* */
        this.email.emailobject = this.mailRequest.subject;
        this.email.iduser = this.currentUser.iduser;
        this.email.msg = this.mailRequest.msg;
        for (var i = 0; i < this.mailRequest.to.length; i++) {
            this.email.receiver = this.email.receiver.concat(this.mailRequest.to[i] + ";");
        }
        this.email.sender = this.mailRequest.from;
        /**************get Efiles for choosed structure************************************* */
        this.updatedStructure.emailgroupmanagers = structure.emailgroupmanagers;
        this.updatedStructure.idactivity = structure.idactivity;
        this.updatedStructure.idstructure = structure.idstructure;
        this.updatedStructure.structurecodelike = structure.structurecodelike;
        this.updatedStructure.structurecodenotlike = structure.structurecodenotlike;
        this.updatedStructure.structurename = structure.structurename;
        this.updatedStructure.statusstructure = 2;
        this.updatedStructure.fichiercodelike = structure.fichiercodelike;
        this.updatedStructure.fichiercodenotlike = structure.fichiercodenotlike;
        this.homeService.getEfiles(structure).subscribe(function (data) {
            if (data.length != 0) {
                //   //console.log(data);
                //send email
                _this.eFiles = data;
                _this.sendEmailToManagers(_this.updatedStructure, structure);
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
    FilesGeneratorComponent.prototype.sendEmailToManagers = function (struture, currentStructure) {
        var _this = this;
        this.homeService.sendEmailZip(this.mailRequest).subscribe(function (data) {
            //  //console.log(data);
            if (data != null) {
                if (data.status == true) {
                    _this.saveEmailDB(struture, currentStructure);
                    if (data.message == "error files count") {
                        _this.countFilesErrorResponse = data.message;
                    }
                }
                else {
                    _this.openDialog();
                }
            }
            else {
                _this.openDialog();
            }
        }, function (error) {
            //  //console.log(error);
            _this.openDialogError(error);
            throw error;
        });
    };
    FilesGeneratorComponent.prototype.saveEmailDB = function (struture, currentStructure) {
        var _this = this;
        this.archiveSentFiles = [];
        this.homeService.SaveSentEmail(this.email).subscribe(function (data) {
            // //console.log(data);
            if (data != null) {
                _this.emailSaved = true;
                for (var i = 0; i < _this.eFiles.length; i++) {
                    _this.archiveSentFiles.push({ "idemail": data.idemail, "idfile": _this.eFiles[i].idfile });
                }
                // //console.log(this.archiveSentFiles)
                _this.saveArchiveSentFiles(currentStructure);
            }
            else {
                _this.openDialog();
            }
        }, function (error) {
            // //console.log(error);
            _this.openDialogError(error);
            throw error;
        });
        //console.log(struture)
        this.homeService.updateStructureStatus(struture).subscribe(function (data) {
            if (data != null) {
                //  //console.log(data);
            }
            else {
                _this.openDialog();
            }
        }, function (error) {
            //  //console.log(error);
            _this.openDialogError(error);
            throw error;
        });
    };
    FilesGeneratorComponent.prototype.saveArchiveSentFiles = function (currentStructure) {
        var _this = this;
        this.homeService.SaveArchiveSentFiles(this.archiveSentFiles).subscribe(function (data) {
            //  //console.log(data);
            if (data != null) {
                _this.archiveSentFilesSaved = true;
                currentStructure.statusstructure = 2;
                _this.showSpinner = false;
                if (_this.countFilesErrorResponse != "") {
                    _this.showAlert("Envoie Email", "L'email a bien été envoyé aux gestionnaires. " +
                        "&#9888;" + "  ATTENTION :" + "  Le nombre de fichiers envoyés est inférieur au nombre total des fichiers");
                }
                else {
                    _this.showAlert("Envoie Email", "L'email a bien été envoyé aux gestionnaires");
                }
                _this.deleteZip(currentStructure);
                _this.copyFileToPrint(currentStructure);
            }
            else {
                _this.openDialog();
            }
        }, function (error) {
            //   //console.log(error);
            _this.openDialogError(error);
            throw error;
        });
    };
    FilesGeneratorComponent.prototype.copyFileToPrint = function (str) {
        this.homeService.copyFileToPrint(str).subscribe(function (data) {
            if (data != null) {
                //console.log(data);
            }
            else {
                //this.openDialog();
            }
        }, function (error) {
            console.log(error);
            //this.openDialogError(error);
            throw error;
        });
    };
    FilesGeneratorComponent.prototype.deleteZip = function (currentStructure) {
        this.homeService.deleteZip(currentStructure).subscribe(function (data) {
            if (data != null) {
                //console.log(data);
            }
            else {
                //this.openDialog();
            }
        }, function (error) {
            console.log(error);
            //this.openDialogError(error);
            throw error;
        });
    };
    FilesGeneratorComponent.prototype.showAlert = function (title, msg) {
        angular_lite_1.mobiscroll.alert({
            title: title,
            message: msg
            /* ,callback: function () {
              window.location.reload();
             }*/
        });
    };
    //----------------------------------------------------------------Suspendre/activer Structure-----------------------------------------------------------------------
    FilesGeneratorComponent.prototype.suspendreStructure = function (structure) {
        var _this = this;
        var etat = structure.isactif;
        structure.isactif = 0;
        this.homeService.suspendreStructure(structure).subscribe(function (data) {
            //  //console.log(data);
            if (data != null) {
                _this.showAlert("Suspension Structure", "La structure a bien été suspendue");
            }
            else {
                structure.isactif = etat;
                _this.openDialog();
            }
        }, function (error) {
            //  //console.log(error);
            _this.openDialogError(error);
            throw error;
        });
    };
    FilesGeneratorComponent.prototype.activerStructure = function (structure) {
        var _this = this;
        var etat = structure.isactif;
        structure.isactif = 1;
        this.homeService.activerStructure(structure).subscribe(function (data) {
            //console.log(data);
            if (data != null) {
                _this.showAlert("Activation Structure", "La structure a bien été activée");
            }
            else {
                structure.isactif = etat;
                _this.openDialog();
            }
        }, function (error) {
            //    //console.log(error);
            _this.openDialogError(error);
            throw error;
        });
    };
    //----------------------------------------------------------------générer etats-----------------------------------------------------------------------
    FilesGeneratorComponent.prototype.genererEtats = function (structure, state) {
        //console.log(this.showProgress)
        this.codeStructure = [];
        if (structure.structurecodelike.includes("/")) {
            this.codeStructure = structure.structurecodelike.split("/");
        }
        else {
            this.codeStructure.push(structure.structurecodelike);
        }
        // //console.log(this.codeStructure);
        if (this.allEtatJournal.length == 0 || this.allEtatMand.length == 0 || this.allEtatMip.length == 0 || this.allEtatRecap.length == 0 || this.allEtatRet.length == 0) {
            this.showConfirm();
        }
        else {
            this.filtrerEtats(this.codeStructure, structure, state);
        }
    };
    FilesGeneratorComponent.prototype.showAlertInit = function (title, msg) {
        angular_lite_1.mobiscroll.alert({
            title: title,
            message: msg
        });
    };
    FilesGeneratorComponent.prototype.showConfirm = function () {
        var _this = this;
        angular_lite_1.mobiscroll.confirm({
            title: "Chargement des données",
            message: "Aucune donnée n'est chargée! Voulez vous charger les données?",
            okText: 'Charger',
            cancelText: 'Annuler'
        }).then(function (result) {
            // //console.log(result ? 'Agreed.' : 'Disagreed.');
            if (result) {
                _this.chargerDonnees();
            }
        });
    };
    FilesGeneratorComponent.prototype.filtrerEtats = function (codeLike, str, state) {
        if (state == 1) {
            this.showProgress = true;
        }
        else {
            this.showProgressAllEtat = true;
        }
        this.filteredEtatJournal = [];
        this.filteredEtatMand = [];
        this.filteredEtatMip = [];
        this.filteredEtatRecap = [];
        this.filteredEtatRet = [];
        this.codeNotLike = [];
        if (str.structurecodenotlike != "0") {
            this.codeNotLike = str.structurecodenotlike.split("/");
            // //console.log(this.codeNotLike);
        }
        //filtrer journal
        for (var i = 0; i < this.allEtatJournal.length; i++) {
            if (codeLike.length == 1) {
                if (this.allEtatJournal[i].cstr.startsWith(codeLike[0])) {
                    this.filteredEtatJournal.push(this.allEtatJournal[i]);
                }
            }
            else {
                for (var j = 0; j < codeLike.length; j++) {
                    if (this.allEtatJournal[i].cstr.startsWith(codeLike[j])) {
                        this.filteredEtatJournal.push(this.allEtatJournal[i]);
                    }
                }
            }
        }
        //   //console.log(this.filteredEtatJournal);
        this.uploadedFiles[0].progress = 25;
        if (str.structurecodenotlike != "0") {
            this.filteredEtatJournal = this.isExistCodeNotLike(this.filteredEtatJournal, this.codeNotLike);
            // //console.log(this.isExistCodeNotLike(this.filteredEtatJournal,this.codeNotLike));
        }
        // //console.log(this.filteredEtatJournal)
        this.uploadedFiles[0].progress = 50;
        //filtrer mand
        for (var i = 0; i < this.allEtatMand.length; i++) {
            if (codeLike.length == 1) {
                if (this.allEtatMand[i].dir.startsWith(codeLike[0])) {
                    this.filteredEtatMand.push(this.allEtatMand[i]);
                }
            }
            else {
                for (var j = 0; j < codeLike.length; j++) {
                    if (this.allEtatMand[i].dir.startsWith(codeLike[j])) {
                        this.filteredEtatMand.push(this.allEtatMand[i]);
                    }
                }
            }
        }
        this.uploadedFiles[1].progress = 25;
        if (str.structurecodenotlike != "0") {
            //  //console.log(this.filteredEtatMand);
            this.filteredEtatMand = this.isExistCodeNotLike(this.filteredEtatMand, this.codeNotLike);
            // //console.log(this.isExistCodeNotLike(this.filteredEtatJournal,this.codeNotLike));
        }
        //  //console.log(this.filteredEtatMand)
        this.uploadedFiles[1].progress = 50;
        //filtrer mip
        for (var i = 0; i < this.allEtatMip.length; i++) {
            if (codeLike.length == 1) {
                if (this.allEtatMip[i].dir.startsWith(codeLike[0])) {
                    this.filteredEtatMip.push(this.allEtatMip[i]);
                }
            }
            else {
                for (var j = 0; j < codeLike.length; j++) {
                    if (this.allEtatMip[i].dir.startsWith(codeLike[j])) {
                        this.filteredEtatMip.push(this.allEtatMip[i]);
                    }
                }
            }
        }
        this.uploadedFiles[2].progress = 25;
        if (str.structurecodenotlike != "0") {
            //  //console.log(this.filteredEtatMip);
            this.filteredEtatMip = this.isExistCodeNotLike(this.filteredEtatMip, this.codeNotLike);
            // //console.log(this.isExistCodeNotLike(this.filteredEtatJournal,this.codeNotLike));
        }
        //  //console.log(this.filteredEtatMip)
        this.uploadedFiles[2].progress = 50;
        //filtrer recap
        for (var i = 0; i < this.allEtatRecap.length; i++) {
            if (codeLike.length == 1) {
                if (this.allEtatRecap[i].dir.startsWith(codeLike[0])) {
                    this.filteredEtatRecap.push(this.allEtatRecap[i]);
                }
            }
            else {
                for (var j = 0; j < codeLike.length; j++) {
                    if (this.allEtatRecap[i].dir.startsWith(codeLike[j])) {
                        this.filteredEtatRecap.push(this.allEtatRecap[i]);
                    }
                }
            }
        }
        this.uploadedFiles[4].progress = 25;
        if (str.structurecodenotlike != "0") {
            //  //console.log(this.filteredEtatRecap);
            this.filteredEtatRecap = this.isExistCodeNotLike(this.filteredEtatRecap, this.codeNotLike);
            // //console.log(this.isExistCodeNotLike(this.filteredEtatJournal,this.codeNotLike));
        }
        //  //console.log(this.filteredEtatRecap)
        this.uploadedFiles[4].progress = 50;
        //filter ret
        for (var i = 0; i < this.allEtatRet.length; i++) {
            if (codeLike.length == 1) {
                if (this.allEtatRet[i].dir.startsWith(codeLike[0])) {
                    this.filteredEtatRet.push(this.allEtatRet[i]);
                }
            }
            else {
                for (var j = 0; j < codeLike.length; j++) {
                    if (this.allEtatRet[i].dir.startsWith(codeLike[j])) {
                        this.filteredEtatRet.push(this.allEtatRet[i]);
                    }
                }
            }
        }
        this.uploadedFiles[3].progress = 25;
        if (str.structurecodenotlike != "0") {
            // //console.log(this.filteredEtatRet);
            this.filteredEtatRet = this.isExistCodeNotLike(this.filteredEtatRet, this.codeNotLike);
            // //console.log(this.isExistCodeNotLike(this.filteredEtatJournal,this.codeNotLike));
        }
        //   //console.log(this.filteredEtatRet)
        this.uploadedFiles[3].progress = 50;
        this.generateEtatFiles(str, state);
    };
    FilesGeneratorComponent.prototype.isExistCodeNotLike = function (etatArray, codeNotLike) {
        var test = [];
        if (codeNotLike.length == 1) {
            for (var i = 0; i < etatArray.length; i++) {
                if (etatArray[i].dir.startsWith(codeNotLike[0])) {
                    test.push(etatArray[i]);
                }
            }
        }
        else {
            for (var i = 0; i < etatArray.length; i++) {
                for (var j = 0; j < codeNotLike.length; j++) {
                    if (etatArray[i].dir.startsWith(codeNotLike[j])) {
                        test.push(etatArray[i]);
                    }
                }
            }
        }
        // //console.log(test)
        etatArray = etatArray.filter(function (el) { return !test.includes(el); });
        return etatArray;
    };
    FilesGeneratorComponent.prototype.generateEtatFiles = function (structure, state) {
        var _this = this;
        //  //console.log("generation des fichiers")
        this.uploadedFiles[1].progress = 75;
        this.homeService.generateMand(this.filteredEtatMand, structure.structurename).subscribe(function (data) {
            // //console.log("mand")
            // //console.log(data);
            if (data != null) {
                var efile = {
                    "idfile": 0,
                    "filename": "MAND",
                    "filegenerationdate": new Date(),
                    "idfiletype": 0,
                    "idpaymonth": 0,
                    "idstructure": structure.idstructure,
                    "iduser": _this.currentUser.iduser,
                    "validatedflag": 1
                };
                _this.efiles.push(efile);
                _this.mand = true;
                _this.uploadedFiles[1].progress = 100;
                _this.saveGeneratedFilesInDB(structure, state);
                //this.showAlert("Activation Structure","La structure a bien été activée");
            }
            else {
                _this.openDialog();
            }
        }, function (error) {
            //  //console.log(error);
            _this.openDialogError(error);
            throw error;
        });
        this.uploadedFiles[0].progress = 75;
        this.homeService.generateJournal(this.filteredEtatJournal, structure.structurename).subscribe(function (data) {
            // //console.log("jour")
            // //console.log(data);
            if (data != null) {
                var efile = {
                    "idfile": 0,
                    "filename": "JOUR",
                    "filegenerationdate": new Date(),
                    "idfiletype": 0,
                    "idpaymonth": 0,
                    "idstructure": structure.idstructure,
                    "iduser": _this.currentUser.iduser,
                    "validatedflag": 1
                };
                _this.efiles.push(efile);
                _this.jour = true;
                _this.uploadedFiles[0].progress = 100;
                _this.saveGeneratedFilesInDB(structure, state);
                //this.showAlert("Activation Structure","La structure a bien été activée");
            }
            else {
                _this.openDialog();
            }
        }, function (error) {
            //  //console.log(error);
            _this.openDialogError(error);
            throw error;
        });
        this.uploadedFiles[2].progress = 75;
        this.homeService.generateMip(this.filteredEtatMip, structure.structurename).subscribe(function (data) {
            //  //console.log("mip")
            //   //console.log(data);
            if (data != null) {
                var efile = {
                    "idfile": 0,
                    "filename": "MIP",
                    "filegenerationdate": new Date(),
                    "idfiletype": 0,
                    "idpaymonth": 0,
                    "idstructure": structure.idstructure,
                    "iduser": _this.currentUser.iduser,
                    "validatedflag": 1
                };
                _this.efiles.push(efile);
                _this.mip = true;
                _this.uploadedFiles[2].progress = 100;
                _this.saveGeneratedFilesInDB(structure, state);
                //this.showAlert("Activation Structure","La structure a bien été activée");
            }
            else {
                _this.openDialog();
            }
        }, function (error) {
            //   //console.log(error);
            _this.openDialogError(error);
            throw error;
        });
        this.uploadedFiles[3].progress = 75;
        this.homeService.generateRet(this.filteredEtatRet, structure.structurename).subscribe(function (data) {
            // //console.log("ret")
            //   //console.log(data);
            if (data != null) {
                var efile = {
                    "idfile": 0,
                    "filename": "RET",
                    "filegenerationdate": new Date(),
                    "idfiletype": 0,
                    "idpaymonth": 0,
                    "idstructure": structure.idstructure,
                    "iduser": _this.currentUser.iduser,
                    "validatedflag": 1
                };
                _this.efiles.push(efile);
                _this.ret = true;
                _this.uploadedFiles[3].progress = 100;
                _this.saveGeneratedFilesInDB(structure, state);
                //this.showAlert("Activation Structure","La structure a bien été activée");
            }
            else {
                _this.openDialog();
            }
        }, function (error) {
            //   //console.log(error);
            _this.openDialogError(error);
            throw error;
        });
        this.uploadedFiles[4].progress = 75;
        this.homeService.generateRecap(this.filteredEtatRecap, structure.structurename).subscribe(function (data) {
            //   //console.log("recap")
            //  //console.log(data);
            if (data != null) {
                var efile = {
                    "idfile": 0,
                    "filename": "REC",
                    "filegenerationdate": new Date(),
                    "idfiletype": 0,
                    "idpaymonth": 0,
                    "idstructure": structure.idstructure,
                    "iduser": _this.currentUser.iduser,
                    "validatedflag": 1
                };
                _this.efiles.push(efile);
                _this.recap = true;
                _this.uploadedFiles[4].progress = 100;
                _this.saveGeneratedFilesInDB(structure, state);
                //this.showAlert("Activation Structure","La structure a bien été activée");
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
    //********************************************SaveGeneratedFilesInDB************************************************************************************************* */
    FilesGeneratorComponent.prototype.saveGeneratedFilesInDB = function (structure, state) {
        var _this = this;
        if (this.jour && this.mip && this.mand && this.ret && this.recap) {
            this.homeService.saveGeneratedFiles(this.efiles).subscribe(function (data) {
                // //console.log("save generated files in db")
                //  //console.log(data);
                if (data != null) {
                    _this.updateStatusStructure(structure, state);
                    //this.showAlert("Activation Structure","La structure a bien été activée");
                }
                else {
                    _this.openDialog();
                }
            }, function (error) {
                //  //console.log(error);
                _this.openDialogError(error);
                throw error;
            });
        }
    };
    FilesGeneratorComponent.prototype.updateStatusStructure = function (structure, state) {
        var _this = this;
        structure.statusstructure = 4;
        structure.isactif = 0;
        structure.flagetat = 1;
        this.homeService.updateStructureFilesGenerated(structure).subscribe(function (data) {
            //  //console.log("updateStatusStructure")
            //  //console.log(data);
            if (data != null) {
                if (state == 1) {
                    _this.showProgress = false;
                    _this.showAlertGeneration("Génération etats paie", "Les etats ont bien été générés.");
                }
                else {
                    _this.jour = false;
                    _this.mip = false;
                    _this.mand = false;
                    _this.ret = false;
                    _this.recap = false;
                    _this.indexE++;
                    if (_this.indexE < _this.ELEMENT_DATA.length) {
                        _this.genererToutLesEtats(_this.indexE);
                    }
                    else {
                        _this.indexE = 0;
                        _this.showProgressAllEtat = false;
                        _this.showAlert("Génération de tout les états paie", "Les états de toutes les structures ont bien été générés.");
                    }
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
    //************************************************************Générer les fichiers (newpaie,pers,frub)***************************************************** */
    FilesGeneratorComponent.prototype.genererFichiers = function (structure, state) {
        var _this = this;
        if (state == 1) {
            this.showProgressFichier = true;
            this.uploadedFichiers[0].progress = 10;
            this.uploadedFichiers[1].progress = 10;
            this.uploadedFichiers[2].progress = 10;
        }
        else {
            this.showProgressAllFichier = true;
        }
        this.codeStructure = [];
        this.efichiers = [];
        if (structure.structurecodelike.includes("/")) {
            this.codeStructure = structure.structurecodelike.split("/");
        }
        else {
            this.codeStructure.push(structure.structurecodelike);
        }
        // console.log(this.codeStructure)
        this.homeService.generateNewPaieStr(structure).subscribe(function (data) {
            // console.log(data);
            if (data != null) {
                var efile = {
                    "idfile": 0,
                    "filename": "NEWPAIE",
                    "filegenerationdate": new Date(),
                    "idfiletype": 0,
                    "idpaymonth": 0,
                    "idstructure": structure.idstructure,
                    "iduser": _this.currentUser.iduser,
                    "validatedflag": 1
                };
                _this.efichiers.push(efile);
                _this.newpaie = true;
                _this.uploadedFichiers[0].progress = 50;
                _this.saveGeneratedFichiersInDB(structure, state);
            }
            else {
                _this.openDialog();
            }
        }, function (error) {
            // //console.log(error);
            _this.openDialogError(error);
            throw error;
        });
        if (this.codeStructure.map(function (s) { return (/^[a-z].*/i.test(s)); }).includes(true)) {
            //console.log("alph")
            this.homeService.generateFrubAStr(structure).subscribe(function (data) {
                //  //console.log("updateStatusStructure")
                //  //console.log(data);
                if (data != null) {
                    // console.log(data)
                    var efile = {
                        "idfile": 0,
                        "filename": "FRUBALPH",
                        "filegenerationdate": new Date(),
                        "idfiletype": 0,
                        "idpaymonth": 0,
                        "idstructure": structure.idstructure,
                        "iduser": _this.currentUser.iduser,
                        "validatedflag": 1
                    };
                    _this.efichiers.push(efile);
                    _this.frub = true;
                    _this.uploadedFichiers[2].progress = 50;
                    _this.saveGeneratedFichiersInDB(structure, state);
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
            this.homeService.generateFrubNStr(structure).subscribe(function (data) {
                //console.log(data);
                if (data != null) {
                    var efile = {
                        "idfile": 0,
                        "filename": "FRUBNUM",
                        "filegenerationdate": new Date(),
                        "idfiletype": 0,
                        "idpaymonth": 0,
                        "idstructure": structure.idstructure,
                        "iduser": _this.currentUser.iduser,
                        "validatedflag": 1
                    };
                    _this.efichiers.push(efile);
                    _this.frub = true;
                    _this.uploadedFichiers[2].progress = 50;
                    _this.saveGeneratedFichiersInDB(structure, state);
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
        this.homeService.generatePersStr(structure).subscribe(function (data) {
            // console.log(data);
            if (data != null) {
                var efile = {
                    "idfile": 0,
                    "filename": "PERS",
                    "filegenerationdate": new Date(),
                    "idfiletype": 0,
                    "idpaymonth": 0,
                    "idstructure": structure.idstructure,
                    "iduser": _this.currentUser.iduser,
                    "validatedflag": 1
                };
                _this.efichiers.push(efile);
                _this.pers = true;
                _this.uploadedFichiers[1].progress = 50;
                _this.saveGeneratedFichiersInDB(structure, state);
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
    /********************************************SaveGeneratedFilesInDB************************************************************************************************* */
    FilesGeneratorComponent.prototype.saveGeneratedFichiersInDB = function (structure, state) {
        var _this = this;
        if (this.frub && this.newpaie && this.pers) {
            if (state == 1) {
                this.uploadedFichiers[0].progress = 80;
                this.uploadedFichiers[1].progress = 80;
                this.uploadedFichiers[2].progress = 80;
            }
            this.homeService.saveGeneratedFiles(this.efichiers).subscribe(function (data) {
                // //console.log("save generated files in db")
                //  //console.log(data);
                if (data != null) {
                    _this.updateStatusStructureFichier(structure, state);
                    //this.showAlert("Activation Structure","La structure a bien été activée");
                }
                else {
                    _this.openDialog();
                }
            }, function (error) {
                //  //console.log(error);
                _this.openDialogError(error);
                throw error;
            });
        }
    };
    FilesGeneratorComponent.prototype.updateStatusStructureFichier = function (structure, state) {
        var _this = this;
        if (state == 1) {
            this.uploadedFichiers[0].progress = 100;
            this.uploadedFichiers[1].progress = 100;
            this.uploadedFichiers[2].progress = 100;
        }
        structure.statusstructure = 5;
        structure.isactif = 0;
        structure.flagfichier = 1;
        this.homeService.updateStructureFilesGenerated(structure).subscribe(function (data) {
            //  //console.log("updateStatusStructure")
            //  //console.log(data);
            if (data != null) {
                if (state == 1) {
                    _this.showProgressFichier = false;
                    _this.showAlertGenerationFichiers("Génération fichiers paie", "Les fichiers ont bien été générés.");
                }
                else {
                    _this.index++;
                    _this.newpaie = false;
                    _this.pers = false;
                    _this.frub = false;
                    if (_this.index < _this.ELEMENT_DATA.length) {
                        _this.genererToutLesFichiers(_this.index);
                    }
                    else {
                        _this.index = 0;
                        _this.showProgressAllFichier = false;
                        _this.showAlert("Génération de tout les fichiers", "Les fichiers de toutes les structures ont bien été générés.");
                    }
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
    //******************************************************Activer/suspendre All*************************************************************************** */
    FilesGeneratorComponent.prototype.activerAll = function () {
        var _this = this;
        this.homeService.activerAll().subscribe(function (data) {
            if (data != null) {
                for (var i = 0; i < _this.ELEMENT_DATA.length; i++) {
                    _this.ELEMENT_DATA[i].isactif = 1;
                }
            }
            else {
                _this.openDialog();
            }
        }, function (error) {
            //console.log(error);
            _this.openDialogError(error);
            throw error;
        });
    };
    FilesGeneratorComponent.prototype.suspendreAll = function () {
        var _this = this;
        this.homeService.suspendreAll().subscribe(function (data) {
            if (data != null) {
                for (var i = 0; i < _this.ELEMENT_DATA.length; i++) {
                    _this.ELEMENT_DATA[i].isactif = 0;
                }
            }
            else {
                _this.openDialog();
            }
        }, function (error) {
            //console.log(error);
            _this.openDialogError(error);
            throw error;
        });
    };
    //******************************************************Generer tout les fichiers/etats pour toutes les structures******************************************** */
    FilesGeneratorComponent.prototype.genererToutLesFichiers = function (position) {
        this.generatedStructure = this.ELEMENT_DATA[position].structurename;
        this.genererFichiers(this.ELEMENT_DATA[position], 2);
    };
    FilesGeneratorComponent.prototype.genererToutLesEtats = function (position) {
        this.generatedStructureE = this.ELEMENT_DATA[position].structurename;
        this.genererEtats(this.ELEMENT_DATA[position], 2);
    };
    //****************************************************POUR LA RECHERCHE ET LES ERRURS ****************************************************************** */
    FilesGeneratorComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    FilesGeneratorComponent.prototype.openDialog = function () {
        var dialogRef = this.dialog.open(alert_dialog_component_1.AlertDialogComponent);
        dialogRef.afterClosed().subscribe(function (result) {
            window.location.reload();
        });
    };
    FilesGeneratorComponent.prototype.openDialogError = function (error) {
        var dialogRef = this.dialog.open(error_dialog_component_1.ErrorDialogComponent, {
            width: '650px',
            data: { message: error }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            window.location.reload();
        });
    };
    FilesGeneratorComponent.prototype.showAlertGeneration = function (title, msg) {
        if (this.jour && this.mip && this.mand && this.ret && this.recap) {
            this.jour = false;
            this.mip = false;
            this.mand = false;
            this.ret = false;
            this.recap = false;
            angular_lite_1.mobiscroll.alert({
                title: title,
                message: msg
                /* ,callback: function () {
                  window.location.reload();
                 }*/
            });
        }
    };
    FilesGeneratorComponent.prototype.showAlertGenerationFichiers = function (title, msg) {
        if (this.newpaie && this.pers && this.frub) {
            this.newpaie = false;
            this.pers = false;
            this.frub = false;
            angular_lite_1.mobiscroll.alert({
                title: title,
                message: msg
                /* ,callback: function () {
                  window.location.reload();
                 }*/
            });
        }
    };
    __decorate([
        core_1.ViewChild(sort_1.MatSort)
    ], FilesGeneratorComponent.prototype, "matSort");
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], FilesGeneratorComponent.prototype, "matPaginator");
    FilesGeneratorComponent = __decorate([
        core_1.Component({
            selector: 'app-files-generator',
            templateUrl: './files-generator.component.html',
            styleUrls: ['./files-generator.component.css']
        })
    ], FilesGeneratorComponent);
    return FilesGeneratorComponent;
}());
exports.FilesGeneratorComponent = FilesGeneratorComponent;
