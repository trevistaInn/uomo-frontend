import styles from "./BlackButton.module.css"

export default function BlackButton({children, onClick}){
    return(
        <button className={styles.button} onClick={onClick}>{children}</button>
    )
}