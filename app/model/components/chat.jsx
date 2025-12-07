"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, Send, Mic, StopCircle, Paperclip, Box, Settings2, FileText, Lightbulb, X } from "lucide-react";
import { marked } from "marked";

// 🔹 IMPORTAR COMPONENTES EXTERNOS
import MiComponenteExterno from "../../components/graficas"; // Researcher
import GLYNNEMatrix from "../../components/Data"; // Modal del icono foco

function formatMessage(text) {
    const paragraphs = text.split("\n").filter((p) => p.trim() !== "");
    return paragraphs.map((p, idx) => {
        const parts = p.split(/(\*\*.*?\*\*)/g);
        return (
            <p key={idx} className="mb-2">
                {parts.map((part, i) => {
                    if (part.startsWith("**") && part.endsWith("**")) {
                        return (
                            <strong key={i} className="font-bold">
                                {part.slice(2, -2)}
                            </strong>
                        );
                    }
                    return part;
                })}
            </p>
        );
    });
}

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const [isRecording, setIsRecording] = useState(false);

    const [showSuggestions, setShowSuggestions] = useState(false);

    // ADD → menú gigante del botón Researcher
    const [showResearchMenu, setShowResearchMenu] = useState(false);
    // ADD → menú gigante del botón Foco
    const [showLightbulbMenu, setShowLightbulbMenu] = useState(false);

    const predefinedQuestions = [
      "¿Qué modelos de sillas ergonómicas para estudiantes están disponibles?",
      "Muéstrame escritorios modulables para aulas flexibles.",
      "Buscar gabinetes de almacenamiento bajo para laboratorios.",
      "¿Qué mesas vienen con altura ajustable para diferentes edades?",
      "Mostrar muebles con superficies de melamina resistentes a rayones.",
    ];

    const chatRef = useRef(null);
    const messagesEndRef = useRef(null);

    const clearConversation = () => setMessages([]);

    // ADD → cerrar Researcher o Lightbulb al hacer clic fuera
    useEffect(() => {
        const handler = (e) => {
            if (
                !e.target.closest("#researchMenu") &&
                !e.target.closest("#researchButton") &&
                !e.target.closest("#lightbulbMenu") &&
                !e.target.closest("#lightbulbButton")
            ) {
                setShowResearchMenu(false);
                setShowLightbulbMenu(false);
            }
        };
        if (showResearchMenu || showLightbulbMenu) document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [showResearchMenu, showLightbulbMenu]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { from: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);

        const userInput = input;
        setInput("");
        setTyping(true);

        try {
            const response = await fetch("http://localhost:8000/asesor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: "frontend_user", mensaje: userInput }),
            });

            const data = await response.json();
            const botText = data.respuesta;

            setMessages((prev) => [...prev, { from: "bot", text: botText }]);
            setTyping(false);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { from: "bot", text: "Error al conectar con el servidor 😥" },
            ]);
            setTyping(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") sendMessage();
    };

    const toggleRecording = () => setIsRecording(!isRecording);

    return (
        <div className="w-full h-full flex flex-col bg-white overflow-hidden">

            {/* HEADER */}
            <div className="px-4 py-2 flex justify-end border-b border-gray-100">
                {messages.length > 0 && (
                    <button
                        onClick={clearConversation}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                    >
                        <Trash2 size={20} />
                    </button>
                )}
            </div>

            {/* CHAT */}
            <div
                ref={chatRef}
                className="flex flex-col px-4 py-4 space-y-4 overflow-y-auto flex-grow"
            >
                {messages.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center">

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mb-6"
                        >
                            <img
                                src="/logo.png"
                                alt="Logo"
                                className="w-72 -mt-[300px] h-72 object-contain opacity-90"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="w-full max-w-xl  -mt-[50px] bg-transparent border border-gray-300 shadow-xl rounded-2xl p-4"
                        >
                            <div className="flex items-center space-x-2">
                                <span className="text-black/60">
                                    <Lightbulb size={20} />
                                </span>

                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Search furniture…"
                                    className="flex-1 bg-white text-black text-lg focus:outline-none"
                                />
                            </div>

                            <div className="mt-3 flex justify-between items-center pt-2 border-t border-gray-100">
                                <div className="flex space-x-2 items-center">

                                    <button className="text-gray-500 hover:text-black p-1 rounded-full hover:bg-gray-100">
                                        <Settings2 size={20} />
                                    </button>

                                    {/* 🔥 BOTÓN RESEARCHER */}
                                    <button
                                        id="researchButton"
                                        className="flex items-center space-x-1 bg-gray-100 text-gray-700 text-sm font-medium py-1 px-3 rounded-full hover:bg-gray-200"
                                        onClick={() => setShowResearchMenu(!showResearchMenu)}
                                    >
                                        <FileText size={16} />
                                        <span>Researcher</span>
                                    </button>

                                    {/* MENU GIGANTE RESEARCHER */}
                                    {showResearchMenu && (
                                        <div
                                            id="researchMenu"
                                            className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/40 backdrop-blur-sm z-[999]"
                                        >
                                            <div className="relative bg-white w-[80%] h-[80%] rounded-2xl shadow-2xl p-6 overflow-y-auto">
                                                <button
                                                    onClick={() => setShowResearchMenu(false)}
                                                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
                                                >
                                                    <X size={24} />
                                                </button>
                                                <MiComponenteExterno />
                                            </div>
                                        </div>
                                    )}

                                    {/* 🔹 BOTÓN FOCO AZUL */}
                                    <button
                                        id="lightbulbButton"
                                        className="flex items-center space-x-1 bg-blue-500 text-white text-sm font-medium py-1 px-2 rounded-full hover:bg-blue-600"
                                        onClick={() => setShowLightbulbMenu(true)}
                                    >
                                        <Lightbulb size={16} />
                                        <span>&times;</span>
                                    </button>

                                    {/* MENU GIGANTE FOCO */}
                                    {showLightbulbMenu && (
                                        <div
                                            id="lightbulbMenu"
                                            className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/40 backdrop-blur-sm z-[999]"
                                        >
                                            <div className="relative bg-white w-[80%] h-[80%] rounded-2xl shadow-2xl p-6 overflow-y-auto">
                                                <button
                                                    onClick={() => setShowLightbulbMenu(false)}
                                                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
                                                >
                                                    <X size={24} />
                                                </button>
                                                <GLYNNEMatrix />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center space-x-3">
                                    <button className="text-gray-500 hover:text-black">
                                        <Paperclip size={20} />
                                    </button>

                                    <div className="relative">
                                        <button
                                            className="text-gray-500 hover:text-black"
                                            onClick={() => setShowSuggestions(!showSuggestions)}
                                        >
                                            <Box size={20} />
                                        </button>

                                        {showSuggestions && (
                                            <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl border border-gray-200 rounded-xl z-50">
                                                {predefinedQuestions.map((q, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => {
                                                            setInput(q);
                                                            setShowSuggestions(false);
                                                        }}
                                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                                                    >
                                                        {q}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={sendMessage}
                                        disabled={input.trim() === ""}
                                        className={`w-10 h-10 flex items-center justify-center rounded-xl ${
                                            input.trim() === ""
                                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                : "bg-black text-white hover:bg-gray-800"
                                        }`}
                                    >
                                        <Send size={18} className="rotate-[-45deg]" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ) : (
                    messages.map((msg, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`
                                    px-4 py-3 rounded-2xl break-words
                                    ${msg.from === "user"
                                        ? "bg-black text-white rounded-br-none"
                                        : "bg-white text-black shadow-lg border border-gray-100 rounded-tl-none"}
                                    w-full md:max-w-[50%]
                                `}
                            >
                                {msg.from === "bot" ? (
                                    <div
                                        className="prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{
                                            __html: marked.parse(msg.text || ""),
                                        }}
                                    />
                                ) : (
                                    <p className="whitespace-pre-wrap">{msg.text}</p>
                                )}
                            </div>
                        </motion.div>
                    ))
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* INPUT BAR ABAJO */}
            <div
                className={`w-full px-4 py-3 bg-white ${
                    messages.length === 0 ? "hidden" : "sticky bottom-0 border-t border-gray-200"
                }`}
            >
                <div className="mx-auto w-full max-w-3xl flex items-center gap-3">
                    <button
                        onClick={toggleRecording}
                        className={`w-10 h-10 flex items-center justify-center rounded-full ${
                            isRecording
                                ? "bg-red-500 text-white shadow-lg"
                                : "text-gray-500 hover:bg-gray-100 hover:text-black"
                        }`}
                    >
                        {isRecording ? <StopCircle size={20} /> : <Mic size={20} />}
                    </button>

                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Escribe tu mensaje…"
                            className="w-full px-5 py-3 bg-gray-100 rounded-full border border-gray-300 focus:ring-2 focus:ring-black text-black pr-14"
                        />

                        <button
                            onClick={sendMessage}
                            disabled={input.trim() === ""}
                            className={`absolute right-1 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 flex items-center justify-center ${
                                input.trim()
                                    ? "bg-black text-white hover:bg-gray-800"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}
