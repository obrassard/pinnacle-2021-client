import { Component, OnInit, ViewChild } from '@angular/core';
import { Inventory, InventoryService } from '../../services/inventory.service';
import { LottieService } from '../../services/lottie.service';
import { InventoryCreationModalComponent } from '../inventory-creation-modal/inventory-creation-modal.component';

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

    @ViewChild(InventoryCreationModalComponent) modal?: InventoryCreationModalComponent;
    inventories?: Inventory[];

    constructor(private inventoryService: InventoryService, public animations: LottieService) { }

    ngOnInit(): void {
        this.inventoryService.getUsersInventories().subscribe(
            inventories => this.inventories = inventories
        );
    }

    openInventoryModal() {
        this.modal?.show();
    }

    inventoryCreated(inv: Inventory) {
        this.inventories?.push(inv);
    }
}
