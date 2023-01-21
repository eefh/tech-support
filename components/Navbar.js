import styles from "@/styles/Navbar.module.css";
import {useState} from "react";
export default function Navbar(props) {
    const [ toggle, setToggle ] = useState(false);
    return (
        <div className={styles.navbar}>
            <div className={styles.group}>
                <h1 className={styles.name}>Say hello to Apo</h1>
                <p className={styles.description}>Apo is designed to help you learn about today's technology.</p>
            </div>
        </div>
    );
}
