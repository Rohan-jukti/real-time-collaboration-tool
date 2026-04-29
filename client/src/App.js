import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

// 🔥 IMPORTANT: yaha apna Render URL daal
const socket = io("https://real-time-collaboration-tool-yc9s.onrender.com");

function App() {
  const [text, setText] = useState("");

  useEffect(() => {
    socket.on("text-update", (data) => {
      setText(data);
    });

    return () => {
      socket.off("text-update");
    };
  }, []);

  const handleChange = (e) => {
    setText(e.target.value);
    socket.emit("text-change", e.target.value);
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#1e293b",
      color: "white"
    }}>
      <div>
        <h1>Real-Time Collaboration</h1>
        <textarea
          value={text}
          onChange={handleChange}
          rows="10"
          cols="50"
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            outline: "none"
          }}
        />
        <p>Live sync enabled</p>
      </div>
    </div>
  );
}

export default App;