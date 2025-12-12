import { useState, useRef, useCallback, useEffect } from "react";
import { Play, Maximize, Minimize, X, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GamePlayerProps {
  gameUrl: string;
  title?: string;
}

const GamePlayer = ({ gameUrl, title = "HTML5 Game" }: GamePlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handlePlay = useCallback(() => {
    setIsLoading(true);
    setIsPlaying(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsPlaying(false);
    setIsLoading(false);
    if (iframeRef.current) {
      iframeRef.current.src = "";
    }
  }, []);

  const handleIframeLoad = useCallback(() => {
    setIsLoading(false);
    if (iframeRef.current) {
      setTimeout(() => iframeRef.current?.focus(), 300);
    }
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (wrapperRef.current) {
        await wrapperRef.current.requestFullscreen();
      }
    } catch (err) {
      console.warn("Fullscreen failed:", err);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Listen for postMessage from game
  useEffect(() => {
    const handleMessage = (ev: MessageEvent) => {
      if (ev.data === "game:paused") {
        console.log("Game paused via postMessage");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="gradient-card rounded-2xl p-6 border border-border shadow-card">
        {!isPlaying ? (
          <div className="flex flex-col items-center justify-center py-20 gap-6">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center animate-float">
              <Gamepad2 className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">{title}</h2>
            <p className="text-muted-foreground text-center max-w-md">
              Click the button below to load and start the game. The game will run inside a secure iframe.
            </p>
            <Button
              onClick={handlePlay}
              size="lg"
              className="gap-2 animate-pulse-glow"
            >
              <Play className="w-5 h-5" />
              Play Game
            </Button>
          </div>
        ) : (
          <div
            ref={wrapperRef}
            className={`relative rounded-xl overflow-hidden bg-card ${
              isFullscreen ? "fixed inset-0 z-50 rounded-none" : "aspect-video"
            }`}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-card z-10">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                  <p className="text-muted-foreground">Loading game...</p>
                </div>
              </div>
            )}
            
            <iframe
              ref={iframeRef}
              src={isPlaying ? gameUrl : ""}
              title={title}
              sandbox="allow-scripts allow-forms allow-same-origin allow-pointer-lock"
              allowFullScreen
              referrerPolicy="no-referrer"
              onLoad={handleIframeLoad}
              className="w-full h-full border-0"
            />

            <div className="absolute top-3 right-3 flex gap-2 z-20">
              <Button
                onClick={toggleFullscreen}
                size="sm"
                variant="secondary"
                className="gap-1.5 bg-secondary/90 backdrop-blur-sm hover:bg-secondary"
              >
                {isFullscreen ? (
                  <>
                    <Minimize className="w-4 h-4" />
                    Exit
                  </>
                ) : (
                  <>
                    <Maximize className="w-4 h-4" />
                    Fullscreen
                  </>
                )}
              </Button>
              <Button
                onClick={handleClose}
                size="sm"
                variant="secondary"
                className="gap-1.5 bg-secondary/90 backdrop-blur-sm hover:bg-secondary"
              >
                <X className="w-4 h-4" />
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePlayer;
