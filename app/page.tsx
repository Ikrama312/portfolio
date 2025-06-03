"use client"

import React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import {
  Mail,
  Phone,
  MapPin,
  Code,
  Database,
  Globe,
  Zap,
  Users,
  TrendingUp,
  Sun,
  Moon,
  Calendar,
  Briefcase,
  Linkedin,
  Github,
} from "lucide-react"
import Image from "next/image"

// Theme Context
const ThemeContext = React.createContext<{
  isDark: boolean
  toggleTheme: () => void
}>({
  isDark: true,
  toggleTheme: () => {},
})

// Theme Provider with error boundary
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const savedTheme = localStorage.getItem("theme")
      if (savedTheme) {
        setIsDark(savedTheme === "dark")
      }
    } catch (error) {
      console.warn("Failed to load theme from localStorage:", error)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem("theme", isDark ? "dark" : "light")
        document.documentElement.classList.toggle("dark", isDark)
      } catch (error) {
        console.warn("Failed to save theme to localStorage:", error)
      }
    }
  }, [isDark, mounted])

  const toggleTheme = () => setIsDark(!isDark)

  if (!mounted) {
    return <div className="min-h-screen bg-slate-900" />
  }

  return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>
}

// Theme Toggle Button
function ThemeToggle() {
  const { isDark, toggleTheme } = React.useContext(ThemeContext)

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-gray-300/20 dark:border-gray-700/20 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="w-6 h-6 text-amber-400" /> : <Moon className="w-6 h-6 text-slate-600" />}
    </motion.button>
  )
}

// Calendar Booking Component
function CalendarBooking() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [meetingTitle, setMeetingTitle] = useState("")
  const [meetingDescription, setMeetingDescription] = useState("")
  const [clientName, setClientName] = useState("")
  const [clientEmail, setClientEmail] = useState("")

  const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]

  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return ""
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })
    } catch (error) {
      console.warn("Date formatting error:", error)
      return dateString
    }
  }

  const handleBookMeeting = () => {
    try {
      if (!selectedDate || !selectedTime || !meetingTitle || !clientName || !clientEmail) {
        alert("Please fill in all required fields")
        return
      }

      // Create Google Calendar event URL
      const startDateTime = new Date(`${selectedDate}T${selectedTime}:00`)
      const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000) // 1 hour meeting

      const formatDateTime = (date: Date) => {
        return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
      }

      const eventDetails = {
        text: meetingTitle,
        dates: `${formatDateTime(startDateTime)}/${formatDateTime(endDateTime)}`,
        details: `Meeting with ${clientName}\n\nDescription: ${meetingDescription}\n\nClient Email: ${clientEmail}`,
        location: "Video Call (Link will be shared)",
        add: "ikramaansari312@gmail.com",
      }

      const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.text)}&dates=${eventDetails.dates}&details=${encodeURIComponent(eventDetails.details)}&location=${encodeURIComponent(eventDetails.location)}&add=${encodeURIComponent(eventDetails.add)}`

      window.open(googleCalendarUrl, "_blank")
      setIsOpen(false)

      // Reset form
      setSelectedDate("")
      setSelectedTime("")
      setMeetingTitle("")
      setMeetingDescription("")
      setClientName("")
      setClientEmail("")
    } catch (error) {
      console.error("Error booking meeting:", error)
      alert("There was an error booking the meeting. Please try again.")
    }
  }

  const { isDark } = React.useContext(ThemeContext)

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-full transition-all duration-300 text-white font-semibold hover:scale-105 shadow-lg hover:shadow-xl z-20 relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Book a meeting"
      >
        <Calendar size={24} />
        Book a Meeting
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto min-h-screen"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`w-full max-w-2xl my-8 ${isDark ? "bg-slate-800" : "bg-white"} rounded-2xl p-8 border ${isDark ? "border-slate-700" : "border-gray-200"} shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Book a Meeting</h3>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-2 rounded-full ${isDark ? "hover:bg-slate-700" : "hover:bg-gray-100"} transition-colors`}
                aria-label="Close modal"
              >
                <span className={`text-2xl ${isDark ? "text-gray-400" : "text-gray-600"}`}>×</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  Your Name *
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${isDark ? "bg-slate-700 border-slate-600 text-white" : "bg-white border-gray-300 text-slate-900"} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors`}
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  Your Email *
                </label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${isDark ? "bg-slate-700 border-slate-600 text-white" : "bg-white border-gray-300 text-slate-900"} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors`}
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  Meeting Date * {selectedDate && `(${formatDateForDisplay(selectedDate)})`}
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className={`w-full px-4 py-3 rounded-lg border ${isDark ? "bg-slate-700 border-slate-600 text-white" : "bg-white border-gray-300 text-slate-900"} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors`}
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  Meeting Time *
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${isDark ? "bg-slate-700 border-slate-600 text-white" : "bg-white border-gray-300 text-slate-900"} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors`}
                >
                  <option value="">Select time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className={`block text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  Meeting Title *
                </label>
                <input
                  type="text"
                  value={meetingTitle}
                  onChange={(e) => setMeetingTitle(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${isDark ? "bg-slate-700 border-slate-600 text-white" : "bg-white border-gray-300 text-slate-900"} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors`}
                  placeholder="e.g., Project Discussion, Consultation Call"
                />
              </div>

              <div className="md:col-span-2">
                <label className={`block text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  Meeting Description
                </label>
                <textarea
                  value={meetingDescription}
                  onChange={(e) => setMeetingDescription(e.target.value)}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-lg border ${isDark ? "bg-slate-700 border-slate-600 text-white" : "bg-white border-gray-300 text-slate-900"} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none`}
                  placeholder="Brief description of what you'd like to discuss..."
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setIsOpen(false)}
                className={`flex-1 px-6 py-3 rounded-lg border ${isDark ? "border-slate-600 text-gray-300 hover:bg-slate-700" : "border-gray-300 text-gray-700 hover:bg-gray-50"} transition-colors font-semibold`}
              >
                Cancel
              </button>
              <button
                onClick={handleBookMeeting}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-lg transition-all duration-300 font-semibold"
              >
                Book Meeting
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

// CSS-based animated background for better compatibility
function AnimatedBackground() {
  const { isDark } = React.useContext(ThemeContext)

  return (
    <div className="absolute inset-0 overflow-hidden">
      {isDark ? (
        // Dark mode: Moving stars
        <div className="stars-container">
          {Array.from({ length: 200 }, (_, i) => (
            <div
              key={`star-${i}`}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      ) : (
        // Light mode: Milky Way galaxy
        <div className="galaxy-container">
          <div className="galaxy-core" />
          {Array.from({ length: 300 }, (_, i) => {
            const angle = (i / 300) * Math.PI * 8
            const radius = (i / 300) * 40 + Math.random() * 10
            const x = 50 + Math.cos(angle) * radius
            const y = 50 + Math.sin(angle) * radius * 0.3
            return (
              <div
                key={`galaxy-star-${i}`}
                className="galaxy-star"
                style={{
                  left: `${Math.max(0, Math.min(100, x))}%`,
                  top: `${Math.max(0, Math.min(100, y))}%`,
                  animationDelay: `${Math.random() * 10}s`,
                }}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

// Social Media Links Component
function SocialLinks() {
  const { isDark } = React.useContext(ThemeContext)

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6">
      <a
        href="https://www.linkedin.com/in/ikrama-ansari"
        target="_blank"
        rel="noreferrer"
        className={`p-3 rounded-full ${
          isDark
            ? "bg-blue-600/20 hover:bg-blue-600/40 text-blue-400"
            : "bg-blue-500/20 hover:bg-blue-500/40 text-blue-600"
        } transition-all duration-300 hover:scale-110`}
        aria-label="LinkedIn Profile"
      >
        <Linkedin size={24} />
      </a>
      <a
        href="https://github.com/Ikrama312"
        target="_blank"
        rel="noreferrer"
        className={`p-3 rounded-full ${
          isDark ? "bg-slate-700/50 hover:bg-slate-700/80 text-white" : "bg-slate-200 hover:bg-slate-300 text-slate-800"
        } transition-all duration-300 hover:scale-110`}
        aria-label="GitHub Profile"
      >
        <Github size={24} />
      </a>
      <a
        href="https://www.upwork.com/freelancers/~01d8c4168d8ee750bc"
        target="_blank"
        rel="noreferrer"
        className={`p-3 rounded-full ${
          isDark
            ? "bg-green-600/20 hover:bg-green-600/40 text-green-400"
            : "bg-green-500/20 hover:bg-green-500/40 text-green-600"
        } transition-all duration-300 hover:scale-110`}
        aria-label="Upwork Profile"
      >
        <Briefcase size={24} />
      </a>
    </div>
  )
}

// Hero Section with Photo
function HeroSection() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const { isDark } = React.useContext(ThemeContext)

  return (
    <motion.section
      style={{ y, opacity }}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
        isDark
          ? "bg-gradient-to-br from-slate-900 via-amber-900/20 to-emerald-900/20"
          : "bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900"
      }`}
    >
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Hero Content */}
      <div className={`relative z-10 text-center px-6 max-w-6xl mx-auto ${isDark ? "text-white" : "text-white"}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-8"
        >
          <div
            className={`relative w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 ${isDark ? "border-amber-400" : "border-cyan-400"} shadow-2xl ${isDark ? "shadow-amber-400/30" : "shadow-cyan-400/30"}`}
          >
            <Image
              src="https://v0.dev/_next/image?url=https%3A%2F%2Fhebbkx1anhila5yf.public.blob.vercel-storage.com%2FIkrama-wA0x5QENOTJP7AvZnGuMwh1j9DFIn3.png&w=3840&q=75"
              alt="Muhammad Ikrama"
              fill
              className="object-cover"
              priority
              onError={(e) => {
                console.warn("Image failed to load, using fallback")
                const target = e.target as HTMLImageElement
                target.src = "https://v0.dev/_next/image?url=https%3A%2F%2Fhebbkx1anhila5yf.public.blob.vercel-storage.com%2FIkrama-wA0x5QENOTJP7AvZnGuMwh1j9DFIn3.png&w=3840&q=75"
              }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 ${
              isDark
                ? "bg-gradient-to-r from-amber-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent"
            }`}
          >
            Muhammad Ikrama
          </h1>
          <p
            className={`text-xl sm:text-2xl md:text-3xl mb-8 font-semibold ${isDark ? "text-amber-300" : "text-cyan-300"}`}
          >
            Senior JavaScript Developer
          </p>
          <p
            className={`text-base sm:text-lg md:text-xl max-w-4xl mx-auto leading-relaxed ${isDark ? "text-slate-300" : "text-blue-100"}`}
          >
            Crafting exceptional digital experiences with 7+ years of expertise in React JS and Node JS. Passionate
            about innovation, performance optimization, and delivering scalable solutions that drive business growth.
          </p>

          {/* Social Media Links */}
          <SocialLinks />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 flex flex-wrap justify-center gap-6"
        >
          <a
            href="mailto:ikramaansari312@gmail.com?subject=Let's%20Collaborate&body=Hi%20Muhammad,%0D%0A%0D%0AI%20would%20like%20to%20discuss%20a%20potential%20project%20with%20you.%0D%0A%0D%0ABest%20regards"
            target="_blank"
            className={`flex items-center gap-2 px-8 py-4 ${
              isDark
                ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            } rounded-full transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105 text-white`}
            rel="noreferrer"
          >
            <Mail size={20} />
            Let&apos;s Connect
          </a>
          <CalendarBooking />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-5 ${isDark ? "text-amber-400" : "text-cyan-300"}`}
      >
        <div
          className={`w-6 h-10 border-2 ${isDark ? "border-amber-400" : "border-cyan-300"} rounded-full flex justify-center`}
        >
          <div className={`w-1 h-3 ${isDark ? "bg-amber-400" : "bg-cyan-300"} rounded-full mt-2`}></div>
        </div>
      </motion.div>
    </motion.section>
  )
}

// Projects Showcase Section
function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { isDark } = React.useContext(ThemeContext)

  const projects = [
    {
      title: "Lonewolf Real Estate Platform",
      company: "Macrosoft Inc.",
      description:
        "Comprehensive financial management system for real estate agencies with advanced form handling and TypeScript migration.",
      technologies: ["React", "TypeScript", "Node.js", "Financial APIs"],
      achievements: [
        "Improved developer productivity significantly",
        "Reduced bug reports through TypeScript migration",
        "Enhanced financial data handling efficiency",
      ],
      icon: <Globe className="w-8 h-8" />,
      gradient: isDark ? "from-emerald-500 to-teal-500" : "from-emerald-400 to-teal-400",
    },
    {
      title: "Payer Backbone Insurance Platform",
      company: "MMIT/Norstella",
      description:
        "Complex insurance platform with dynamic configuration for Organizations, Formularies, UM Packages, and U.S. Lives management.",
      technologies: ["React", "TypeScript", "Complex State Management", "Insurance APIs"],
      achievements: [
        "Dynamic insurance structure configuration",
        "Real-time plan lifecycle management",
        "Enhanced coverage tracking accuracy",
      ],
      icon: <Database className="w-8 h-8" />,
      gradient: isDark ? "from-blue-500 to-indigo-500" : "from-blue-400 to-indigo-400",
    },
    {
      title: "Curenta Healthcare Platform",
      company: "Curenta, LA",
      description:
        "Revolutionary medication prescribing tool serving 1200+ nurses and processing 116,000+ orders with real-time tracking.",
      technologies: ["React", "TypeScript", "GraphQL", "Socket.io", "Google Maps"],
      achievements: [
        "30% reduction in prescription errors",
        "20% improvement in doctor productivity",
        "300% company financial growth contribution",
      ],
      icon: <Users className="w-8 h-8" />,
      gradient: isDark ? "from-purple-500 to-pink-500" : "from-purple-400 to-pink-400",
    },
    {
      title: "Telemedicine Portal",
      company: "Netsol Technologies",
      description:
        "Complete telemedicine solution with video calling, chat, and appointment booking for enhanced patient care.",
      technologies: ["React", "Socket.io", "Twilio API", "Real-time Communication"],
      achievements: [
        "40% reduction in patient wait times",
        "25% increase in daily appointment capacity",
        "Seamless doctor-patient communication",
      ],
      icon: <Zap className="w-8 h-8" />,
      gradient: isDark ? "from-orange-500 to-red-500" : "from-orange-400 to-red-400",
    },
    {
      title: "E-Learning Platform",
      company: "Argon Tech Inc.",
      description:
        "Interactive online learning platform with real-time collaboration and responsive design for enhanced user experience.",
      technologies: ["React", "Node.js", "Socket.io", "Responsive Design"],
      achievements: [
        "50% improvement in system stability",
        "40% boost in collaboration",
        "25% enhancement in user satisfaction",
      ],
      icon: <Code className="w-8 h-8" />,
      gradient: isDark ? "from-cyan-500 to-blue-500" : "from-cyan-400 to-blue-400",
    },
  ]

  return (
    <section
      ref={ref}
      className={`py-20 px-6 ${isDark ? "bg-gradient-to-br from-slate-900 to-slate-800" : "bg-gradient-to-br from-gray-50 to-white"}`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className={`text-5xl md:text-6xl font-bold mb-6 ${
              isDark
                ? "bg-gradient-to-r from-amber-400 to-emerald-400 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent"
            }`}
          >
            Featured Projects
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Showcasing impactful solutions that have driven business growth and enhanced user experiences across various
            industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={`project-${index}`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`group relative ${
                isDark ? "bg-slate-800/50" : "bg-white/80"
              } backdrop-blur-sm rounded-2xl p-8 border ${
                isDark ? "border-slate-700 hover:border-amber-400/50" : "border-gray-200 hover:border-blue-400/50"
              } transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
              ></div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${project.gradient} text-white`}>{project.icon}</div>
                  <div>
                    <h3 className={`text-2xl font-bold mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>
                      {project.title}
                    </h3>
                    <p className={`font-semibold ${isDark ? "text-amber-400" : "text-blue-600"}`}>{project.company}</p>
                  </div>
                </div>

                <p className={`mb-6 leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                  {project.description}
                </p>

                <div className="mb-6">
                  <h4 className={`font-semibold mb-3 ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>
                    Key Achievements:
                  </h4>
                  <ul className="space-y-2">
                    {project.achievements.map((achievement, i) => (
                      <li
                        key={`achievement-${index}-${i}`}
                        className={`flex items-start ${isDark ? "text-slate-300" : "text-slate-600"}`}
                      >
                        <TrendingUp
                          className={`w-4 h-4 mr-2 mt-1 flex-shrink-0 ${isDark ? "text-emerald-400" : "text-emerald-600"}`}
                        />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={`tech-${index}-${i}`}
                      className={`px-3 py-1 rounded-full text-sm border ${
                        isDark
                          ? "bg-slate-700 text-slate-300 border-slate-600"
                          : "bg-gray-100 text-slate-700 border-gray-300"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Experience Timeline
function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { isDark } = React.useContext(ThemeContext)

  const experiences = [
    {
      title: "Senior React Developer",
      company: "Macrosoft Inc., Pakistan",
      location: "Remote",
      period: "2024 - Present",
      description:
        "Leading complex real estate and insurance platform development with focus on TypeScript migration and system optimization.",
      color: "emerald",
    },
    {
      title: "Senior FrontEnd Developer",
      company: "Curenta, LA, USA",
      location: "Remote",
      period: "2021 - 2024",
      description:
        "Spearheaded healthcare platform development serving 1200+ nurses, processing 116,000+ orders with 300% company growth contribution.",
      color: "amber",
    },
    {
      title: "FrontEnd Developer",
      company: "Netsol Technologies",
      location: "Lahore, Pakistan",
      period: "2020 - 2021",
      description:
        "Led team development of telemedicine solutions with video calling, chat modules, and appointment systems.",
      color: "cyan",
    },
    {
      title: "FrontEnd Developer",
      company: "Argon Tech Inc.",
      location: "Lahore, Pakistan",
      period: "2018 - 2020",
      description:
        "Developed scalable e-learning platforms with real-time collaboration and responsive design implementations.",
      color: "purple",
    },
  ]

  return (
    <section
      ref={ref}
      className={`py-20 px-6 ${isDark ? "bg-gradient-to-br from-slate-800 to-slate-900" : "bg-gradient-to-br from-white to-gray-50"}`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className={`text-5xl md:text-6xl font-bold text-center mb-16 ${
            isDark
              ? "bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
              : "bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent"
          }`}
        >
          Career Journey
        </motion.h2>

        <div className="relative">
          {/* Timeline Line */}
          <div
            className={`absolute left-8 top-0 bottom-0 w-0.5 ${
              isDark
                ? "bg-gradient-to-b from-emerald-400 via-amber-400 to-purple-400"
                : "bg-gradient-to-b from-emerald-500 via-amber-500 to-purple-500"
            }`}
          ></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={`experience-${index}`}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative flex items-start mb-12 last:mb-0"
            >
              {/* Timeline Dot */}
              <div
                className={`absolute left-6 w-4 h-4 bg-${exp.color}-400 rounded-full border-4 ${
                  isDark ? "border-slate-900" : "border-white"
                } z-10`}
              ></div>

              {/* Content */}
              <div
                className={`ml-20 ${
                  isDark ? "bg-slate-800/50" : "bg-white/80"
                } backdrop-blur-sm rounded-2xl p-8 border ${
                  isDark ? "border-slate-700 hover:border-amber-400/50" : "border-gray-200 hover:border-blue-400/50"
                } transition-all duration-300 w-full shadow-lg hover:shadow-xl`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                      {exp.title}
                    </h3>
                    <p className={`text-lg font-semibold ${isDark ? "text-amber-400" : "text-blue-600"}`}>
                      {exp.company}
                    </p>
                    <p className={`${isDark ? "text-slate-400" : "text-slate-600"}`}>{exp.location}</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span
                      className={`px-4 py-2 bg-${exp.color}-500/20 text-${exp.color}-${isDark ? "400" : "600"} rounded-full font-semibold`}
                    >
                      {exp.period}
                    </span>
                  </div>
                </div>
                <p className={`leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Skills Section with Creative Layout
function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const { isDark } = React.useContext(ThemeContext)

  const skillCategories = [
    {
      title: "Frontend Technologies",
      skills: ["JavaScript", "TypeScript", "React JS", "Next JS"],
      icon: <Code className="w-6 h-6" />,
      color: "emerald",
    },
    {
      title: "Backend & APIs",
      skills: ["Node JS", "GraphQL", "Web3", "Redux"],
      icon: <Database className="w-6 h-6" />,
      color: "amber",
    },
    {
      title: "Styling & UI",
      skills: ["Tailwind CSS", "Bootstrap", "Chart.js"],
      icon: <Globe className="w-6 h-6" />,
      color: "cyan",
    },
    {
      title: "Cloud & Database",
      skills: ["AWS Serverless", "AWS (S3, API Gateway, Cloud Watch)", "Postgres"],
      icon: <Zap className="w-6 h-6" />,
      color: "purple",
    },
  ]

  return (
    <section
      ref={ref}
      className={`py-20 px-6 ${
        isDark
          ? "bg-gradient-to-br from-slate-900 via-emerald-900/10 to-slate-900"
          : "bg-gradient-to-br from-gray-50 via-emerald-50/30 to-gray-50"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className={`text-5xl md:text-6xl font-bold text-center mb-16 ${
            isDark
              ? "bg-gradient-to-r from-amber-400 to-emerald-400 bg-clip-text text-transparent"
              : "bg-gradient-to-r from-amber-600 to-emerald-600 bg-clip-text text-transparent"
          }`}
        >
          Technical Expertise
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={`skill-category-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`${isDark ? "bg-slate-800/50" : "bg-white/80"} backdrop-blur-sm rounded-2xl p-8 border ${
                isDark ? "border-slate-700 hover:border-amber-400/50" : "border-gray-200 hover:border-blue-400/50"
              } transition-all duration-300 shadow-lg hover:shadow-xl`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`p-3 rounded-xl bg-${category.color}-500/20 text-${category.color}-${isDark ? "400" : "600"}`}
                >
                  {category.icon}
                </div>
                <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{category.title}</h3>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={`skill-${index}-${skillIndex}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + skillIndex * 0.05 }}
                    className={`px-4 py-3 bg-gradient-to-r from-${category.color}-500/10 to-${category.color}-600/10 rounded-lg border border-${category.color}-500/20 ${
                      isDark ? "text-slate-300 hover:text-white" : "text-slate-700 hover:text-slate-900"
                    } transition-colors`}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const { isDark } = React.useContext(ThemeContext)

  return (
    <section
      ref={ref}
      className={`py-20 px-6 ${
        isDark
          ? "bg-gradient-to-br from-slate-900 via-amber-900/20 to-emerald-900/20"
          : "bg-gradient-to-br from-blue-50 via-amber-50/50 to-emerald-50/50"
      }`}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight ${
            isDark
              ? "bg-gradient-to-r from-amber-400 to-emerald-400 bg-clip-text text-transparent"
              : "bg-gradient-to-r from-amber-600 to-emerald-600 bg-clip-text text-transparent"
          }`}
        >
          Let&apos;s Build Something Amazing
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`text-xl mb-12 leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}
        >
          Ready to transform your ideas into exceptional digital experiences? Let&apos;s collaborate and create
          something extraordinary together.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <a
            href="mailto:ikramaansari312@gmail.com?subject=Let's%20Collaborate&body=Hi%20Muhammad,%0D%0A%0D%0AI%20would%20like%20to%20discuss%20a%20potential%20project%20with%20you.%0D%0A%0D%0ABest%20regards"
            target="_blank"
            className={`flex items-center gap-3 px-8 py-4 ${
              isDark
                ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
            } rounded-full transition-all duration-300 text-white font-semibold hover:scale-105 shadow-lg hover:shadow-xl`}
            rel="noreferrer"
          >
            <Mail size={24} />
            ikramaansari312@gmail.com
          </a>
          <a
            href="tel:+923333666962"
            target="_blank"
            className={`flex items-center gap-3 px-8 py-4 border-2 ${
              isDark
                ? "border-emerald-400 hover:bg-emerald-400 hover:text-slate-900 text-white"
                : "border-emerald-500 hover:bg-emerald-500 hover:text-white text-slate-900"
            } rounded-full transition-all duration-300 font-semibold hover:scale-105`}
            rel="noreferrer"
          >
            <Phone size={24} />
            (+92) 333-3666-962
          </a>
          <div
            className={`flex items-center gap-3 px-8 py-4 border-2 ${
              isDark ? "border-slate-600 text-white" : "border-gray-400 text-slate-900"
            } rounded-full font-semibold`}
          >
            <MapPin size={24} />
            Lahore, Pakistan
          </div>
        </motion.div>

        {/* Social Profiles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex flex-wrap justify-center gap-6"
        >
          <a
            href="https://www.linkedin.com/in/ikrama-ansari"
            target="_blank"
            className={`flex items-center gap-3 px-8 py-4 ${
              isDark ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
            } rounded-full transition-all duration-300 text-white font-semibold hover:scale-105 shadow-lg hover:shadow-xl`}
            rel="noreferrer"
          >
            <Linkedin size={24} />
            LinkedIn
          </a>
          <a
            href="https://github.com/Ikrama312"
            target="_blank"
            className={`flex items-center gap-3 px-8 py-4 ${
              isDark ? "bg-slate-700 hover:bg-slate-800" : "bg-slate-800 hover:bg-slate-900"
            } rounded-full transition-all duration-300 text-white font-semibold hover:scale-105 shadow-lg hover:shadow-xl`}
            rel="noreferrer"
          >
            <Github size={24} />
            GitHub
          </a>
          <a
            href="https://www.upwork.com/freelancers/~01d8c4168d8ee750bc"
            target="_blank"
            className={`flex items-center gap-3 px-8 py-4 ${
              isDark ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"
            } rounded-full transition-all duration-300 text-white font-semibold hover:scale-105 shadow-lg hover:shadow-xl`}
            rel="noreferrer"
          >
            <Briefcase size={24} />
            Upwork
          </a>
        </motion.div>

        {/* Education & Languages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div
            className={`${isDark ? "bg-slate-800/50" : "bg-white/80"} backdrop-blur-sm rounded-2xl p-8 border ${
              isDark ? "border-slate-700" : "border-gray-200"
            } shadow-lg`}
          >
            <h3 className={`text-2xl font-bold mb-4 ${isDark ? "text-amber-400" : "text-amber-600"}`}>Education</h3>
            <p className={`font-semibold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
              Comsats University of Information Technology
            </p>
            <p className={`mb-2 ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>BS, Computer Science</p>
            <p className={`${isDark ? "text-slate-400" : "text-slate-600"}`}>Islamabad, Pakistan • 2014 - 2018</p>
          </div>

          <div
            className={`${isDark ? "bg-slate-800/50" : "bg-white/80"} backdrop-blur-sm rounded-2xl p-8 border ${
              isDark ? "border-slate-700" : "border-gray-200"
            } shadow-lg`}
          >
            <h3 className={`text-2xl font-bold mb-4 ${isDark ? "text-amber-400" : "text-amber-600"}`}>Languages</h3>
            <div className="space-y-2">
              <p className={`${isDark ? "text-white" : "text-slate-900"}`}>
                <span className={`font-semibold ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>Native:</span>{" "}
                Urdu
              </p>
              <p className={`${isDark ? "text-white" : "text-slate-900"}`}>
                <span className={`font-semibold ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>Fluent:</span>{" "}
                English
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Footer with Social Links
function Footer() {
  const { isDark } = React.useContext(ThemeContext)

  return (
    <footer className="py-8 px-6 border-t dark:bg-slate-900 dark:border-slate-800 bg-white border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="dark:text-slate-400 text-slate-600">
            © 2025 Muhammad Ikrama. Crafted with passion and precision.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/ikrama-ansari"
              target="_blank"
              rel="noreferrer"
              className={`p-2 rounded-full ${
                isDark
                  ? "bg-blue-600/20 hover:bg-blue-600/40 text-blue-400"
                  : "bg-blue-500/20 hover:bg-blue-500/40 text-blue-600"
              } transition-all duration-300 hover:scale-110`}
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://github.com/Ikrama312"
              target="_blank"
              rel="noreferrer"
              className={`p-2 rounded-full ${
                isDark
                  ? "bg-slate-700/50 hover:bg-slate-700/80 text-white"
                  : "bg-slate-200 hover:bg-slate-300 text-slate-800"
              } transition-all duration-300 hover:scale-110`}
              aria-label="GitHub Profile"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.upwork.com/freelancers/~01d8c4168d8ee750bc"
              target="_blank"
              rel="noreferrer"
              className={`p-2 rounded-full ${
                isDark
                  ? "bg-green-600/20 hover:bg-green-600/40 text-green-400"
                  : "bg-green-500/20 hover:bg-green-500/40 text-green-600"
              } transition-all duration-300 hover:scale-110`}
              aria-label="Upwork Profile"
            >
              <Briefcase size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function Portfolio() {
  // Remove the custom scroll handler for faster scrolling
  useEffect(() => {
    // Enable smooth scrolling via CSS instead of JavaScript
    document.documentElement.style.scrollBehavior = "smooth"

    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  return (
    <ThemeProvider>
      <div className="overflow-x-hidden transition-colors duration-300">
        <ThemeToggle />
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
        <Footer />
      </div>
    </ThemeProvider>
  )
}
