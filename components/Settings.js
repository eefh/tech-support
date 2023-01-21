import styles from "../styles/Modal.module.css";
export default function Settings(props) {

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modal}>
                <div className={styles.exit}>
                    <ion-icon
                        onClick={() => props.setSettings(false)}
                        name="close-outline"
                    ></ion-icon>
                </div>
                <div className={styles.modalContent}>
                    <h1>Language</h1>
                    {props.language === "en" && (
                        <div className={styles.languages}>
                            <p
                                onClick={() => props.setLanguage("en")}
                                className={styles.selected}
                            >
                                English
                            </p>
                            <p onClick={() => props.setLanguage("es")}>
                                Español
                            </p>
                        </div>
                    )}
                    {props.language === "es" && (
                        <div className={styles.languages}>
                            <p
                                onClick={() => props.setLanguage("en")}

                            >
                                English
                            </p>
                            <p
                                onClick={() => props.setLanguage("es")}
                                className={styles.selected}
                            >
                                Español
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
