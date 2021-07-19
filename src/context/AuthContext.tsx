import { useState, createContext, ReactNode } from "react";
import { firebase, auth } from '../services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string
}

type AuthContextType = {
    user: User |undefined;
    signInWithGoogle: () => Promise<void>
}

type AuthContextProviderType = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderType) {

    const [user, setUser] = useState<User>();


    async function signInWithGoogle() {
        
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await auth.signInWithPopup(provider);

        if ( result.user){
            const { displayName, photoURL, uid } =  result.user;
            if( !displayName || !photoURL){
                throw new Error('Missign information account');    
            }
            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL,
            })
        }
    }

    return (
        <AuthContext.Provider value={{user, signInWithGoogle}}>
            {props.children}
        </AuthContext.Provider>
    )

}