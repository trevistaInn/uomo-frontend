import styles from "./GreyButton.module.css"

export default function GreyButton({children, onClick}){
    return(
        <button className={styles.button} onClick={onClick}>{children}</button>
    )
}