import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBFy5H_OUCSzhHSlNHL9BPWs5BNkxtMWDU',
  authDomain: 'eilbay-89163.firebaseapp.com',
  projectId: 'eilbay-89163',
  storageBucket: 'eilbay-89163.appspot.com',
  messagingSenderId: '992834253336',
  appId: '1:992834253336:web:7e022c0c3193f89f95096d',
  measurementId: 'G-1TLXRN6KDF',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  return signInWithPopup(auth, provider)
}

export { auth, provider }
