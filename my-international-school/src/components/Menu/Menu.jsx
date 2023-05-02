import { NavLink, Navigate } from 'react-router-dom';
import styles from '../../styles/styles.module.css';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';



export const Menu = ({className, isAuth, nick}) => {
    return(
        <nav className={styles.sticky}>
            <ul className={styles.menu}>
                Menu:
                <li>
                    <NavLink to='/'>Main Page</NavLink>
                </li>
                {!isAuth && (
                
                    <li>
                    <NavLink to='/auth'>Register / Login</NavLink>
                    </li>
                    
                )}
             {isAuth && (
                <> 
                 <li>
                    <NavLink to='students'>Students</NavLink>
                </li>
                <li>
                    <NavLink to='comments'>Comments</NavLink>
                </li>
                <li>
                    <NavLink to='grades'>Grades</NavLink>
                </li>
                <li onClick={() => signOut(auth)}>
                <NavLink to='/' className={styles.signOut}>Sign Out</NavLink> 
                </li>
                </>
             )}
               
            </ul>

        </nav>
       
    )
}