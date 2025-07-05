"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, ArrowLeft, Users, Globe } from "lucide-react";
import Link from "next/link";

export default function InspirationPage() {
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      {/* Navigation */}
      <nav className="border-b-4 border-gray-900 dark:border-white">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-bold hover:text-orange-500 transition-colors"
            >
              <ArrowLeft size={20} />
              BACK
            </Link>
            <button
              onClick={toggleDarkMode}
              className="p-2 border-2 border-gray-900 dark:border-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Inspiration Content */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-6xl md:text-7xl font-black mb-12">
          PEOPLE I ADMIRE
        </h1>
        <p className="text-xl mb-12 text-gray-600 dark:text-gray-400">
          A few people whose work and mindset push me forward.
        </p>

        <div className="space-y-12">
          {/* People */}
          <div className="border-4 border-gray-900 dark:border-white p-8 bg-teal-50 dark:bg-teal-900/20">
            <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
              <Users size={32} />
              INDIVIDUALS
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>
                <strong>Elon Musk</strong>
              </li>
              <li>
                <strong>Virat Kohli</strong>
              </li>
              <li>
                <strong>Harkirat Singh</strong>
              </li>
              <li>
                <strong>Raj Vikramaditya</strong>
              </li>
            </ul>
          </div>

          {/* Sites & Communities */}
          {/* <div className="border-4 border-gray-900 dark:border-white p-8 bg-purple-50 dark:bg-purple-900/20">
            <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
              <Globe size={32} />
              SITES
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>
                <a
                  href="https://news.ycombinator.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline font-bold"
                >
                  Hacker News
                </a>{" "}
                – Substance over style; the pulse of tech.
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
}
