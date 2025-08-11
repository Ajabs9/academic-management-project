import { useState } from "react";
import { callDeepSeek } from "../services/deepseek";
import { toPlainText } from "../services/deepseek";

function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const newMsgs = [...messages, { role: "user", content: input }];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);

    try {
      const reply = await callDeepSeek(newMsgs);
      setMessages([...newMsgs, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error(err);
      setMessages([...newMsgs, { role: "assistant", content: "Error occurred." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20 }}>
      {isOpen && (
        <div style={{ width: 300, height: 400, padding: '10px', background: 'linear-gradient(to right, #b1f7c6ff, #bffaa3ff)', border: "1px black solid", marginBottom: "5px", borderRadius: "10px" }}>
          <div style={{ height: 320, overflowY: "auto" }}>
            {messages.map((m, idx) => (
              <div key={idx} style={{ margin: 4, textAlign:"left" }}>
                <strong>{m.role}:</strong> {toPlainText(m.content)}
              </div>
            ))}
          </div>
          <div style={{display: "flex", justifyContent: "space-between"}}>
            
          <input
            id="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            style={{ width: "75%", marginRight:"5px", backgroundColor: "white", color: "black" }}
          />
          <button onClick={sendMessage} disabled={loading} style={{ width: "20%", textAlign: "center", padding: "5px", borderRadius : "5px" }}>
            {loading ? "..." : "Send"}
          </button>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} style={{borderRadius:"10px", display:"block"}}>
        {isOpen ? "Close" : "Chat"}
      </button>
    </div>
  );
}

export default FloatingChatbot;
