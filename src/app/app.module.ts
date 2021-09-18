import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarcodeScannerComponent } from './barcode-scanner/barcode-scanner.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IconsModule } from './icons/icons.module';
import { LoginComponent } from './components/login/login.component';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { FormsModule } from '@angular/forms';
import { ErrorPipe } from './pipes/error.pipe';
import { NavWrapperComponent } from './components/nav-wrapper/nav-wrapper.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ObjectDetectionComponent } from './object-detection/object-detection.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BarcodeScannerComponent,
    LoginComponent,
    TextFieldComponent,
    ErrorPipe,
    NavWrapperComponent,
    InventoryComponent,
    ObjectDetectionComponent
  ],
  imports: [
    BrowserModule,
    IconsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
