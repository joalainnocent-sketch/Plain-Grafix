import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const AUDIO_SRC = 'https://res.cloudinary.com/nac8cpnc/video/upload/v1789402219/My_Audio.wav';
const DEFAULT_VOLUME = 0.35; // Suitable, balanced ambient background volume

export const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasUserInteracted, setHasUserInteracted] = useState<boolean>(false);

  // Initialize and handle autoplay
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = DEFAULT_VOLUME;
    audio.loop = true;

    // Function to try playing the audio
    const tryPlayAudio = () => {
      if (!audio) return;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setHasUserInteracted(true);
            removeInteractionListeners();
          })
          .catch(() => {
            // Autoplay with sound was blocked by the browser policy.
            // Wait for user interaction (click, tap, scroll, keydown)
            setIsPlaying(false);
          });
      }
    };

    // Global interaction handler to start audio as soon as visitor clicks, taps, or scrolls
    const handleFirstInteraction = () => {
      tryPlayAudio();
    };

    const interactionEvents = ['click', 'pointerdown', 'touchstart', 'scroll', 'keydown', 'wheel'];

    const addInteractionListeners = () => {
      interactionEvents.forEach((event) => {
        window.addEventListener(event, handleFirstInteraction, { capture: true, once: true });
      });
    };

    const removeInteractionListeners = () => {
      interactionEvents.forEach((event) => {
        window.removeEventListener(event, handleFirstInteraction, { capture: true });
      });
    };

    // Attempt autoplay immediately on page load
    tryPlayAudio();

    // Register fallback listeners in case autoplay was prevented by browser policy
    addInteractionListeners();

    return () => {
      removeInteractionListeners();
    };
  }, []);

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasUserInteracted(true);
        })
        .catch((err) => {
          console.warn('Audio play request interrupted:', err);
        });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    const nextMuted = !isMuted;
    audio.muted = nextMuted;
    setIsMuted(nextMuted);

    // If unmuting while audio is paused, also resume playback if user prefers
    if (!nextMuted && !isPlaying) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <>
      {/* Hidden native audio element */}
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        loop
        preload="auto"
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          if (audioRef.current) {
            audioRef.current.play().catch(() => {});
          }
        }}
      />

      {/* Floating Audio Controller */}
      <div
        className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40 select-none max-sm:scale-90 max-sm:origin-bottom-right"
        id="plain-grafix-audio-widget"
      >
        <div className="flex items-center gap-2 p-1.5 sm:p-2 rounded-full bg-neutral-950/90 hover:bg-neutral-900/95 border border-neutral-800 hover:border-[#ea580c]/70 shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_18px_rgba(234,88,12,0.18)] backdrop-blur-xl transition-all duration-300">
          {/* Animated Equalizer Waveform & Music Icon */}
          <div
            className="flex items-center gap-1 pl-2 pr-1 text-[#ea580c] cursor-pointer"
            onClick={togglePlayPause}
            title={isPlaying && !isMuted ? 'Audio Playing' : isPlaying && isMuted ? 'Audio Muted' : 'Audio Paused'}
            data-cursor-label={isPlaying ? 'PAUSE' : 'PLAY'}
          >
            <div className="flex items-end gap-[2.5px] h-3.5 w-4 justify-center" aria-hidden="true">
              <span
                className={`w-[2.5px] rounded-full bg-[#ea580c] transition-all duration-200 ${
                  isPlaying && !isMuted
                    ? 'h-3 animate-[pulse_0.6s_ease-in-out_infinite]'
                    : 'h-1 bg-neutral-600'
                }`}
              />
              <span
                className={`w-[2.5px] rounded-full bg-[#ea580c] transition-all duration-300 ${
                  isPlaying && !isMuted
                    ? 'h-3.5 animate-[pulse_0.8s_ease-in-out_infinite_0.15s]'
                    : 'h-1.5 bg-neutral-600'
                }`}
              />
              <span
                className={`w-[2.5px] rounded-full bg-[#ea580c] transition-all duration-200 ${
                  isPlaying && !isMuted
                    ? 'h-2.5 animate-[pulse_0.7s_ease-in-out_infinite_0.3s]'
                    : 'h-1 bg-neutral-600'
                }`}
              />
            </div>
            {/* Label visible on desktop or hover */}
            <span className="hidden sm:inline-block text-[11px] font-semibold text-neutral-300 tracking-wide pl-1">
              {isPlaying && !isMuted ? 'Sound' : isMuted ? 'Muted' : 'Paused'}
            </span>
          </div>

          {/* Vertical Divider */}
          <div className="w-[1px] h-4 bg-neutral-800" />

          {/* Play / Pause Toggle Button */}
          <button
            onClick={togglePlayPause}
            aria-label={isPlaying ? 'Pause background audio' : 'Play background audio'}
            data-cursor-label={isPlaying ? 'PAUSE' : 'PLAY'}
            title={isPlaying ? 'Pause Audio' : 'Play Audio'}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:text-[#ea580c] hover:bg-neutral-800/80 active:scale-95 transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ea580c]"
          >
            {isPlaying ? (
              <Pause size={14} className="fill-current" />
            ) : (
              <Play size={14} className="fill-current ml-0.5" />
            )}
          </button>

          {/* Mute / Unmute Toggle Button */}
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute background audio' : 'Mute background audio'}
            data-cursor-label={isMuted ? 'UNMUTE' : 'MUTE'}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ea580c] active:scale-95 ${
              isMuted
                ? 'text-neutral-500 hover:text-white hover:bg-neutral-800/80'
                : 'text-white hover:text-[#ea580c] hover:bg-neutral-800/80'
            }`}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>

        {/* Subtle tooltip hint if user hasn't interacted and audio is paused due to browser policy */}
        {!hasUserInteracted && !isPlaying && (
          <div className="absolute bottom-full right-0 mb-2 px-2.5 py-1 rounded-lg bg-neutral-900 border border-[#ea580c]/40 text-[#ea580c] text-[10px] font-medium whitespace-nowrap shadow-lg animate-bounce pointer-events-none">
            Tap anywhere to enable sound
          </div>
        )}
      </div>
    </>
  );
};
