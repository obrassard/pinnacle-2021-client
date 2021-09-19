import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventoryDetails, InventoryItem, InventoryService } from '../../services/inventory.service';
import { LottieService } from '../../services/lottie.service';
import { ItemDetailComponent } from '../item-detail/item-detail.component';
import { ItemInstance } from '../../services/item.service';

@Component({
    selector: 'app-inventory-detail',
    templateUrl: './inventory-detail.component.html',
    styleUrls: ['./inventory-detail.component.scss']
})
export class InventoryDetailComponent implements OnInit {

    @ViewChild(ItemDetailComponent) itemDetailComponent?: ItemDetailComponent;

    inventory?: InventoryDetails;
    inventoryId?: string;

    constructor(private inventoryService: InventoryService, private route: ActivatedRoute, public animations: LottieService) { }

    ngOnInit(): void {
        this.inventoryId = this.route.snapshot.paramMap.get('id') as string;
        this.inventoryService.getInventoryDetails(this.inventoryId).subscribe(data => {
            this.inventory = data;
        });
    }

    click(item: InventoryItem) {
        this.itemDetailComponent?.open(item.itemId);
    }
}
