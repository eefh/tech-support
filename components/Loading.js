import styles from "@/styles/Message.module.css";

export default function Loading() {
    return (
        <div className={`${styles.loading}`}>
            <p>Apo is typing...</p>
        </div>
    );
}
