import "./Chatbot.css";
import { IoIosSend } from "react-icons/io";
import { useState, useEffect, useRef } from "react";
import { presetQuestions, responseMap } from "./chatbotData";
import { sendMessageToGroq } from "./groqApiConn";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendPreset = (question) => {
    if (!question.trim()) return;
  
    const userMessage = { text: question, sender: "user" };
    const botReply = responseMap[question] || "Desculpe, não encontrei uma resposta para isso.";
    const botMessage = { text: botReply, sender: "bot" };
  
    setMessages((prevMessages) => [...prevMessages, userMessage]);
  
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 500);
  };

  const handleSendInput = async (message) => {
    if (!message.trim()) return;

    const userMessage = { text: message, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setTimeout(async () => {
      const botReply = await sendMessageToGroq(message);
      const botMessage = { text: botReply, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendInput(inputValue);
    setInputValue("");
  };

  return (
    <div className="content-right">
      <div className="chatbot">
        <h1>GO Pantera IA</h1>
        <p>Bem vindo, sou um modelo de aprendizagem então posso errar, escolha perguntas pré-setadas ou então faça sua pergunta diretamente.</p>
      </div>

      <div className="preset-questions">
        {presetQuestions.map((question, index) => (
          <button
            key={index}
            className="preset-button"
            onClick={() => handleSendPreset(question)}
          >
            {question}
          </button>
        ))}
      </div>

      <div className="chatbot-container"> 
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender}`}
              dangerouslySetInnerHTML={{ __html: msg.text }}
            />
          ))}

          {messages.length <= 0 && (
            <div className="placeholder-message-start">
              Olá! Estou aqui para responder perguntas sobre a FURIA. Ainda estou em beta então posso errar, mas estou aprendendo com cada interação.
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chatbot-input" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Digite sua mensagem..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit"><IoIosSend /></button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
