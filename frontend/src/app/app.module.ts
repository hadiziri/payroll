import { CommunService } from './Services/commun.service';
import { MatInputModule } from '@angular/material/input';
import { GlobalErrorHandlerService } from './Services/global-error-handler.service';
import { AuthInterceptor } from './auth/auth-interceptor';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { UpdateStructureComponent } from './update-structure/update-structure.component';
import { DeleteStructureComponent } from './delete-structure/delete-structure.component';
import { AddStructureComponent } from './add-structure/add-structure.component';
import{ROUTING} from './app-routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'
import { MatNativeDateModule } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilesGeneratorComponent } from './files-generator/files-generator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule} from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import {MatCardModule} from '@angular/material/card';
import { MbscModule } from '@mobiscroll/angular-lite';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SettingsComponent } from './settings/settings.component';
import {MatStepperModule} from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRippleModule } from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FileToPrintSettingsComponent } from './file-to-print-settings/file-to-print-settings.component';

import {MatTabsModule} from '@angular/material/tabs';
import { StorageSettingsComponent } from './storage-settings/storage-settings.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { CloturePaieComponent } from './cloture-paie/cloture-paie.component';
import { CloturerMoisComponent } from './cloturer-mois/cloturer-mois.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatToolbarModule} from '@angular/material/toolbar';
import {  initConfig } from './/Services/commun.service';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { GenerateTableFilesComponent } from './generate-table-files/generate-table-files.component';
import {MatButtonModule} from '@angular/material/button';
import { UpdateStorageSettingsComponent } from './update-storage-settings/update-storage-settings.component';
import { AddStorageSettingsComponent } from './add-storage-settings/add-storage-settings.component';
import { NavigationHistoryComponent } from './navigation-history/navigation-history.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';



import {MatProgressBarModule} from '@angular/material/progress-bar';
import { SendEtatFichierComponent } from './send-etat-fichier/send-etat-fichier.component';
import { SelectEtatFichierComponent } from './select-etat-fichier/select-etat-fichier.component';
import {MatDatepickerModule} from '@angular/material/datepicker';










@NgModule({
  declarations: [
    AppComponent,
    FilesGeneratorComponent,AddStructureComponent,DeleteStructureComponent,UpdateStructureComponent,ErrorComponent,HomeComponent, LoginComponent, RegisterComponent, HeaderComponent, SettingsComponent, FileToPrintSettingsComponent,  StorageSettingsComponent, CloturePaieComponent, CloturerMoisComponent, 
    AlertDialogComponent, GenerateTableFilesComponent, UpdateStorageSettingsComponent, AddStorageSettingsComponent, NavigationHistoryComponent, ErrorDialogComponent, SendEtatFichierComponent, SelectEtatFichierComponent
  ],
  entryComponents: [AlertDialogComponent,UpdateStorageSettingsComponent,ErrorDialogComponent,SelectEtatFichierComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,ROUTING, BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    FormsModule,
    MatCardModule,
    MbscModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatGridListModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule
 
  
 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,    useClass: AuthInterceptor,    multi: true  },
    CommunService,
    {provide: APP_INITIALIZER, useFactory: initConfig,deps: [CommunService],multi: true},
    { provide: ErrorHandler, useClass:GlobalErrorHandlerService}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
