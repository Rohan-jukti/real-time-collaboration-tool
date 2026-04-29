import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://real-time-collaboration-tool-yc9s.onrender.com");

function App() {
  const [text, setText] = useState("");

  useEffect(() => {
    socket.emit("join-document", "room1");

    socket.on("receive-changes", (data) => {
      setText(data);
    });

    return () => {
      socket.off("receive-changes");
    };
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    socket.emit("send-changes", value);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🚀 Real-Time Collaboration</h1>

      <div style={styles.editorBox}>
        <textarea
          value={text}
          onChange={handleChange}
          placeholder="Start typing..."
          style={styles.textarea}
        />
      </div>

      <p style={styles.footer}>⚡ Live sync enabled</p>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Segoe UI, sans-serif",
  },
  heading: {
    color: "#f1f5f9",
    marginBottom: "20px",
    fontWeight: "600",
    letterSpacing: "1px",
  },
  editorBox: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(12px)",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  },
  textarea: {
    width: "600px",
    height: "300px",
    border: "none",
    outline: "none",
    borderRadius: "10px",
    fontSize: "16px",
    padding: "12px",
    resize: "none",
    background: "rgba(255,255,255,0.9)",
    color: "#0f172a",
  },
  footer: {
    marginTop: "15px",
    color: "#94a3b8",
    fontSize: "14px",
  },
};

export default App;