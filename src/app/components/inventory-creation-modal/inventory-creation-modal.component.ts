import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormViewModel, ValidatableInput, TextFieldViewModel } from '@writools/wagon-forms';
import { FormModalBaseComponent } from '../form-modal-base.component';
import { InventoryService, Inventory } from '../../services/inventory.service';
import { LottieService } from '../../services/lottie.service';

@Component({
    selector: 'app-inventory-creation-modal',
    templateUrl: './inventory-creation-modal.component.html',
    styleUrls: ['./inventory-creation-modal.component.scss']
})
export class InventoryCreationModalComponent extends FormModalBaseComponent {

    @Output() inventoryCreated = new EventEmitter<Inventory>()

    viewModel: InventoryCreationVM = new InventoryCreationVM();

    constructor(private inventoryService: InventoryService, public animations: LottieService) {
        super();
    }

    protected onFormValidated(request: any): void {
        this.isLoading = true;
        this.inventoryService.createInventory(request.title).subscribe(inv => {
            this.inventoryCreated.emit(inv);
            this.close();
        }).add(() => this.isLoading = false);
    }
}

export class InventoryCreationVM extends FormViewModel {

    title = new TextFieldViewModel({
        name: 'title',
        placeholder: 'Give a unique name to your inventory',
        required: true
    });

    getInputs(): ValidatableInput[] {
        return [this.title];
    }

}
