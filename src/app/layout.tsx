import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080c14" },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Hardik Jariwala | Full-Stack .NET & Angular Software Engineer",
  description:
    "Full-stack .NET & Angular engineer with hands-on experience building enterprise ERP systems — ASP.NET Core APIs, SQL Server business logic, and complex workflow features.",
  keywords: [
    "Hardik Jariwala",
    ".NET developer",
    "Angular developer",
    "ASP.NET Core",
    "Full-stack engineer",
    "SQL Server",
    "ERP developer",
    "C# developer",
    "Entity Framework",
    "Dapper",
    "Enterprise Software",
  ],
  authors: [{ name: "Hardik Jariwala" }],
  creator: "Hardik Jariwala",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hardikjariwala.dev",
    title: "Hardik Jariwala | Full-Stack .NET & Angular Software Engineer",
    description:
      "Full-stack engineer with hands-on experience building enterprise ERP systems — ASP.NET Core APIs, Angular front ends, SQL Server-backed business logic, and complex approval/workflow-driven modules.",
    siteName: "Hardik Jariwala Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hardik Jariwala | Full-Stack .NET & Angular Software Engineer",
    description:
      "Enterprise ERP systems, ASP.NET Core APIs, Angular front ends, and SQL Server business logic.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${spaceGrotesk.variable} min-h-screen bg-[var(--bg-base)] text-[var(--text-main)] font-sans antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
