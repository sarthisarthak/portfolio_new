"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NowPage() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true"
    setDarkMode(isDark)
    document.documentElement.classList.toggle("dark", isDark)
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem("darkMode", newDarkMode.toString())
    document.documentElement.classList.toggle("dark", newDarkMode)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      {/* Navigation */}
      <nav className="border-b-4 border-gray-900 dark:border-white">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="inline-flex items-center gap-2 font-bold hover:text-orange-500 transition-colors">
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

      {/* Now Content */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="border-4 border-gray-900 dark:border-white p-8 md:p-12 bg-orange-50 dark:bg-orange-900/20">
          <h1 className="text-6xl md:text-7xl font-black mb-8">/NOW</h1>
          <p className="text-lg mb-8 text-gray-600 dark:text-gray-400">Last updated: January 5, 2025</p>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-black mb-4">🚀 BUILDING</h2>
              <p className="text-lg leading-relaxed">
                Working on a real-time collaboration tool for developers. Think Figma but for code reviews. Currently
                wrestling with WebSocket connections and conflict resolution algorithms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black mb-4">📚 LEARNING</h2>
              <p className="text-lg leading-relaxed">
                Deep diving into distributed systems. Reading "Designing Data-Intensive Applications" and implementing
                toy versions of consensus algorithms. Raft is surprisingly elegant.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black mb-4">🎯 FOCUSING ON</h2>
              <p className="text-lg leading-relaxed">
                Shipping faster. I tend to over-engineer solutions. This month I'm practicing the art of "good enough" -
                building MVPs that solve real problems without perfect architecture.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black mb-4">🌱 EXPLORING</h2>
              <p className="text-lg leading-relaxed">
                AI-assisted coding tools. Not just GitHub Copilot, but building custom tools that understand my coding
                patterns and project context. The future of programming is collaborative.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black mb-4">💭 THINKING ABOUT</h2>
              <p className="text-lg leading-relaxed">
                The balance between innovation and stability in software. How do we push boundaries while building
                reliable systems? There's beauty in boring technology that just works.
              </p>
            </div>
          </div>

          <div className="mt-12 p-6 border-2 border-gray-900 dark:border-white bg-white dark:bg-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This is a <strong>/now page</strong> - inspired by Derek Sivers. It's a snapshot of what I'm focused on
              right now, updated regularly to keep me accountable and help others understand where my energy is going.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
