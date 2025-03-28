import { useState, useEffect } from "react";
import { Button } from "reactstrap";

export const Player = ({ track }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!track) return;

    setIsPlaying(false);
    setProgress(0);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (track.preview_url) {
      audioRef.current = new Audio(track.preview_url);
      audioRef.current.addEventListener("timeupdate", () => {
        setProgress((audioRef.current.currentTime / 30) * 100);
      });
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
        setProgress(100);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [track]);

  const togglePlay = () => {
    if (!track?.preview_url) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (!track?.preview_url) {
    return <p>No preview available for this track</p>;
  }

  return (
    <div className="player">
      <Button>{isPlaying ? "Pause" : "Play"} Preview</Button>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};
