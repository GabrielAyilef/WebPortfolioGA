import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
} from "react";
import music from "../../../../assets/audio.wav";

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const audioRef = useRef(new Audio(music));
  const [isPlaying, setIsPlaying] = useState(false);
  const playAudio = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const stopAudio = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };
  function handleMusicToggle() {
    if (isPlaying) {
      stopAudio();
    } else {
      playAudio();
    }
  }
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && isPlaying) {
        stopAudio();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPlaying]);

  useEffect(() => {
    function handleEnded() {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }

    audioRef.current.addEventListener("ended", handleEnded);
    return () => {
      audioRef.current.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{ playAudio, stopAudio, isPlaying, handleMusicToggle }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}
