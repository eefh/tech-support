import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Message from "../components/Message";
import Loading from "@/components/Loading";
let messages = [];
export default function Home({ prices = [] }) {
    const [subjectInput, setSubjectInput] = useState("");
    const [messageInput, setMessageInput] = useState("");
    const [featureSet, setFeatureSet] = useState(false);
    const [eduSelect, setEduSelect] = useState(null);
    const [prevReply, setPrevReply] = useState("");
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        let message = { message: messageInput, sender: "user" };

        if (messageInput) {
            setLoading(true);
            messages.unshift({ message: messageInput, sender: "user" });
            setMessageInput("");
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
            messages.unshift({ message: data.result, sender: "" });
        } else if (!user) {
            messages.unshift({ message: messageInput, sender: "user" });
            messages.unshift({ message: "Please sign in!", sender: "" });
            setMessageInput("");
        } else {
            messages.unshift({ message: messageInput, sender: "user" });
            messages.unshift({ message: "Out of tokens!", sender: "" });
            setMessageInput("");
        }
    };

    return (
        <div>
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

            <div className={styles.Home}>
                <form onSubmit={onSubmit} className={styles.subject}>
                    <div className={styles.chat}>
                        <div className={styles.chatBox}>
                            {loading && <Loading />}

                            <div className={styles.messages}>
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
