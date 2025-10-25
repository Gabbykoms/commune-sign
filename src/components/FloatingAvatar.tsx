import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Move, X } from 'lucide-react';

interface FloatingAvatarProps {
  text: string;
  signLanguage: 'ASL' | 'BSL' | 'AUSLAN';
  speed: number;
  size: number;
  isActive: boolean;
  position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  opacity: number;
  onClose: () => void;
  onPositionChange: (position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right') => void;
}

const FloatingAvatar: React.FC<FloatingAvatarProps> = ({
  text,
  signLanguage,
  speed,
  size,
  isActive,
  position,
  opacity,
  onClose,
  onPositionChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 200;
    canvas.height = 200;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!isActive || !text.trim()) {
      // Draw minimal placeholder
      ctx.fillStyle = 'rgba(10, 10, 10, 0.9)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Enter text to see sign language', canvas.width / 2, canvas.height / 2);
      return;
    }

    // Draw minimal avatar
    drawMinimalAvatar(ctx, text, isPlaying);
  }, [text, signLanguage, speed, size, isActive, isPlaying]);

  const drawMinimalAvatar = (ctx: CanvasRenderingContext2D, text: string, playing: boolean) => {
    const centerX = 100;
    const centerY = 100;
    const time = Date.now() * 0.003;
    
    // Minimal background
    ctx.fillStyle = 'rgba(12, 12, 12, 0.95)';
    ctx.fillRect(0, 0, 200, 200);
    
    // Add subtle border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, 200, 200);
    
    // Minimal avatar body
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.beginPath();
    ctx.arc(centerX, centerY - 20, 30, 0, 2 * Math.PI);
    ctx.fill();
    
    // Face
    ctx.fillStyle = 'rgba(10, 10, 10, 0.9)';
    ctx.beginPath();
    ctx.arc(centerX, centerY - 20, 25, 0, 2 * Math.PI);
    ctx.fill();
    
    // Eyes - minimal
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    const eyeOffset = playing ? Math.sin(time) * 1 : 0;
    ctx.beginPath();
    ctx.arc(centerX - 8 + eyeOffset, centerY - 25, 2, 0, 2 * Math.PI);
    ctx.arc(centerX + 8 + eyeOffset, centerY - 25, 2, 0, 2 * Math.PI);
    ctx.fill();
    
    // Minimal smile
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(centerX, centerY - 15, 8, 0, Math.PI);
    ctx.stroke();
    
    // Arms - very subtle animation
    const armAnimation = playing ? Math.sin(time * 1.5) * 5 : 0;
    
    // Left arm
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(centerX - 15, centerY - 10);
    ctx.lineTo(centerX - 35, centerY + armAnimation);
    ctx.stroke();
    
    // Right arm
    ctx.beginPath();
    ctx.moveTo(centerX + 15, centerY - 10);
    ctx.lineTo(centerX + 35, centerY + armAnimation);
    ctx.stroke();
    
    // Hands
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.beginPath();
    ctx.arc(centerX - 35, centerY + armAnimation, 4, 0, 2 * Math.PI);
    ctx.arc(centerX + 35, centerY + armAnimation, 4, 0, 2 * Math.PI);
    ctx.fill();
    
    // Language indicator - minimal
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(signLanguage, centerX, centerY + 40);
    
    // Text - minimal
    const displayText = text.length > 20 ? text.substring(0, 20) + '...' : text;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '8px Inter, sans-serif';
    ctx.fillText(displayText, centerX, centerY + 55);
  };

  const togglePlayback = () => {
    if (text.trim()) {
      setIsPlaying(!isPlaying);
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-8 left-8';
      case 'bottom-right':
        return 'bottom-8 right-8';
      case 'top-left':
        return 'top-8 left-8';
      case 'top-right':
        return 'top-8 right-8';
      default:
        return 'bottom-8 right-8';
    }
  };

  // Auto-hide when no text
  if (!text.trim() || !isActive) {
    return null;
  }

  const positions = [
    { key: 'bottom-left', label: 'Bottom Left' },
    { key: 'bottom-right', label: 'Bottom Right' },
    { key: 'top-left', label: 'Top Left' },
    { key: 'top-right', label: 'Top Right' },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: opacity, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`fixed ${getPositionClasses()} z-50`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <div className="relative group">
        {/* Minimal Avatar Container */}
        <motion.div
          className="relative overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg"
          style={{ width: `${size}px`, height: `${size}px` }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ width: `${size}px`, height: `${size}px` }}
          />
          
          {/* Minimal Play/Pause Button */}
          {isActive && text.trim() && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlayback}
              className="absolute top-2 right-2 p-1 bg-white/10 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all duration-300"
            >
              {isPlaying ? <Pause size={12} className="text-white" /> : <Play size={12} className="text-white" />}
            </motion.button>
          )}
        </motion.div>

        {/* Minimal Control Panel - Shows on Hover */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-sm p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white"
        >
          <div className="flex items-center space-x-1">
            {/* Position Controls */}
            <div className="flex space-x-1">
              {positions.map((pos) => (
                <button
                  key={pos.key}
                  onClick={() => onPositionChange(pos.key)}
                  className={`p-1 rounded text-xs ${
                    position === pos.key 
                      ? 'bg-gray-800 text-white' 
                      : 'text-white hover:bg-white/10'
                  }`}
                  title={pos.label}
                >
                  <Move size={10} />
                </button>
              ))}
            </div>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1 rounded text-white hover:bg-white/10 transition-colors"
              title="Close Overlay"
            >
              <X size={10} />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FloatingAvatar;