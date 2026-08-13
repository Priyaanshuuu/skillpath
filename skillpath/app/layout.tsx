import type { Metadata } from "next";
import { Fjalla_One } from "next/font/google";
import "./globals.css";

const fjallaOne = Fjalla_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fjalla",
});

export const metadata: Metadata = {
  title: "Skillpath",
  description: "Practical courses to help you learn useful skills and put them into action.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fjallaOne.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
