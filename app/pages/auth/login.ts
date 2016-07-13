import {Page, Events} from 'ionic-angular';
import {Component} from '@angular/core';
import {AuthService} from '../../services/AuthService';
import {AthleteService} from '../../services/AthleteService';
import {AngularFire, AuthProviders, AuthMethods} from 'angularfire2';

@Component({
    templateUrl: 'build/pages/auth/login.html',
    providers: [AthleteService, AuthService]
})
export class LoginPage {

    public error: any;
    public createAccount: boolean = false;

    constructor(private authService: AuthService,
                private athletes: AthleteService,
                public af: AngularFire) {}

    login( credentials, _event) {
        _event.preventDefault();

        this.authService.passwordLogin(credentials)
        .then(success => {
            console.log('Login Succesful');
        }).catch(error => {
            console.warn('Login Error', error);
        });
    }

    registerUser(credentials, _event) {
        console.log(credentials);
        if (!(credentials &&
             credentials.email &&
            credentials.password &&
            credentials.team !== '' &&
            credentials.name !== '')) {
            this.error = "Please Include All Fields";
            return;
        }
        /* Validate */
        _event.preventDefault();
        
        this.authService.createUser(credentials).catch((error) => {
            this.error = error;
            console.warn('Error Signing In: ', error);
        }).then( (user) => {
            console.log('Register User Data' , user);
            this.athletes.createAthlete(user.uid, credentials);
        });
       
    }

    facebookLogin() {
        this.authService.loginWithFacebook().then(result => {
            console.log('Redirect Result: ', result);
        });
    }

    create(_event) {
        _event.preventDefault();
        console.log('Create Button');
        this.createAccount = true;
    }

} 
