import type { Metadata } from "next";
import "./globals.css";
import { GameProvider } from "@/context/GameContext";

export const metadata: Metadata = {
  title: "おつかいタイマー",
  description: "お買い物×算数×時計の知育ゲーム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <GameProvider>
          <main className="game-container">
            {children}
          </main>
        </GameProvider>
      </body>
    </html>
  );
}
