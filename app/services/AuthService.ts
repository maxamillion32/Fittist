import {Injectable} from '@angular/core';
import {Events} from 'ionic-angular';

@Injectable()
export class AuthService {
    
    constructor(public events: Events) {
    }

    getAuth() {
        return firebase.auth().currentUser;
    }

    get id() {
        return firebase.auth().currentUser.uid;
    }

    logout() {
        return firebase.auth().signOut();
    }

    login(credentials) {
        return firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
    }

    createUser(credentials) {
        /* Add user to users database */
        // ref.child('athletes').push({email: credentials.email});
        return firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password);
    }
}