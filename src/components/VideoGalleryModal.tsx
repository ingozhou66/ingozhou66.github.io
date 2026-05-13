import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Maximize, Volume2, VolumeX } from 'lucide-react';
import type { Project } from '@/data/projects';

interface VideoGalleryModalProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}

export function VideoGalleryModal({
  project,
  open,
  onClose,
}: VideoGalleryModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const videos = project?.videos || [];
  const currentVideo = videos[activeIndex];

  // Reset state when project changes
  useEffect(() => {
    if (open && project) {
      setActiveIndex(0);
      setIsPlaying(false);
      setProgress(0);
    }
  }, [open, project?.id]);

  // Handle video playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
  }, [isPlaying, activeIndex]);

  // Handle progress updates
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, [activeIndex]);

  // Handle video end
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, [activeIndex]);

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };
    if (open) {
      window.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  // Auto-hide controls
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimer.current) clearTimeout(controlsTimer.current);
    controlsTimer.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const newProgress = parseFloat(e.target.value);
    video.currentTime = (newProgress / 100) * video.duration;
    setProgress(newProgress);
  };

  const handleVolumeToggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (volume > 0) {
      setVolume(0);
      video.volume = 0;
    } else {
      setVolume(1);
      video.volume = 1;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!project || project.type !== 'video') return null;

  const isSingleVideo = videos.length === 1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className={`relative bg-surface rounded-xl border border-border overflow-hidden flex ${
              isSingleVideo
                ? 'w-full max-w-4xl mx-4'
                : 'w-full max-w-6xl mx-4 h-[85vh]'
            }`}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close button (mobile) */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 ghost-btn p-2 bg-surface/80 backdrop-blur-sm"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Video Player Area */}
            <div
              className={`flex-1 flex flex-col ${!isSingleVideo ? 'md:flex-row' : ''}`}
              onMouseMove={handleMouseMove}
            >
              {/* Main Video */}
              <div
                className={`relative bg-black flex items-center justify-center ${
                  isSingleVideo ? 'aspect-video' : 'flex-1'
                }`}
              >
                {currentVideo && (
                  <>
                    <video
                      ref={videoRef}
                      src={currentVideo.src}
                      poster={currentVideo.thumbnail}
                      className="w-full h-full object-contain"
                      preload="metadata"
                      onClick={() => setIsPlaying(!isPlaying)}
                    />

                    {/* Center play button when paused */}
                    {!isPlaying && (
                      <div
                        className="absolute inset-0 flex items-center justify-center cursor-pointer"
                        onClick={() => setIsPlaying(true)}
                      >
                        <div className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center hover:scale-110 transition-transform">
                          <Play
                            className="w-7 h-7 text-surface-primary ml-1"
                            fill="currentColor"
                          />
                        </div>
                      </div>
                    )}

                    {/* Controls overlay */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-12 transition-opacity duration-300 ${
                        showControls || !isPlaying
                          ? 'opacity-100'
                          : 'opacity-0'
                      }`}
                    >
                      {/* Progress bar */}
                      <div className="mb-3">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={progress}
                          onChange={handleSeek}
                          className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:cursor-pointer"
                          style={{
                            background: `linear-gradient(to right, #c9a050 ${progress}%, rgba(255,255,255,0.2) ${progress}%)`,
                          }}
                        />
                      </div>

                      {/* Control buttons */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="text-white hover:text-gold transition-colors"
                          >
                            {isPlaying ? (
                              <Pause className="w-5 h-5" fill="currentColor" />
                            ) : (
                              <Play className="w-5 h-5" fill="currentColor" />
                            )}
                          </button>

                          <button
                            onClick={handleVolumeToggle}
                            className="text-white hover:text-gold transition-colors"
                          >
                            {volume > 0 ? (
                              <Volume2 className="w-5 h-5" />
                            ) : (
                              <VolumeX className="w-5 h-5" />
                            )}
                          </button>

                          <span className="text-xs text-white/70 font-mono">
                            {videoRef.current
                              ? `${formatTime(videoRef.current.currentTime)} / ${formatTime(videoRef.current.duration || 0)}`
                              : '0:00 / 0:00'}
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            const video = videoRef.current;
                            if (video) {
                              if (document.fullscreenElement) {
                                document.exitFullscreen();
                              } else {
                                video.requestFullscreen();
                              }
                            }
                          }}
                          className="text-white hover:text-gold transition-colors"
                        >
                          <Maximize className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Video List Sidebar (multi-video only) */}
              {!isSingleVideo && (
                <div className="w-full md:w-72 border-t md:border-t-0 md:border-l border-border bg-surface flex-shrink-0 flex flex-col max-h-[200px] md:max-h-none">
                  {/* Video list header */}
                  <div className="px-4 py-3 border-b border-border">
                    <h4 className="text-sm font-semibold text-txt-primary">
                      {project.title}
                    </h4>
                    <p className="text-xs text-txt-muted mt-1">
                      {videos.length} 个视频片段
                    </p>
                  </div>

                  {/* Video list */}
                  <div className="flex-1 overflow-y-auto">
                    {videos.map((video, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setActiveIndex(index);
                          setIsPlaying(true);
                        }}
                        className={`w-full flex items-start gap-3 p-3 text-left transition-colors border-l-2 ${
                          activeIndex === index
                            ? 'border-l-gold bg-gold/5'
                            : 'border-l-transparent hover:bg-surface-elevated'
                        }`}
                      >
                        <div className="relative w-20 h-12 rounded-md overflow-hidden flex-shrink-0 bg-surface-primary">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                          {activeIndex === index && isPlaying && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                              <div className="flex gap-0.5">
                                <span className="w-0.5 h-3 bg-gold animate-pulse" />
                                <span className="w-0.5 h-3 bg-gold animate-pulse delay-75" />
                                <span className="w-0.5 h-3 bg-gold animate-pulse delay-150" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p
                            className={`text-sm font-medium truncate ${
                              activeIndex === index
                                ? 'text-gold'
                                : 'text-txt-primary'
                            }`}
                          >
                            {video.title}
                          </p>
                          <p className="text-xs text-txt-muted mt-0.5 line-clamp-2">
                            {video.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Tech tags */}
                  <div className="px-4 py-3 border-t border-border">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="tech-tag text-[10px] py-0.5 px-1.5">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
