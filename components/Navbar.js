import styles from "@/styles/Navbar.module.css";

export default function Navbar() {
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
        </div>
    );
}
