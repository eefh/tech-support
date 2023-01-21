import styles from "../styles/Modal.module.css"
export default function Tutorial(props) {

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modal}>
                <div className={styles.exit} >
                    <ion-icon onClick={() => props.setTutorial(false)}name="close-outline"></ion-icon>
                </div>
                <div className={styles.modalContent}>
                    <h1>How to use Apo</h1>
                    <p>Ask Apo tech questions</p>
                    <ul>
                        <li>Be specific to</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}