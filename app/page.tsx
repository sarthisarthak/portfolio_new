"use client";

import { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Mail,
  Book,
  Play,
  Terminal,
  Users,
  Eye,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 border-b-4 border-gray-900 dark:border-white">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-black flex items-center">
              <span className="border-4 border-gray-900 dark:border-white px-3 py-1 bg-orange-500 text-white">
                S
              </span>
              <span className="border-4 border-gray-900 dark:border-white border-l-0 px-3 py-1">
                S
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="font-bold hover:text-orange-500 transition-colors"
              >
                HOME
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="font-bold hover:text-orange-500 transition-colors"
              >
                ABOUT
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="font-bold hover:text-orange-500 transition-colors"
              >
                PROJECTS
              </button>
              <button
                onClick={() => scrollToSection("reads")}
                className="font-bold hover:text-orange-500 transition-colors"
              >
                READS
              </button>
              {/* <Link
                href="/now"
                className="font-bold hover:text-orange-500 transition-colors"
              >
                NOW
              </Link> */}
              <button
                onClick={() => scrollToSection("contact")}
                className="font-bold hover:text-orange-500 transition-colors"
              >
                CONTACT
              </button>
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2 border-2 border-gray-900 dark:border-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Home Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-6 pt-20"
      >
        <div className="max-w-6xl w-full">
          <div className="text-left">
            <p className="text-lg font-bold mb-4 text-gray-600 dark:text-gray-400">
              {"> HI I AM"}
            </p>
            <h1 className="text-8xl md:text-9xl font-black mb-6 leading-none">
              Sarthak
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-orange-500 mb-12">
              Passionate learner. Builder at heart. Always exploring.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="border-4 border-gray-900 dark:border-white p-8 md:p-12 bg-orange-50 dark:bg-orange-900/20">
            <div className="flex items-start gap-6">
              <div className="text-6xl">✨</div>
              <div className="flex-1">
                <h2 className="text-4xl md:text-5xl font-black mb-6">ABOUT</h2>
                <p className="text-lg md:text-xl leading-relaxed mb-6">
                  Hi, I'm Sarthak. I love learning new things and turning ideas
                  into something real. I'm always curious, always building, and
                  always looking for better ways to solve problems. Every day is
                  a chance to grow, explore, and create something meaningful.
                </p>

                {/* Voice Note */}
                {/* <div className="border-2 border-gray-900 dark:border-white p-4 bg-white dark:bg-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 border-2 border-gray-900 dark:border-white flex items-center justify-center bg-teal-500 text-white">
                      <Play size={20} />
                    </div>
                    <div>
                      <p className="font-bold">VOICE INTRO</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        2:34 - Raw thoughts on building
                      </p>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12 flex items-center gap-4">
            <Lightbulb size={48} />I BELIEVE
          </h2>
          <div className="space-y-6">
            {[
              "Learning compounds. Small daily progress yields greater long-term results than inconsistent, intense efforts.",
              "Mastery is a loop. Learn → apply → reflect → repeat.",
              "Curiosity over certainty. Questions matter more than answers.",
              "It’s supposed to be hard. That’s what makes it meaningful.",
            ].map((belief, index) => (
              <div
                key={index}
                className="border-l-8 border-purple-500 pl-6 py-4 bg-purple-50 dark:bg-purple-900/20"
              >
                <p className="text-lg md:text-xl font-bold">{belief}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12">PROJECTS</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Code Sync",
                description:
                  "A real-time collaborative code editor using WebSockets, React, and Node.js, enabling developers to share and sync code instantly.",
                link: "https://github.com/sarthisarthak/CodeSync",
                demo: true,
                demoLink: "https://codesync-frontend-h1xo.onrender.com/",
              },
              {
                title: "AI Chatbot",
                description:
                  "An AI chatbot powered by OpenAI's API, offering intelligent, real-time assistance, automated responses, and context-aware interactions to enhance user engagement.",
                link: "https://github.com/sarthisarthak/AI_ChatBot",
                demo: false,
              },
              {
                title: "AI Interview Platform",
                description:
                  "Built with Next.js, Vapi, and Google AI SDK, this platform lets users practice interviews via voice or text with real-time feedback. Firebase handles auth and data, styled using Tailwind CSS and Radix UI.",
                link: "https://github.com/sarthisarthak/Interview_Platform",
                demo: true,
                demoLink: "https://interview-platform-zeta.vercel.app/sign-in",
              },
              {
                title: "Lexical and Syntax Analyzer",
                description:
                  "A visual tool built as part of college project-based learning to help beginners understand and visualize lexical and syntax analysis in compiler design.",
                link: "https://github.com/sarthisarthak/Lexical-and-Syntax-Analyzer",
                demo: true,
                demoLink: "https://lexical-and-syntax-analyzer.onrender.com/",
              },
              {
                title: "Trip Planner",
                description:
                  "A travel planner using Google Generative AI to create personalized itineraries. Built with React, Vite, Firebase, and Tailwind CSS.",
                link: "https://github.com/sarthisarthak/Trip_planner",
                demo: true,
                demoLink: "https://trip-plannersarthaksarthi.vercel.app/",
              },
              {
                title: "Credit Card Fraud Detection",
                description:
                  "A machine learning-based system developed in Python to detect fraudulent transactions using logistic regression and other classification techniques.",
                link: "https://github.com/sarthisarthak/CredictCard_Fraud_Detection",
                demo: false,
              },
            ].map((project, index) => (
              <div
                key={index}
                className="border-4 border-gray-900 dark:border-white p-6 bg-white dark:bg-gray-800 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors"
              >
                <h3 className="text-xl font-black mb-3">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex gap-2 flex-wrap">
                  <a
                    target="__blank"
                    href={project.link}
                    className="inline-flex items-center gap-2 px-4 py-2 border-2 border-gray-900 dark:border-white font-bold hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors"
                  >
                    VIEW CODE <ExternalLink size={16} />
                  </a>
                  <a></a>
                  {project.demo && (
                    <a
                      target="__blank"
                      href={project.demoLink}
                      className="inline-flex items-center gap-2 px-4 py-2 border-2 border-teal-500 text-teal-500 font-bold hover:bg-teal-500 hover:text-white transition-colors"
                    >
                      TRY IT <Play size={16} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Building Log Section */}
      {/* <section
        id="building-log"
        className="py-20 px-6 bg-teal-50 dark:bg-teal-900/20"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12">SHIP LOG</h2>
          <div className="space-y-4">
            {[
              {
                date: "Jan 5, 2025",
                entry:
                  "✅ Deployed AI ChatBot v2 with improved context handling",
              },
              {
                date: "Jan 3, 2025",
                entry:
                  "📚 Finished reading 'Deep Work' - game changer for focus",
              },
              {
                date: "Dec 28, 2024",
                entry: "🚀 Launched portfolio redesign with neobrutalist vibes",
              },
              {
                date: "Dec 25, 2024",
                entry: "🎯 Hit 100 GitHub commits this month",
              },
              {
                date: "Dec 20, 2024",
                entry: "📝 Started daily learning log - consistency is key",
              },
              {
                date: "Dec 15, 2024",
                entry: "⚡ Optimized database queries - 40% faster load times",
              },
              {
                date: "Dec 10, 2024",
                entry: "🧠 Completed React Advanced Patterns course",
              },
            ].map((log, index) => (
              <div
                key={index}
                className="border-2 border-gray-900 dark:border-white p-4 bg-white dark:bg-gray-800 font-mono"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-400 md:w-32">
                    {log.date}
                  </span>
                  <span className="flex-1">{log.entry}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Enhanced Recent Reads Section */}
      <section
        id="reads"
        className="py-20 px-6 bg-purple-50 dark:bg-purple-900/20"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12 flex items-center gap-4">
            <Book size={48} />
            READING SHELF
          </h2>

          {/* Reading Now */}
          <div className="mb-12">
            <h3 className="text-2xl font-black mb-6">📖 READING NOW</h3>
            <div className="border-4 border-gray-900 dark:border-white p-6 bg-white dark:bg-gray-800">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <h4 className="text-xl font-black mb-2">Hacker News & X</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    Curated by the Internet
                  </p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 mb-2">
                    <div
                      className="bg-orange-500 h-2"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                  <p className="text-sm">∞ % complete</p>
                </div>
                <a
                  target="__blank"
                  href="https://news.ycombinator.com/"
                  className="mt-4 md:mt-0 md:ml-6 inline-flex items-center gap-2 px-4 py-2 border-2 border-gray-900 dark:border-white font-bold hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors"
                >
                  VIEW <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Finished Books */}
          <div className="mb-12">
            <h3 className="text-2xl font-black mb-6">✅ FINISHED</h3>
            <div className="space-y-4">
              {[
                {
                  title: "Atomic Habits",
                  author: "James Clear",
                  date: "Jan 2022",
                  reflection:
                    "Small changes compound into remarkable results over time.",
                  link: "https://www.goodreads.com/book/show/40121378-atomic-habits",
                },
                {
                  title: "The Secret",
                  author: "Rhonda Byrne",
                  date: "Nov 2024",
                  reflection:
                    "Explores the power of positive thinking and the law of attraction to shape one’s reality.",
                  link: "https://www.goodreads.com/book/show/52529.The_Secret",
                },
              ].map((book, index) => (
                <div
                  key={index}
                  className="border-4 border-gray-900 dark:border-white p-6 bg-white dark:bg-gray-800"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <h4 className="text-xl font-black">{book.title}</h4>
                        <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                          {book.date}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        by {book.author}
                      </p>
                      <p className="text-sm italic">{book.reflection}</p>
                    </div>
                    <a
                      href={book.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 md:mt-0 md:ml-6 inline-flex items-center gap-2 px-4 py-2 border-2 border-gray-900 dark:border-white font-bold hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors"
                    >
                      VIEW <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Up Next */}
          <div>
            <h3 className="text-2xl font-black mb-6">🧠 UP NEXT</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "The Book of Clarity: Building Your Dream Startup Using First Principles Thinking - Paras Chopra",
              ].map((book, index) => (
                <div
                  key={index}
                  className="border-2 border-gray-900 dark:border-white p-4 bg-white dark:bg-gray-800"
                >
                  <p className="font-bold">{book}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mentions Section */}
      {/* <section id="mentions" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12 flex items-center gap-4">
            <Eye size={48} />
            MENTIONS
          </h2>
          <div className="space-y-4">
            {[
              {
                platform: "Twitter",
                user: "@techleader",
                text: "Great insights on system design from @sarthaksarthi",
              },
              {
                platform: "LinkedIn",
                user: "Sarah Chen",
                text: "Sarthak's portfolio is a masterclass in clean design",
              },
              {
                platform: "Dev.to",
                user: "CodeMaster",
                text: "Loved the neobrutalist approach - so refreshing!",
              },
            ].map((mention, index) => (
              <div
                key={index}
                className="border-2 border-gray-900 dark:border-white p-4 bg-white dark:bg-gray-800"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">👀</span>
                  <div>
                    <p className="font-bold">
                      {mention.platform} - {mention.user}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      "{mention.text}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      {/* </section> */}

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-12">
            GET IN TOUCH
          </h2>
          <div className="mb-12">
            <a
              target="__blank"
              href="mailto:sarthiisarthak@gmail.com"
              className="inline-flex items-center gap-3 px-8 py-4 border-4 border-gray-900 dark:border-white font-black text-xl hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors"
            >
              <Mail size={24} />
              EMAIL ME
            </a>
          </div>
          <div className="flex justify-center space-x-6 mb-8">
            <a
              target="__blank"
              href="https://github.com/sarthisarthak"
              className="p-4 border-2 border-gray-900 dark:border-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              target="__blank"
              href="https://linkedin.com/in/sarthaksarthi"
              className="p-4 border-2 border-gray-900 dark:border-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors"
            >
              <Linkedin size={24} />
            </a>
            <a
              target="__blank"
              href="https://x.com/srthksrthi"
              className="p-4 border-2 border-gray-900 dark:border-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors"
            >
              <Twitter size={24} />
            </a>
          </div>
          <div className="flex justify-center space-x-4">
            <Link
              href="/terminal"
              className="inline-flex items-center gap-2 px-4 py-2 border-2 border-teal-500 text-teal-500 font-bold hover:bg-teal-500 hover:text-white transition-colors"
            >
              <Terminal size={16} />
              TERMINAL
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t-4 border-gray-900 dark:border-white">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <p className="font-bold">© Sarthak Sarthi</p>
          <Link
            href="/colophon"
            className="font-bold hover:text-orange-500 transition-colors"
          >
            PEOPLE I ADMIRE
          </Link>
        </div>
      </footer>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-6 left-6 right-6">
        <div className="flex justify-center space-x-2 bg-white dark:bg-gray-800 border-4 border-gray-900 dark:border-white p-2">
          <button
            onClick={() => scrollToSection("home")}
            className="px-3 py-2 font-bold text-xs"
          >
            HOME
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="px-3 py-2 font-bold text-xs"
          >
            ABOUT
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="px-3 py-2 font-bold text-xs"
          >
            PROJECTS
          </button>
          <button
            onClick={() => scrollToSection("reads")}
            className="px-3 py-2 font-bold text-xs"
          >
            READS
          </button>
          {/* <Link href="/now" className="px-3 py-2 font-bold text-xs">
            NOW
          </Link> */}
        </div>
      </div>
    </div>
  );
}
