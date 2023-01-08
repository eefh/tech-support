import styles from "@/styles/Message.module.css";

export default function Loading() {
    return (
        <div className={`${styles.loading}`}>
            <p>Tech Support is typing...</p>
        </div>
    );
}
