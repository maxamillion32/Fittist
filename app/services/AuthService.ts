import {Injectable} from '@angular/core';
import {Events} from 'ionic-angular';
import {AngularFire, AuthProviders, AuthMethods} from 'angularfire2';
import {Facebook} from 'ionic-native';

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

    loginWithFacebook() {

        Facebook.login(['email','public_profile','user_friends']).then(response => {
            console.log('Response: ' + JSON.stringify(response));

            let creds = firebase.auth.FacebookAuthProvider
                .credential(response.authResponse.accessToken)

            let scope = new firebase.auth.FacebookAuthProvider()

            console.log('Credentials: ' + JSON.stringify(creds));

            let providerConfig = {
                provider: AuthProviders.Facebook,
                method: AuthMethods.OAuthToken,
                remember: 'default',
                scope: ['public_profile','email','user_friends']
            }

            this.af.auth.login(creds , providerConfig)
                .then( (authData) => {
                    /* Check if user exists, if not add user to database */
                    this.addUser(authData);
                    console.log("Firebase Success: " + JSON.stringify(authData));
                    
                }).catch(error => {
                    console.warn('Error ' + JSON.stringify(error));
                    throw error;
                });

        }).catch( error => {
            console.warn('Facebook Error: ' +  JSON.stringify(error));
            throw error;
            
        })

    }

    createUser(credentials) {
        /* Add user to users database */
        return this.af.auth.createUser(credentials);
    }

    addUser(_authData) {
        /* 
        To Get Friends List, may have to use graph api
        $http.get("https://graph.facebook.com/v2.0/me?fields=friends&access_token="+authData.facebook.accessToken)
        */
        this.af.database.list('/athletes').update( _authData.uid , {
            'name': _authData.auth.displayName,
            'email': _authData.auth.providerData[0].email,
            'photoUrl': _authData.auth.providerData[0].photoURL,
            '': [],
        });
    }
}