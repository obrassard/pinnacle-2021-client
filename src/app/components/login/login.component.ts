import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailFieldViewModel, FormViewModel, TextFieldViewModel, ValidatableInput, PasswordFieldViewModel } from '@writools/wagon-forms';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    signup = false;
    loading = false;
    loginVm = new LoginViewModel();
    signupVm = new SignupViewModel();

    constructor(private userService: UserService, private router: Router) { }

    switchContext() {
        if (this.loading) { return; }
        this.signup = !this.signup;
        this.signupVm.clear();
        this.loginVm.clear();
    }

    login() {
        if (this.loading) { return; }
        this.loginVm.validateForm(data => {
            this.loading = true;
            this.userService.login(data.email).subscribe(() => {
                this.router.navigate(['/']);
            }, error => {
                console.log(error);
                this.loginVm.clear();
            }).add(() => this.loading = false);
        })
    }

    submitSignup() {
        if (this.loading) { return; }
        this.signupVm.validateForm(data => {
            this.loading = true;
            this.userService.signup(data).subscribe(() => {
                this.router.navigate(['/']);
            }, error => {
                console.log(error);
            }).add(() => this.loading = false);
        })
    }
}

export class LoginViewModel extends FormViewModel {
    email = new EmailFieldViewModel({
        name: 'email',
        placeholder: 'Enter your email',
        required: true,
    })

    password = new PasswordFieldViewModel({
        name: 'password',
        placeholder: 'Enter your password',
        required: true,
    })

    getInputs(): ValidatableInput[] {
        return [this.email, this.password];
    }
}

export class SignupViewModel extends LoginViewModel {
    firstName = new TextFieldViewModel({
        name: 'firstName',
        placeholder: 'Enter your first name',
        required: true,
    })

    lastName = new TextFieldViewModel({
        name: 'lastName',
        placeholder: 'Enter your last name',
        required: true,
    })

    phoneNumber = new TextFieldViewModel({
        name: 'phoneNumber',
        placeholder: 'Enter your phone number',
        required: true,
    })

    getInputs(): ValidatableInput[] {
        return [this.email, this.password, this.firstName, this.lastName, this.phoneNumber];
    }
}
