import { Component, OnInit } from '@angular/core';
import { Inventory, InventoryService } from '../../services/inventory.service';
import { LottieService } from '../../services/lottie.service';

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

    inventories?: Inventory[];

    constructor(private inventoryService: InventoryService, public animations: LottieService) { }

    ngOnInit(): void {
        this.inventoryService.getUsersInventories().subscribe(
            inventories => this.inventories = inventories
        );
    }
}
