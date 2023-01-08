import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Message from "../components/Message";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
let messages = [];
export default function Home({ prices = [] }) {
    const [subjectInput, setSubjectInput] = useState("");
    const [messageInput, setMessageInput] = useState("");
    const [featureSet, setFeatureSet] = useState(false);
    const [eduSelect, setEduSelect] = useState(null);
    const [prevReply, setPrevReply] = useState("");
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [failed, setFailed] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        let message = { message: messageInput, sender: "user" };

        if ((messageInput && !loading) || failed) {
            setLoading(true);
            setFailed(false);

            !failed &&
                messages.unshift({ message: messageInput, sender: "user" });
            setMessageInput("");
            try {
                const response = await fetch("/api/generate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        reply: messageInput,
                        prevReply: prevReply,
                    }),
                });
                const data = await response.json();

                setLoading(false);
                setPrevReply(data.result);
                messages.unshift({
                    message: data.result.replace(/["']/g, ""),
                    sender: "",
                });
            } catch (error) {
                console.log(error);
                setFailed(true);
                setLoading(false);
            }
        }
    };
    const handleError = () => {};
    return (
        <div className={styles.source}>
            <Head>
                <title>Tech Support</title>
                <script
                    type="module"
                    src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
                ></script>
                <script
                    nomodule
                    src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
                ></script>
            </Head>
            <Navbar></Navbar>
            <div className={styles.Home}>
                <form onSubmit={onSubmit} className={styles.subject}>
                    <div className={styles.chat}>
                        <div className={styles.chatBox}>
                            {loading && <Loading />}

                            <div className={styles.messages}>
                                {failed && (
                                    <button
                                        onClick={onSubmit}
                                        className={styles.error}
                                    >
                                        Retry
                                    </button>
                                )}
                                {messages.map((msg, i) => {
                                    return (
                                        <Message
                                            message={msg.message}
                                            sender={msg.sender}
                                            key={i}
                                        />
                                    );
                                })}
                                <Message
                                    message="How can I help you?"
                                    sender=""
                                />
                                <Message message="Welcome! 😄" sender="" />
                            </div>
                        </div>

                        <div className={styles.messageBox}>
                            <input
                                className={styles.userText}
                                type="text"
                                placeholder="Message"
                                required
                                value={messageInput}
                                onChange={(e) =>
                                    setMessageInput(e.target.value)
                                }
                            ></input>
                            {messageInput && (
                                <button className={styles.submit} type="submit">
                                    <ion-icon name="arrow-up-outline"></ion-icon>
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
