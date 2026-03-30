import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Varshith Alluri — AI/ML Developer",
  description:
    "Building the intelligence that powers the next generation of AI/ML. AI/ML Developer Intern at Eteraflex Connects LLP, specializing in RAG pipelines and clinical trial product development.",
  keywords: ["AI", "ML", "Developer", "Portfolio", "Varshith Alluri", "Machine Learning", "RAG", "PyTorch"],
  authors: [{ name: "Varshith Alluri", url: "https://github.com/Varshithalluri" }],
  openGraph: {
    title: "Varshith Alluri — AI/ML Developer",
    description: "Building the intelligence that powers the next generation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
