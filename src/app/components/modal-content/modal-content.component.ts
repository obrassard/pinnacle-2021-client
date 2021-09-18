import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-modal-content',
    templateUrl: './modal-content.component.html',
    styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent implements OnInit {

    @Input() defaultOpen = false;
    @Input() closable = true;
    @Input() backgroundOverlay = true;
    @Input() wider = false;

    @Output() modalDidOpen = new EventEmitter();

    public opened = false;
    public get isOpened(): boolean {
        return this.opened;
    }

    ngOnInit(): void {
        this.opened = this.defaultOpen;
    }

    public show(): void {
        this.opened = true;
        setTimeout(() => {
            this.modalDidOpen.emit();
        }, 100);
    }

    public dismiss(): void {
        this.opened = false;
    }
}
