import {Page, Events} from 'ionic-angular';
import {AuthService} from '../../services/AuthService';
import {AthleteService} from '../../services/AthleteService';

@Page({
    templateUrl: 'build/pages/auth/login.html',
    providers: [AthleteService, AuthService]
})
export class LoginPage {

    public error: any;
    public createAccount: boolean = false;

    constructor(private authService: AuthService,
                private athletes: AthleteService) {}

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
        }).then( (user) => {
            console.log('Register User Data' , user);
            this.athletes.createAthlete(user.uid, credentials.email);
        });
    }

    create(_event) {
        _event.preventDefault();
        console.log('Create Button');
        this.createAccount = true;
    }

} 
