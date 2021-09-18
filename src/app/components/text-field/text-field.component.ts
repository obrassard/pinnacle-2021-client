import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FieldViewModel } from '@writools/wagon-forms';

@Component({
    selector: 'app-text-field',
    templateUrl: './text-field.component.html',
    styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent implements OnInit {

    @Input() viewModel?: FieldViewModel;
    @Input() label?: string;

    @Output() enterPressed: EventEmitter<any> = new EventEmitter();
    @Output() enteredFocus: EventEmitter<string> = new EventEmitter();

    public translateParams: any;

    public ngOnInit(): void {
        this.translateParams = { maxLength: this.viewModel?.maxLength, minLength: this.viewModel?.minLength };
    }

    handleKeyUp(e: KeyboardEvent): void {
        if (e.key === 'Enter') {
            this.enterPressed.emit();
        }
    }

    onFocus() {
        this.enteredFocus.emit(this.viewModel?.name);
    }
}
