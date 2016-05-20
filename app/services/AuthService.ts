import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {
    public ref = new Firebase('https://popping-inferno-7577.firebaseio.com/');
    
    constructor() {
        
    }

    getAuth() {
        return this.ref.getAuth();
    }

    logout() {
        return this.ref.unauth;
    }

    login(credentials) {

    }

    createUser(credentials) {
        
    }
}