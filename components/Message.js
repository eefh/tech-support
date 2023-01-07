import styles from "@/styles/Message.module.css";
export default function Message(props) {
    const determineClass = () => {
        if (props.sender === "user") {
            return `${styles.messageUser} ${styles.msg}`;
        } else {
            return `${styles.messageAI} ${styles.msg}`;
        }
    };
    return (
        <div className={styles.message}>
            <div className={determineClass()}>
                <p>{props.message}</p>
            </div>
        </div>
    );
}
