import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarcodeScannerComponent } from './barcode-scanner/barcode-scanner.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { InventoryComponent } from './components/inventory/inventory.component';
import { RecipesComponent } from './components/recipes/recipes.component';

const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "scan", canActivate: [AuthGuard], component: BarcodeScannerComponent },
    { path: "", canActivate: [AuthGuard], component: InventoryComponent },
    { path: "recipe", canActivate: [AuthGuard], component: RecipesComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
