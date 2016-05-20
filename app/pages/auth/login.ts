import {Page, Modal, NavController, ViewController, Events} from 'ionic-angular';
import {LoginPage} from '../auth/login';
import {AuthService} from '../../services/AuthService';
import {TabsPage} from "../tabs/tabs";
import {OnInit} from '@angular/core'

@Page({
    templateUrl: 'build/pages/auth/login.html',
    providers: [AuthService]
})
export class LoginPage implements OnInit {

    public error: any;
    public authInfo: any;

    constructor(public nav: NavController,
                private authService: AuthService,
                public events: Events) {
        this.authInfo = this.authService.getAuth();
    }

    ngOnInit() {
        if (this.authInfo) {
            this.events.publish('user:login');
        }
    }

    login( credentials, _event) {
        _event.preventDefault();

        this.authService.login(credentials, (error, data) => {
            if(error) {
                console.warn('error ' , error);
                this.error = error;
            } else {
                console.log('Login Succesful: ' + data.uid);
                this.events.publish('user:login');
            }
        });

    }

    registerUser(credentials, _event) {
        _event.preventDefault();

        this.authService.createUser(credentials, (error, data) => {
            if (error) {
                console.warn('Error Creating User ', error);
                this.error = error;
            } else {
                console.log('User Created: ', data.uid);
                this.login(credentials, _event);
            }
        });
    }
}
