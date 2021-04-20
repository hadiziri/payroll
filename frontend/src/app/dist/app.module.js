"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var commun_service_1 = require("./Services/commun.service");
var input_1 = require("@angular/material/input");
var global_error_handler_service_1 = require("./Services/global-error-handler.service");
var auth_interceptor_1 = require("./auth/auth-interceptor");
var home_component_1 = require("./home/home.component");
var error_component_1 = require("./error/error.component");
var update_structure_component_1 = require("./update-structure/update-structure.component");
var delete_structure_component_1 = require("./delete-structure/delete-structure.component");
var add_structure_component_1 = require("./add-structure/add-structure.component");
var app_routing_1 = require("./app-routing");
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var core_2 = require("@angular/material/core");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var files_generator_component_1 = require("./files-generator/files-generator.component");
var animations_1 = require("@angular/platform-browser/animations");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var paginator_1 = require("@angular/material/paginator");
var icon_1 = require("@angular/material/icon");
var forms_1 = require("@angular/forms");
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
var header_component_1 = require("./header/header.component");
var card_1 = require("@angular/material/card");
var angular_lite_1 = require("@mobiscroll/angular-lite");
var progress_spinner_1 = require("@angular/material/progress-spinner");
var settings_component_1 = require("./settings/settings.component");
var stepper_1 = require("@angular/material/stepper");
var forms_2 = require("@angular/forms");
var form_field_1 = require("@angular/material/form-field");
var core_3 = require("@angular/material/core");
var expansion_1 = require("@angular/material/expansion");
var checkbox_1 = require("@angular/material/checkbox");
var divider_1 = require("@angular/material/divider");
var slide_toggle_1 = require("@angular/material/slide-toggle");
var file_to_print_settings_component_1 = require("./file-to-print-settings/file-to-print-settings.component");
var tabs_1 = require("@angular/material/tabs");
var storage_settings_component_1 = require("./storage-settings/storage-settings.component");
var grid_list_1 = require("@angular/material/grid-list");
var cloture_paie_component_1 = require("./cloture-paie/cloture-paie.component");
var cloturer_mois_component_1 = require("./cloturer-mois/cloturer-mois.component");
var dialog_1 = require("@angular/material/dialog");
var autocomplete_1 = require("@angular/material/autocomplete");
var toolbar_1 = require("@angular/material/toolbar");
var commun_service_2 = require(".//Services/commun.service");
var alert_dialog_component_1 = require("./alert-dialog/alert-dialog.component");
var generate_table_files_component_1 = require("./generate-table-files/generate-table-files.component");
var button_1 = require("@angular/material/button");
var update_storage_settings_component_1 = require("./update-storage-settings/update-storage-settings.component");
var add_storage_settings_component_1 = require("./add-storage-settings/add-storage-settings.component");
var navigation_history_component_1 = require("./navigation-history/navigation-history.component");
var error_dialog_component_1 = require("./error-dialog/error-dialog.component");
var progress_bar_1 = require("@angular/material/progress-bar");
var send_etat_fichier_component_1 = require("./send-etat-fichier/send-etat-fichier.component");
var select_etat_fichier_component_1 = require("./select-etat-fichier/select-etat-fichier.component");
var datepicker_1 = require("@angular/material/datepicker");
var control_generation_component_1 = require("./control-generation/control-generation.component");
var generate_controlled_etat_fichier_component_1 = require("./generate-controlled-etat-fichier/generate-controlled-etat-fichier.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                files_generator_component_1.FilesGeneratorComponent, add_structure_component_1.AddStructureComponent, delete_structure_component_1.DeleteStructureComponent, update_structure_component_1.UpdateStructureComponent, error_component_1.ErrorComponent, home_component_1.HomeComponent, login_component_1.LoginComponent, register_component_1.RegisterComponent, header_component_1.HeaderComponent, settings_component_1.SettingsComponent, file_to_print_settings_component_1.FileToPrintSettingsComponent, storage_settings_component_1.StorageSettingsComponent, cloture_paie_component_1.CloturePaieComponent, cloturer_mois_component_1.CloturerMoisComponent,
                alert_dialog_component_1.AlertDialogComponent, generate_table_files_component_1.GenerateTableFilesComponent, update_storage_settings_component_1.UpdateStorageSettingsComponent, add_storage_settings_component_1.AddStorageSettingsComponent, navigation_history_component_1.NavigationHistoryComponent, error_dialog_component_1.ErrorDialogComponent, send_etat_fichier_component_1.SendEtatFichierComponent, select_etat_fichier_component_1.SelectEtatFichierComponent, control_generation_component_1.ControlGenerationComponent, generate_controlled_etat_fichier_component_1.GenerateControlledEtatFichierComponent
            ],
            entryComponents: [alert_dialog_component_1.AlertDialogComponent, update_storage_settings_component_1.UpdateStorageSettingsComponent, error_dialog_component_1.ErrorDialogComponent, select_etat_fichier_component_1.SelectEtatFichierComponent, generate_controlled_etat_fichier_component_1.GenerateControlledEtatFichierComponent],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpClientModule, app_routing_1.ROUTING, animations_1.BrowserAnimationsModule,
                table_1.MatTableModule,
                sort_1.MatSortModule,
                paginator_1.MatPaginatorModule,
                icon_1.MatIconModule,
                forms_1.FormsModule,
                card_1.MatCardModule,
                angular_lite_1.MbscModule,
                progress_spinner_1.MatProgressSpinnerModule,
                stepper_1.MatStepperModule,
                forms_2.ReactiveFormsModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                core_3.MatRippleModule,
                checkbox_1.MatCheckboxModule,
                expansion_1.MatExpansionModule,
                divider_1.MatDividerModule,
                slide_toggle_1.MatSlideToggleModule,
                tabs_1.MatTabsModule,
                grid_list_1.MatGridListModule,
                dialog_1.MatDialogModule,
                autocomplete_1.MatAutocompleteModule,
                toolbar_1.MatToolbarModule,
                button_1.MatButtonModule,
                progress_bar_1.MatProgressBarModule,
                datepicker_1.MatDatepickerModule,
                core_2.MatNativeDateModule
            ],
            providers: [
                { provide: http_1.HTTP_INTERCEPTORS, useClass: auth_interceptor_1.AuthInterceptor, multi: true },
                commun_service_1.CommunService,
                { provide: core_1.APP_INITIALIZER, useFactory: commun_service_2.initConfig, deps: [commun_service_1.CommunService], multi: true },
                { provide: core_1.ErrorHandler, useClass: global_error_handler_service_1.GlobalErrorHandlerService }
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
