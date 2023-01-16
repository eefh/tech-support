import styles from "@/styles/Navbar.module.css";
import {useState} from "react";
export default function Navbar(props) {
    const [ toggle, setToggle ] = useState(false);
    return (
        <div className={styles.navbar}>
            <img
                className={styles.picture}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHIr7-CrooKTDdBG92EwA-pbNIsUh-9mJDMQ&usqp=CAU"
            />
            <div className={styles.group}>
                <p className={styles.name}>Tech Support</p>
                <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
            <p
                className={styles.language}
                onClick={() => {
                    setToggle(!toggle);
                }}
            >
                Language
            </p>
            {toggle && (
                <div>
                    <p
                        onClick={() => props.setLanguage("en")}
                        className={`${styles.language} ${styles.option}`}
                    >
                        English
                        {props.language === "en" && (
                            <ion-icon name="checkmark-outline"></ion-icon>
                        )}
                    </p>
                    <p
                        onClick={() => props.setLanguage("es")}
                        className={`${styles.language} ${styles.option}`}
                    >
                        Espanol
                        {props.language === "es" && (
                            <ion-icon name="checkmark-outline"></ion-icon>
                        )}
                    </p>
                </div>
            )}
        </div>
    );
}
