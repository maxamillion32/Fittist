import {Page, Modal, NavController, ViewController} from 'ionic-angular';
import {LoginPage} from '../auth/login';

@Page({
    templateUrl: 'build/pages/auth/login.html',
})
export class LoginPage {

    public error: any;
    
    constructor(public viewCtrl: ViewController) {

    }

    login( credentials, _event) {
        _event.preventDefault();

        let addUser = credentials.created;
        credentials.created = null;

        this.ref.authWithPassword({
            email: credentials.email,
            password: credentials.password
        }, (error, authData) => {
            if (error) {
                console.log('error' , error);
                this.error = error;
            } else {
                console.log("Login Succesful", authData);
                this.viewCtrl.dismiss();
            }
        });

    }

    registerUser(credentials, _event) {
        _event.preventDefault();

        this.ref.createUser({
            email: credentials.email,
            password: credentials.password
        } , (error, authData) => {
            if (error) {
                console.log("Error creating user:", error);
                this.error = error;
            } else {
                console.log("Successfully created user account with uid:", authData.uid);
                credentials.created = true;
                this.login(credentials, _event);
            }
        });
    }
}
