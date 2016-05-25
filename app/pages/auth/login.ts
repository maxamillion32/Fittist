import {Page, Modal, NavController, ViewController, Events} from 'ionic-angular';
import {AuthService} from '../../services/AuthService';
import {TabsPage} from "../tabs/tabs";
import {OnInit} from '@angular/core'

@Page({
    templateUrl: 'build/pages/auth/login.html',
    providers: [AuthService]
})
export class LoginPage {

    public error: any;
    public authInfo: any;

    constructor(public nav: NavController,
                private authService: AuthService,
                public events: Events) {
        this.authInfo = this.authService.getAuth();
    }

    login( credentials, _event) {
        _event.preventDefault();

        this.authService.login(credentials).catch((error) => {
            this.error = error;
            console.warn('error logging in');
        });

    }

    registerUser(credentials, _event) {
        _event.preventDefault();

        this.authService.createUser(credentials).catch((error) => {
            this.error = error;
            console.warn('Error Signing In: ', error);
        });
    }
}
