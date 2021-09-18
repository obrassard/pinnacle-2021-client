import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'error'
})
export class ErrorPipe implements PipeTransform {

    private errors: any = {
        allFieldsRequired: 'Please complete all fields.',
        invalidEmailAddress: 'Your email address is invalid.',
        incorrectCredentials: 'Your email or password is incorrect.',
        generic: 'An unexpected error occurred, please try again.',
        requiredField: 'This field is required.',
        upperAndLowerRequired: 'Your password must contain at least one lowercase and one uppercase letter.',
        numberRequired: 'Your password must contain at least one number.',
        specialCharRequired: 'Your password must contain at least one special character.',
        passwordsDoesntMatch: 'Passwords doesn\'t match.',
        maxLength: 'This field cannot contain more than {{maxLength}} characters.',
        minLength: 'This field must contain at least {{minLength}} characters.',
        checkboxIsRequired: 'This is required',
        notANumber: 'This field must be a valid number.',
        notAnInteger: 'This field must be an integer.',
        minValueOverflow: 'This value must be greater or equal to {{minValue}}.',
        maxValueOverflow: 'This value must be smaller or equal to {{maxValue}}.',
        phoneNumbersOnly: 'The phone number contains invalid characters.',
        invalidFileType: 'The type of this file is not accepted.',
        fileMaxSize: 'The size of this file is bigger than the allowed value.'
    }

    transform(key: string): string {
        const lastKey = key.split('.').pop() as string;
        return this.errors[lastKey] as string;
    }
}
