"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ParametreService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var ParametreService = /** @class */ (function () {
    function ParametreService(httpClient, communService) {
        this.httpClient = httpClient;
        this.host = communService.getHost();
    }
    ParametreService.prototype.getEtats = function () {
        return this.httpClient.get(this.host + "allEtats").pipe(operators_1.catchError(function (err) {
            //console.log('error caught in service')
            console.error(err);
            return rxjs_1.throwError(err);
        }));
    };
    ParametreService.prototype.saveFileToPrint = function (file) {
        return this.httpClient.post(this.host + "saveFileToPrint", file).pipe(operators_1.catchError(function (err) {
            //console.log('error caught in service')
            console.error(err);
            return rxjs_1.throwError(err);
        }));
    };
    ParametreService.prototype.deleteFileToPrint = function (file) {
        return this.httpClient.post(this.host + "deleteFileToPrint", file).pipe(operators_1.catchError(function (err) {
            //console.log('error caught in service')
            console.error(err);
            return rxjs_1.throwError(err);
        }));
    };
    ParametreService.prototype.getAllFileToPrint = function () {
        return this.httpClient.get(this.host + "allFileToPrint").pipe(operators_1.catchError(function (err) {
            //console.log('error caught in service')
            console.error(err);
            return rxjs_1.throwError(err);
        }));
    };
    ParametreService.prototype.getSelectedEtat = function (file) {
        return this.httpClient.post(this.host + "selectedEtats", file).pipe(operators_1.catchError(function (err) {
            //console.log('error caught in service')
            console.error(err);
            return rxjs_1.throwError(err);
        }));
    };
    ParametreService.prototype.getAllShActivities = function () {
        return this.httpClient.get(this.host + "allShActivities").pipe(operators_1.catchError(function (err) {
            //console.log('error caught in service')
            console.error(err);
            return rxjs_1.throwError(err);
        }));
    };
    ParametreService.prototype.getStructureByActivity = function (activity) {
        return this.httpClient.post(this.host + "getStructurByActivity", activity).pipe(operators_1.catchError(function (err) {
            //console.log('error caught in service')
            console.error(err);
            return rxjs_1.throwError(err);
        }));
    };
    ParametreService.prototype.updateStructure = function (structure) {
        return this.httpClient.post(this.host + "updateStructure", structure).pipe(operators_1.catchError(function (err) {
            //console.log('error caught in service')
            console.error(err);
            return rxjs_1.throwError(err);
        }));
    };
    ParametreService.prototype.updateStructureArchive = function (archiveStructure) {
        return this.httpClient.post(this.host + "updateStructureArchive", archiveStructure).pipe(operators_1.catchError(function (err) {
            //console.log('error caught in service')
            console.error(err);
            return rxjs_1.throwError(err);
        }));
    };
    ParametreService.prototype.getUserByUserName = function (u) {
        return this.httpClient.post(this.host + "getUserByUserName", u).pipe(operators_1.catchError(function (err) {
            //console.log('error caught in service')
            console.error(err);
            return rxjs_1.throwError(err);
        }));
    };
    ParametreService.prototype.deleteStructure = function (structure) {
        return this.httpClient.post(this.host + "deleteStructure", structure).pipe(operators_1.catchError(function (err) {
            //console.log('error caught in service')
            console.error(err);
            return rxjs_1.throwError(err);
        }));
    };
    ParametreService.prototype.addStructure = function (structure) {
        return this.httpClient.post(this.host + "addStructure", structure).pipe(operators_1.catchError(function (err) {
            //console.log('error caught in service')
            console.error(err);
            return rxjs_1.throwError(err);
        }));
    };
    ParametreService.prototype.addArchiveStructure = function (structure) {
        return this.httpClient.post(this.host + "addArchiveStructure", structure).pipe(operators_1.catchError(function (err) {
            //console.log('error caught in service')
            console.error(err);
            return rxjs_1.throwError(err);
        }));
    };
    ParametreService.prototype.deleteFolderPath = function (folderArchive) {
        return this.httpClient.post(this.host + "deleteFolderPath", folderArchive).pipe(operators_1.catchError(function (err) {
            //console.log('error caught in service')
            console.error(err);
            return rxjs_1.throwError(err);
        }));
    };
    ParametreService.prototype.updateFolderPath = function (folder) {
        return this.httpClient.post(this.host + "updateFolderPath", folder).pipe(operators_1.catchError(function (err) {
            //console.log('error caught in service')
            console.error(err);
            return rxjs_1.throwError(err);
        }));
    };
    ParametreService.prototype.updateFolderPathArchive = function (folderArchive) {
        return this.httpClient.post(this.host + "updateFolderPathArchive", folderArchive).pipe(operators_1.catchError(function (err) {
            //console.log('error caught in service')
            console.error(err);
            return rxjs_1.throwError(err);
        }));
    };
    ParametreService.prototype.addNewFolder = function (folder) {
        return this.httpClient.post(this.host + "addNewFolder", folder).pipe(operators_1.catchError(function (err) {
            //console.log('error caught in service')
            console.error(err);
            return rxjs_1.throwError(err);
        }));
    };
    ParametreService.prototype.addNewFolderArchive = function (folderArchive) {
        return this.httpClient.post(this.host + "addNewFolderArchive", folderArchive).pipe(operators_1.catchError(function (err) {
            //console.log('error caught in service')
            console.error(err);
            return rxjs_1.throwError(err);
        }));
    };
    ParametreService.prototype.addFilesToNewFolder = function (files) {
        return this.httpClient.post(this.host + "addFilesToNewFolder", files).pipe(operators_1.catchError(function (err) {
            //console.log('error caught in service')
            console.error(err);
            return rxjs_1.throwError(err);
        }));
    };
    ParametreService.prototype.getAllFileType = function () {
        return this.httpClient.get(this.host + "getAllFileType").pipe(operators_1.catchError(function (err) {
            //console.log('error caught in service')
            console.error(err);
            return rxjs_1.throwError(err);
        }));
    };
    ParametreService.prototype.getNotGeneratedStructure = function () {
        return this.httpClient.get(this.host + "getNotGeneratedStructure").pipe(operators_1.catchError(function (err) {
            //console.log('error caught in service')
            console.error(err);
            return rxjs_1.throwError(err);
        }));
    };
    ParametreService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ParametreService);
    return ParametreService;
}());
exports.ParametreService = ParametreService;
