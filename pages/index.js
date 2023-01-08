import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Message from "../components/Message";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
export default function Home({ prices = [] }) {
    const [messages, setMessages] = useState([]);
    const [subjectInput, setSubjectInput] = useState("");
    const [messageInput, setMessageInput] = useState("");
    const [featureSet, setFeatureSet] = useState(false);
    const [eduSelect, setEduSelect] = useState(null);
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [failed, setFailed] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        if ((messageInput && !loading) || failed) {
            setLoading(true);
            setFailed(false);

            !failed &&
                setMessages((messages) => [
                    { message: messageInput, sender: "user" },
                    ...messages,
                ]);
            //messages.unshift({ message: messageInput, sender: "user" });
            setMessageInput("");
            console.log(messages.slice(0, 5));
            try {
                const response = await fetch("/api/generate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        reply: messageInput,
                        messages: messages.slice(0, 5),
                    }),
                });
                const data = await response.json();

                setLoading(false);
                setMessages((messages) => [
                    { message: data.result.replace(/["]/g, ""), sender: "" },
                    ...messages,
                ]);
                /*messages.unshift({
                    message: data.result.replace(/["']/g, ""),
                    sender: "",
                });*/
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
                                        I’m sorry, I didn’t understand that.
                                        Click to here to retry
                                        <ion-icon name="refresh-outline"></ion-icon>
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
                                    message="Hi there, my name is Apo and I’m here to help you get comfortable with technology. Ask me any tech-related questions and I’m more than happy to help you learn. 😄"
                                    sender=""
                                />
                            </div>
                        </div>

                        <div className={styles.messageBox}>
                            {messages.length ? (
                                <div
                                    className={styles.reset}
                                    onClick={() => {
                                        setMessages([]);
                                    }}
                                >
                                    <ion-icon name="refresh-circle"></ion-icon>
                                </div>
                            ) : null}
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
