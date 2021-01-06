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

const APP_ROUTING : Routes =[
    {path:'home', component:HomeComponent },
    {path :'historique',component:FilesGeneratorComponent},
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
    {path :"Error", component: ErrorComponent}
   
    
]

export const ROUTING =RouterModule.forRoot(APP_ROUTING);