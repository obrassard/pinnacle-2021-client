import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ToasterService {

    private toastSubject = new Subject<Toast>();
    // eslint-disable-next-line @typescript-eslint/member-ordering
    public publisher$ = this.toastSubject.asObservable();

    public success(message: string, title: string = 'toast.success', translationArgs?: any): void {
        this.toastSubject.next(new Toast(title, message, ToastType.SUCCESS, translationArgs));
    }

    public warning(message: string, title: string = 'toast.warning', translationArgs?: any): void {
        this.toastSubject.next(new Toast(title, message, ToastType.WARNING, translationArgs));
    }

    public error(message: string, title: string = 'toast.error', translationArgs?: any): void {
        this.toastSubject.next(new Toast(title, message, ToastType.ERROR, translationArgs));
    }

    public info(message: string, title: string = 'toast.info', translationArgs?: any): void {
        this.toastSubject.next(new Toast(title, message, ToastType.INFO, translationArgs));
    }
}

export class Toast {
    constructor(public title: string, public message: string, public type: ToastType, public translationsArgs?: any) { }
}

export enum ToastType {
    SUCCESS = 'SUCCESS',
    INFO = 'INFO',
    WARNING = 'WARNING',
    ERROR = 'ERROR',
}
