import styles from '../../styles/styles.module.css'

export const Footer = ({className, children}) => {
    return(
        <footer className={styles.footer}>{children}</footer>
    )
}