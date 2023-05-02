import { Link } from "react-router-dom"
import styles from '../../styles/styles.module.css'

export const FooterMenu = ({className, children}) => {
    return(
        <>
       <nav className={styles.space}>
        {children}
        <Link to='/'>Main Page </Link>
        </nav>
        <span>Check out who we are</span>
    </>

    )
}