"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var UserService = /** @class */ (function () {
    function UserService(http, communService) {
        this.http = http;
        this.userUrl = communService.getHost();
    }
    UserService.prototype.updatePsw = function (user) {
        return this.http.post(this.userUrl + "updatePsw", user).pipe(operators_1.catchError(function (err) {
            //console.log('error caught in service')
            console.error(err);
            return rxjs_1.throwError(err);
        }));
    };
    UserService.prototype.comparePsw = function (user) {
        return this.http.post(this.userUrl + "comparePsw", user).pipe(operators_1.catchError(function (err) {
            //console.log('error caught in service')
            console.error(err);
            return rxjs_1.throwError(err);
        }));
    };
    UserService.prototype.getCurrentMonth = function () {
        return this.http.get(this.userUrl + "getCurrentMonth").pipe(operators_1.catchError(function (err) {
            //console.log('error caught in service')
            console.error(err);
            return rxjs_1.throwError(err);
        }));
    };
    UserService.prototype.deleteAllSwap = function () {
        return this.http.get(this.userUrl + "api/auth/deleteAllSwap").pipe(operators_1.catchError(function (err) {
            //console.log('error caught in service')
            console.error(err);
            return rxjs_1.throwError(err);
        }));
    };
    UserService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
