import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ToasterService, Toast, ToastType } from '../../services/toaster.service';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

    toastIsShown = false;
    currentToast?: Toast;

    constructor(private toaster: ToasterService) { }

    ngOnInit(): void {
        this.toaster.publisher$.subscribe(this.onNewToast.bind(this));
        this.toaster.publisher$
            .pipe(switchMap(() => timer(6000)))
            .subscribe(() => this.dismissToast());
    }

    onNewToast(toast: Toast): void {
        this.currentToast = toast;
        timer(200).subscribe(() => {
            this.showToast();
        });
    }

    showToast(): void {
        if (!this.currentToast) { return; }
        this.toastIsShown = true;
    }

    dismissToast(): void {
        this.toastIsShown = false;
    }

    toastColor(toast: Toast): string {
        switch (toast.type) {
            case ToastType.SUCCESS:
                return 'green-500';
            case ToastType.WARNING:
                return 'yellow-400';
            case ToastType.ERROR:
                return 'red-500';
            case ToastType.INFO:
                return 'blue-500';
        }
    }
}
