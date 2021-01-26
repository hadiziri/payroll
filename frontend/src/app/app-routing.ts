import { NavigationHistoryComponent } from './navigation-history/navigation-history.component';
import { AddStorageSettingsComponent } from './add-storage-settings/add-storage-settings.component';
import { CloturerMoisComponent } from './cloturer-mois/cloturer-mois.component';
import { CloturePaieComponent } from './cloture-paie/cloture-paie.component';
import { StorageSettingsComponent } from './storage-settings/storage-settings.component';
import { FileToPrintSettingsComponent } from './file-to-print-settings/file-to-print-settings.component';
import { SettingsComponent } from './settings/settings.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { UpdateStructureComponent } from './update-structure/update-structure.component';
import { HomeComponent } from './home/home.component';

import { DeleteStructureComponent } from './delete-structure/delete-structure.component';
import { AddStructureComponent } from './add-structure/add-structure.component';
import {Routes, RouterModule}from '@angular/router';
import { FilesGeneratorComponent } from './files-generator/files-generator.component';
import { GenerateTableFilesComponent } from './generate-table-files/generate-table-files.component';

const APP_ROUTING : Routes =[
    {path:'home', component:HomeComponent },
    {path :'historique',component:NavigationHistoryComponent},
    {path :'addStructure',component:AddStructureComponent},
    {path :"structures", component :DeleteStructureComponent},
    {path :"", component :HomeComponent},
    {path :"updateStructure/:id", component :UpdateStructureComponent},
    {path: 'auth/login',component: LoginComponent},
    {path: 'signup',component: RegisterComponent},
    {path: 'parametre',component: SettingsComponent},
    {path:'fileToPrint',component:FileToPrintSettingsComponent},
    {path:'storageSettings',component:StorageSettingsComponent},
    {path:'cloturePaie',component:CloturePaieComponent},
    {path:'clotureMois',component:CloturerMoisComponent},
    {path :"Error", component: ErrorComponent},
    {path :"generateTableFiles", component: GenerateTableFilesComponent},
    {path :"addNewFolder", component: AddStorageSettingsComponent}
   
    
]

export const ROUTING =RouterModule.forRoot(APP_ROUTING);