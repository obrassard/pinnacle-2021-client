import { Component, Input, OnInit } from '@angular/core';
import { ItemService, ItemInventoryDetail } from '../../services/item.service';
import { LottieService } from '../../services/lottie.service';

@Component({
    selector: 'app-item-detail',
    templateUrl: './item-detail.component.html',
    styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent {

    @Input() inventoryId?: string;
    itemDetail?: ItemInventoryDetail;
    opened: boolean = false;

    constructor(private itemService: ItemService, public animations: LottieService) { }

    open(itemId: string) {
        if (!this.inventoryId) { return };
        this.opened = true;
        document.body.style.overflow = 'hidden';
        window.scrollTo(0, 0);
        this.itemService.getItemDetail(this.inventoryId, itemId).subscribe((item) => {
            this.itemDetail = item;
        });
    }

    close() {
        this.opened = false;
        document.body.style.overflow = 'auto';
        this.itemDetail = undefined;
    }
}
