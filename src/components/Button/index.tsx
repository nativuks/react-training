

import {firebase,auth} from '../../services/firebase';

export function Button () {

    async function signInGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
      
        const result = await auth.signInWithPopup(provider);
        console.log('Login', result);

    }

    async function logOut() {
        console.log('Logout');
        auth.signOut();
    }

    return(
        <div>
            <button onClick={signInGoogle}>Login</button>
            <button onClick={logOut}>Logout</button>
        </div>
    );
}