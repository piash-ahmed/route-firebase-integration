import { useEffect, useState } from "react"
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import app from '../firebase_init'

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const useFirebase = () => {
    const [user,setUser] = useState()

    useEffect(() => {
        onAuthStateChanged(auth,user => {
            setUser(user)
        })
    },[])

    const signInWithGoogle = (e) => {
        e.preventDefault()
        signInWithPopup(auth,googleProvider)
        .then(result => {
            const user = result.user
            setUser(user)
            console.log(user);
        })
        .catch(error => console.error(error))
    }
    const handleSignOut = () => {
        signOut(auth)
        .then(() => {})
    }


    return {user,signInWithGoogle,handleSignOut}
}

export default useFirebase;