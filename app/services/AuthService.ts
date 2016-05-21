import {Injectable} from '@angular/core';
import {Events} from 'ionic-angular';

@Injectable()
export class AuthService {
    public ref = new Firebase('https://popping-inferno-7577.firebaseio.com/');
    
    constructor(public events: Events) {
    }

    getAuth() {
        return this.ref.getAuth();
    }

    logout() {
        return this.ref.unauth();
    }

    login(credentials, _callback) {
        
        return this.ref.authWithPassword({
            email: credentials.email,
            password: credentials.password
        }, _callback);

    }

    createUser(credentials, _callback) {
        /* Add user to users database */
        this.ref.child('athletes').push({email: credentials.email});
        
        return this.ref.createUser({
            email: credentials.email,
            password: credentials.password
        }, _callback);
    }
}