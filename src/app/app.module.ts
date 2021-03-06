import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IconsModule } from './icons/icons.module';
import { LoginComponent } from './components/login/login.component';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { FormsModule } from '@angular/forms';
import { ErrorPipe } from './pipes/error.pipe';
import { NavWrapperComponent } from './components/nav-wrapper/nav-wrapper.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeItemComponent } from './components/recipes/recipe-item/recipe-item.component';
import { ObjectDetectionComponent } from './object-detection/object-detection.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { ModalContentComponent } from './components/modal-content/modal-content.component';
import { InventoryCreationModalComponent } from './components/inventory-creation-modal/inventory-creation-modal.component';
import { ToastComponent } from './components/toast/toast.component';
import { InventoryDetailComponent } from './components/inventory-detail/inventory-detail.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    TextFieldComponent,
    ErrorPipe,
    NavWrapperComponent,
    InventoryComponent,
    ObjectDetectionComponent,
    RecipesComponent,
    RecipeItemComponent,
    ModalContentComponent,
    InventoryCreationModalComponent,
    ToastComponent,
    InventoryDetailComponent,
    ItemDetailComponent,
  ],
  imports: [
    BrowserModule,
    IconsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    LottieModule.forRoot({ player: () => player }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
