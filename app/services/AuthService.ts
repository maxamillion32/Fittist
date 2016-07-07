import {Injectable} from '@angular/core';
import {Events} from 'ionic-angular';
import {AngularFire, AuthProviders, AuthMethods} from 'angularfire2';
@Injectable()
export class AuthService {
    
    constructor(public events: Events,
                public af: AngularFire) {
    }

    getAuth() {
        return firebase.auth().currentUser;
    }

    get id() {
        return firebase.auth().currentUser.uid;
    }

    logout() {
        return this.af.auth.logout();
    }

    passwordLogin(credentials) {
        return this.af.auth.login(credentials, {
            provider: AuthProviders.Password,
            method: AuthMethods.Password,
        });
    }

    createUser(credentials) {
        /* Add user to users database */
        // ref.child('athletes').push({email: credentials.email});
        return this.af.auth.createUser(credentials);
    }
}