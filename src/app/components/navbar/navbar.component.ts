import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    open = false;

    constructor(private userService: UserService) { }

    ngOnInit(): void {
    }

    logout() {
        this.userService.signout();
    }
}
