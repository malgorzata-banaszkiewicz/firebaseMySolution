import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { getFormDataRegister, getFormDataLogin } from "./getFormData";
import { firebaseErrors } from "./firebaseErrors";
import styles from '../../styles/styles.module.css'

export const Auth = () => {
    const handleRegister = e => {
        e.preventDefault();
        const { email, nick, password } = getFormDataRegister(e);
        createUserWithEmailAndPassword(auth, email, nick, password)
        .then(jwt => {
            e.target.reset();
            console.log(jwt);
            signOut(auth)
        })
        .catch(e => {
            console.dir(e)
            alert(firebaseErrors[e.code])
        })
    }

    const handleLogin = e => {
        e.preventDefault();
        const { email, password } = getFormDataLogin(e);
        signInWithEmailAndPassword(auth, email, password)
        .then(jwt => {
            e.target.reset();
            console.dir(jwt)
        })
        .catch(e => {
            console.dir(e)
            alert(firebaseErrors[e.code])
    
        })
    }
    return(
        <div className={styles.breathe}>
    <form onSubmit={handleRegister} className={styles.breathe}>Registration form
        <div className={styles.breathe}>
            <label htmlFor="registerEmail">E-mail</label>
            <input type="text" name="registerEmail" id="registerEmail"></input>
        </div>
        <div className={styles.breathe}>
            <label htmlFor="nick">Nick</label>
            <input type="text" name="nick" id="nick"></input>
        </div>
        <div className={styles.breathe}>
            <label htmlFor="registerPassword">Password</label>
            <input type="password" name="registerPassword" id="registerPassword"></input>
        </div>
        <button type="submit">Register</button>
    </form >
      <form onSubmit={handleLogin} className={styles.breathe}>Already have an account? Login! 
      <div className={styles.breathe}>
            <label htmlFor="loginEmail">E-mail</label>
            <input type="text" name="loginEmail" id="loginEmail"></input>
        </div>
      <div className={styles.breathe}>
          <label htmlFor="loginPassword">Password</label>
          <input type="password" name="loginPassword" id="loginPassword"></input>
      </div>
      <button type="submit">Login</button>
  </form>
 </div>

    )
}