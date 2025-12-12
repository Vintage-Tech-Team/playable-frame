import { Helmet } from "react-helmet-async";
import GamePlayer from "@/components/GamePlayer";
import { Gamepad2 } from "lucide-react";

// Replace this with your actual game URL (S3/CDN or local path)
// Example: "https://your-cdn.com/games/primeballs/index.html"
// Or local: "/games/primeballs/index.html"
const GAME_URL = "/games/primeballs/index.html";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Game Demo | HTML5 Gaming Platform</title>
        <meta name="description" content="Play HTML5 games in your browser. Responsive, fullscreen-ready gaming experience." />
      </Helmet>
      
      <main className="min-h-screen flex flex-col items-center justify-center py-8 px-4">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Gamepad2 className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Game Demo
            </h1>
          </div>
          <p className="text-muted-foreground max-w-lg mx-auto">
            A lightweight HTML5 game player with lazy-loading and fullscreen support
          </p>
        </header>

        <GamePlayer 
          gameUrl={GAME_URL}
          title="PrimeBalls"
        />

        <footer className="mt-8 text-center text-sm text-muted-foreground max-w-2xl">
          <div className="gradient-card rounded-xl p-4 border border-border">
            <p className="font-medium text-foreground mb-2">📌 How to use your own game:</p>
            <ol className="text-left space-y-1 list-decimal list-inside">
              <li>Upload your Unity WebGL build to <code className="text-primary bg-secondary px-1.5 py-0.5 rounded">public/games/your-game/</code></li>
              <li>Update <code className="text-primary bg-secondary px-1.5 py-0.5 rounded">GAME_URL</code> in <code className="text-primary bg-secondary px-1.5 py-0.5 rounded">src/pages/Index.tsx</code></li>
              <li>For CDN hosting, use the full URL: <code className="text-primary bg-secondary px-1.5 py-0.5 rounded">https://your-cdn.com/games/...</code></li>
            </ol>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Index;
