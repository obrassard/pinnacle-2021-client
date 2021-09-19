import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { Menu, X, Loader, Plus, Minus, ChevronDown, ChevronUp } from 'angular-feather/icons';

// Select some icons (use an object, not an array)
const icons = {
    Menu, X, Loader, Plus, Minus, ChevronDown, ChevronUp
};

@NgModule({
    imports: [
        FeatherModule.pick(icons)
    ],
    exports: [
        FeatherModule
    ]
})
export class IconsModule { }
