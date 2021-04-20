"use strict";
exports.__esModule = true;
exports.ROUTING = void 0;
var control_generation_component_1 = require("./control-generation/control-generation.component");
var send_etat_fichier_component_1 = require("./send-etat-fichier/send-etat-fichier.component");
var navigation_history_component_1 = require("./navigation-history/navigation-history.component");
var add_storage_settings_component_1 = require("./add-storage-settings/add-storage-settings.component");
var cloturer_mois_component_1 = require("./cloturer-mois/cloturer-mois.component");
var cloture_paie_component_1 = require("./cloture-paie/cloture-paie.component");
var storage_settings_component_1 = require("./storage-settings/storage-settings.component");
var file_to_print_settings_component_1 = require("./file-to-print-settings/file-to-print-settings.component");
var settings_component_1 = require("./settings/settings.component");
var register_component_1 = require("./register/register.component");
var login_component_1 = require("./login/login.component");
var error_component_1 = require("./error/error.component");
var update_structure_component_1 = require("./update-structure/update-structure.component");
var home_component_1 = require("./home/home.component");
var delete_structure_component_1 = require("./delete-structure/delete-structure.component");
var add_structure_component_1 = require("./add-structure/add-structure.component");
var router_1 = require("@angular/router");
var files_generator_component_1 = require("./files-generator/files-generator.component");
var generate_table_files_component_1 = require("./generate-table-files/generate-table-files.component");
var APP_ROUTING = [
    { path: 'etatPaie', component: files_generator_component_1.FilesGeneratorComponent },
    { path: 'historique', component: navigation_history_component_1.NavigationHistoryComponent },
    { path: 'addStructure', component: add_structure_component_1.AddStructureComponent },
    { path: "structures", component: delete_structure_component_1.DeleteStructureComponent },
    { path: "", component: home_component_1.HomeComponent },
    { path: "updateStructure/:id", component: update_structure_component_1.UpdateStructureComponent },
    { path: 'auth/login', component: login_component_1.LoginComponent },
    { path: 'signup', component: register_component_1.RegisterComponent },
    { path: 'parametre', component: settings_component_1.SettingsComponent },
    { path: 'fileToPrint', component: file_to_print_settings_component_1.FileToPrintSettingsComponent },
    { path: 'storageSettings', component: storage_settings_component_1.StorageSettingsComponent },
    { path: 'cloturePaie', component: cloture_paie_component_1.CloturePaieComponent },
    { path: 'clotureMois', component: cloturer_mois_component_1.CloturerMoisComponent },
    { path: "Error", component: error_component_1.ErrorComponent },
    { path: "generateTableFiles", component: generate_table_files_component_1.GenerateTableFilesComponent },
    { path: "addNewFolder", component: add_storage_settings_component_1.AddStorageSettingsComponent },
    { path: "sendEtatFichier", component: send_etat_fichier_component_1.SendEtatFichierComponent },
    { path: "controlGeneration", component: control_generation_component_1.ControlGenerationComponent }
];
exports.ROUTING = router_1.RouterModule.forRoot(APP_ROUTING);
