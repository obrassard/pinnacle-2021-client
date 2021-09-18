import { Component, ViewChild } from '@angular/core';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { FormViewModel } from '@writools/wagon-forms';

@Component({
    template: ''
})
export abstract class FormModalBaseComponent {

    @ViewChild(ModalContentComponent) modal?: ModalContentComponent;

    isLoading = false;
    abstract viewModel: FormViewModel;

    show(): void {
        this.modal?.show();
    }

    cancel(): void {
        this.modal?.dismiss();
    }

    submit(): void {
        if (this.isLoading) { return; }
        this.viewModel.validateForm(
            this.onFormValidated.bind(this)
        );
    }

    protected abstract onFormValidated(request: any): void;
}
