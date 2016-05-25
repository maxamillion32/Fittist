import {Injectable} from '@angular/core';
import {Events} from 'ionic-angular';

@Injectable()
export class AuthService {
    public auth = firebase.auth();
    
    constructor(public events: Events) {
    }

    getAuth() {
        return this.auth.currentUser;
    }

    logout() {
        return this.auth.signOut();
    }

    login(credentials) {
        return this.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
    }

    createUser(credentials) {
        /* Add user to users database */
        // ref.child('athletes').push({email: credentials.email});
        return this.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
    }
}