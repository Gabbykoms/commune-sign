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
  const [isDragging, setIsDragging] = React.useState(false);

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
      // Draw placeholder
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Enter text to see sign language', canvas.width / 2, canvas.height / 2);
      return;
    }

    // Draw avatar placeholder (this would be replaced with actual 3D rendering)
    drawAvatarPlaceholder(ctx, text, isPlaying);
  }, [text, signLanguage, speed, size, isActive, isPlaying]);

  const drawAvatarPlaceholder = (ctx: CanvasRenderingContext2D, text: string, playing: boolean) => {
    const centerX = 100;
    const centerY = 100;
    const time = Date.now() * 0.005;
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 200, 200);
    gradient.addColorStop(0, 'rgba(15, 23, 42, 0.8)');
    gradient.addColorStop(0.5, 'rgba(30, 41, 59, 0.8)');
    gradient.addColorStop(1, 'rgba(51, 65, 85, 0.8)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 200, 200);
    
    // Avatar body with gradient
    const bodyGradient = ctx.createRadialGradient(centerX, centerY - 25, 0, centerX, centerY - 25, 45);
    bodyGradient.addColorStop(0, '#fbbf24');
    bodyGradient.addColorStop(1, '#f59e0b');
    ctx.fillStyle = bodyGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY - 25, 40, 0, 2 * Math.PI);
    ctx.fill();
    
    // Add glow effect
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 15;
    ctx.fillStyle = bodyGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY - 25, 40, 0, 2 * Math.PI);
    ctx.fill();
    ctx.shadowBlur = 0;
    
    // Face
    const faceGradient = ctx.createRadialGradient(centerX - 5, centerY - 30, 0, centerX, centerY - 25, 30);
    faceGradient.addColorStop(0, '#fef3c7');
    faceGradient.addColorStop(1, '#fbbf24');
    ctx.fillStyle = faceGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY - 25, 30, 0, 2 * Math.PI);
    ctx.fill();
    
    // Eyes with animation
    ctx.fillStyle = '#1f2937';
    const eyeOffset = playing ? Math.sin(time) * 1 : 0;
    ctx.beginPath();
    ctx.arc(centerX - 10 + eyeOffset, centerY - 30, 3, 0, 2 * Math.PI);
    ctx.arc(centerX + 10 + eyeOffset, centerY - 30, 3, 0, 2 * Math.PI);
    ctx.fill();
    
    // Eye highlights
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(centerX - 9 + eyeOffset, centerY - 31, 1, 0, 2 * Math.PI);
    ctx.arc(centerX + 9 + eyeOffset, centerY - 31, 1, 0, 2 * Math.PI);
    ctx.fill();
    
    // Smile
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(centerX, centerY - 20, 10, 0, Math.PI);
    ctx.stroke();
    
    // Arms with enhanced animation
    const armAnimation = playing ? Math.sin(time * 2) * 8 : 0;
    const armWave = playing ? Math.cos(time * 1.5) * 4 : 0;
    
    // Left arm with gradient
    const leftArmGradient = ctx.createLinearGradient(centerX - 20, centerY - 15, centerX - 40, centerY + armAnimation);
    leftArmGradient.addColorStop(0, '#fbbf24');
    leftArmGradient.addColorStop(1, '#f59e0b');
    ctx.strokeStyle = leftArmGradient;
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 5;
    
    ctx.beginPath();
    ctx.moveTo(centerX - 20, centerY - 15);
    ctx.lineTo(centerX - 40 + armWave, centerY + armAnimation);
    ctx.stroke();
    
    // Right arm with gradient
    const rightArmGradient = ctx.createLinearGradient(centerX + 20, centerY - 15, centerX + 40, centerY + armAnimation);
    rightArmGradient.addColorStop(0, '#fbbf24');
    rightArmGradient.addColorStop(1, '#f59e0b');
    ctx.strokeStyle = rightArmGradient;
    
    ctx.beginPath();
    ctx.moveTo(centerX + 20, centerY - 15);
    ctx.lineTo(centerX + 40 - armWave, centerY + armAnimation);
    ctx.stroke();
    
    ctx.shadowBlur = 0;
    
    // Hands with glow
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 8;
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(centerX - 40 + armWave, centerY + armAnimation, 8, 0, 2 * Math.PI);
    ctx.arc(centerX + 40 - armWave, centerY + armAnimation, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.shadowBlur = 0;
    
    // Language indicator
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'bold 10px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(signLanguage, centerX, centerY + 45);
    
    // Current text (truncated)
    const displayText = text.length > 15 ? text.substring(0, 15) + '...' : text;
    const textGradient = ctx.createLinearGradient(centerX - 50, centerY + 55, centerX + 50, centerY + 55);
    textGradient.addColorStop(0, '#06b6d4');
    textGradient.addColorStop(0.5, '#8b5cf6');
    textGradient.addColorStop(1, '#ec4899');
    ctx.fillStyle = textGradient;
    ctx.font = '8px Inter, sans-serif';
    ctx.fillText(displayText, centerX, centerY + 65);
  };

  const togglePlayback = () => {
    if (text.trim()) {
      setIsPlaying(!isPlaying);
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      default:
        return 'bottom-4 right-4';
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
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: opacity, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`fixed ${getPositionClasses()} z-50`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <div className="relative group">
        {/* Main Avatar Container */}
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl"
          style={{ width: `${size}px`, height: `${size}px` }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full rounded-2xl"
            style={{ width: `${size}px`, height: `${size}px` }}
          />
          
          {/* Play/Pause Button */}
          {isActive && text.trim() && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlayback}
              className="absolute top-2 right-2 p-2 bg-white/20 backdrop-blur-lg rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 border border-white/30"
            >
              {isPlaying ? <Pause size={16} className="text-white" /> : <Play size={16} className="text-white" />}
            </motion.button>
          )}
        </motion.div>

        {/* Control Panel - Shows on Hover */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-lg rounded-xl p-3 shadow-2xl border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="flex items-center space-x-2">
            {/* Position Controls */}
            <div className="flex space-x-1">
              {positions.map((pos) => (
                <button
                  key={pos.key}
                  onClick={() => onPositionChange(pos.key)}
                  className={`p-1 rounded ${
                    position === pos.key 
                      ? 'bg-cyan-500 text-white' 
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                  title={pos.label}
                >
                  <Move size={12} />
                </button>
              ))}
            </div>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
              title="Close Overlay"
            >
              <X size={12} />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FloatingAvatar;
