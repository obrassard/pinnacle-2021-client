import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObjectDetectionComponent } from './object-detection/object-detection.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { InventoryComponent } from './components/inventory/inventory.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { InventoryDetailComponent } from './components/inventory-detail/inventory-detail.component';

const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "inventories/:id/:operation", canActivate: [AuthGuard], component: ObjectDetectionComponent },
    { path: "", canActivate: [AuthGuard], component: InventoryComponent },
    { path: "inventories/:id", canActivate: [AuthGuard], component: InventoryDetailComponent },
    { path: "recipe", canActivate: [AuthGuard], component: RecipesComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
