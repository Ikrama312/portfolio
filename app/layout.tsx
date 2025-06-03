import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Muhammad Ikrama - Senior JavaScript Developer",
  description:
    "Portfolio of Muhammad Ikrama, a results-driven JavaScript Developer with 6 years of experience in React JS and Node JS. Book meetings directly through integrated Google Calendar.",
  keywords:
    "Muhammad Ikrama, JavaScript Developer, React JS, Node JS, TypeScript, Frontend Developer, Portfolio, Calendar Booking",
  authors: [{ name: "Muhammad Ikrama" }],
  openGraph: {
    title: "Muhammad Ikrama - Senior JavaScript Developer",
    description:
      "Portfolio of Muhammad Ikrama, a results-driven JavaScript Developer with 6 years of experience in React JS and Node JS.",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
