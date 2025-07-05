"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TerminalPage() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "Welcome to Sarthak's Terminal",
    "Type 'help' to see available commands",
    "",
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const commands = {
    help: () => [
      "Available commands:",
      "  help      - Show this help message",
      "  about     - About Sarthak",
      "  projects  - List all projects",
      "  now       - Current focus",
      "  email     - Contact information",
      "  clear     - Clear terminal",
      "  whoami    - Current user",
      "  date      - Current date",
      "  echo      - Echo text",
      "",
    ],
    about: () => [
      "Sarthak Sarthi",
      "Passionate learner. Builder at heart. Always exploring.",
      "",
      "I love turning ideas into reality through code.",
      "Currently focused on distributed systems and AI tools.",
      "",
    ],
    projects: () => [
      "Current Projects:",
      "  • Code Sync – Real-time collaborative code editor using WebSockets, React, and Node.js",
      "  • AI Chatbot – OpenAI-powered chatbot for real-time, intelligent and contextual conversations",
      "  • AI Interview Platform – Next.js + Google AI SDK app for voice/text-based interview practice with live feedback",
      "  • Lexical and Syntax Analyzer – Visual tool for understanding compiler design basics, built as a college PBL.",
      "  • Trip Planner – Personalized itinerary planner using Google GenAI, React, Vite, Firebase",
      "  • Credit Card Fraud Detection – Python-based ML model to identify fraudulent transactions using classification techniques",
    ],
    now: () => [
      "Currently working on:",
      "  🚀 Real-time collaboration tool for developers",
      "  📚 Learning distributed systems architecture",
      "  🎯 Practicing shipping MVPs faster",
      "  🌱 Exploring AI-assisted coding tools",
      "",
    ],
    email: () => ["Contact: sarthiisarthak@gmail.com", ""],
    clear: () => {
      setHistory([]);
      return [];
    },
    whoami: () => ["sarthak sarthi", ""],
    date: () => [new Date().toString(), ""],
    echo: (args: string[]) => [args.join(" "), ""],
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    const [command, ...args] = trimmedCmd.toLowerCase().split(" ");
    const newHistory = [...history, `$ ${trimmedCmd}`];
    if (command === "clear") {
      setHistory([]);
      setCommandHistory([...commandHistory, trimmedCmd]);
      setHistoryIndex(-1);
      return; // avoid adding "$ clear"
    }

    if (command in commands) {
      const output = (commands as any)[command](args);
      setHistory([...newHistory, ...output]);
    } else {
      setHistory([
        ...newHistory,
        `Command not found: ${command}`,
        "Type 'help' for available commands",
        "",
      ]);
    }

    setCommandHistory([...commandHistory, trimmedCmd]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Header */}
      <div className="border-b border-green-400 p-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
        >
          <ArrowLeft size={16} />
          EXIT TERMINAL
        </Link>
      </div>

      {/* Terminal Content */}
      <div className="p-6">
        <div className="max-w-4xl">
          {/* History */}
          <div className="mb-4">
            {history.map((line, index) => (
              <div key={index} className="mb-1">
                {line}
              </div>
            ))}
          </div>

          {/* Input Line */}
          <div className="flex items-center">
            <span className="mr-2">$</span>
            <input
              aria-label="terminal"
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-green-400 font-mono"
              autoComplete="off"
              spellCheck="false"
            />
            <span className="animate-pulse">_</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-4 right-4 text-xs text-green-600">
        Terminal v1.0 - Use 'help' for commands
      </div>
    </div>
  );
}
