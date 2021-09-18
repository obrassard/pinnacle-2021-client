import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObjectDetectionComponent } from './object-detection/object-detection.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { InventoryComponent } from './components/inventory/inventory.component';

const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "scan", canActivate: [AuthGuard], component: ObjectDetectionComponent },
    { path: "", canActivate: [AuthGuard], component: InventoryComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
