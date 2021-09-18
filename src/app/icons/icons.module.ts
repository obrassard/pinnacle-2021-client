import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { Menu, X } from 'angular-feather/icons';

// Select some icons (use an object, not an array)
const icons = {
    Menu, X
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
