import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useRef } from "react";
import Message from "../components/Message";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import Tutorial from "@/components/Tutorial";
import Settings from "@/components/Settings";
export default function Home({ prices = [] }) {
    const [messages, setMessages] = useState([]);
    const [subjectInput, setSubjectInput] = useState("");
    const [messageInput, setMessageInput] = useState("");
    const [featureSet, setFeatureSet] = useState(false);
    const [eduSelect, setEduSelect] = useState(null);
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [failed, setFailed] = useState(false);
    const [tutorial, setTutorial ] = useState(false);
    const [language, setLanguage] = useState("en");
    const [settings, setSettings] = useState(false);
    const textareaRef = useRef(null);
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
            try {
                const response = await fetch("/api/generate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        reply: messageInput,
                        messages: messages.slice(0, 5),
                        language: language
                    }),
                });
                const data = await response.json();

                setLoading(false);
                setMessages((messages) => [
                    {
                        message: data.result
                            .replace(/["]/g, "")
                            .replace(/^\n+/, ""),
                        sender: "",
                    },
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
    const handleAreaInput = (event) => {
        const textarea = event.target;
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            event.target.style.height = "auto";
            event.target.rows = 1;
            onSubmit(event);
        }
    };
    return (
        <div className={styles.source}>
            <Head>
                <title>Apo Tech Support</title>
                <script
                    type="module"
                    src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
                ></script>
                <script
                    nomodule
                    src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
                ></script>
            </Head>
            <Navbar setLanguage={setLanguage} language={language}></Navbar>
            <div className={styles.Home}>
                <form onSubmit={onSubmit} className={styles.subject}>
                    <div className={styles.chat}>
                        {settings && 
                            <Settings setLanguage={setLanguage} language={language}setSettings={setSettings}></Settings>
                        }
                        {tutorial && 
                            <Tutorial setTutorial={setTutorial}></Tutorial>
                        }
                        {messages.length > 0 && (
                            <div className={styles.buttons}>
                                <div className={`${styles.optionButton} ${styles.grey}`} onClick={() => setSettings(true)}>
                                    SETTINGS
                                </div>
                                <div className={`${styles.optionButton} ${styles.green}`} onClick={() => setTutorial(true)}>
                                    HOW IT WORKS
                                </div>
                                <div className={`${styles.optionButton} ${styles.red}`} onClick={() => setMessages([])}>
                                    START OVER
                                </div>
                            </div>
                        )}
                        {messages.length > 0 && (
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

                                    <div className={styles.chin}></div>
                                </div>
                            </div>
                        )}

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
                            <textarea
                                className={styles.userText}
                                type="text"
                                placeholder="Type your question here"
                                required
                                value={messageInput}
                                onInput={(e) => setMessageInput(e.target.value)}
                                rows="1"
                                cols="1"
                                onChange={handleAreaInput}
                                onKeyDown={handleKeyPress}
                                ref={textareaRef}
                            ></textarea>

                            <button className={styles.submit} type="submit">
                                ASK
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
