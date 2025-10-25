import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hand, Play, Pause } from 'lucide-react';

interface SignLanguageAvatarProps {
  text: string;
  signLanguage: 'ASL' | 'BSL' | 'AUSLAN';
  speed: number;
  size: number;
  isActive: boolean;
}

const SignLanguageAvatar: React.FC<SignLanguageAvatarProps> = ({
  text,
  signLanguage,
  speed,
  size,
  isActive,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 400;
    canvas.height = 400;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!isActive || !text.trim()) {
      // Draw placeholder
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#9ca3af';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Enter text to see sign language', canvas.width / 2, canvas.height / 2);
      return;
    }

    // Draw avatar placeholder (this would be replaced with actual 3D rendering)
    drawAvatarPlaceholder(ctx, text, isPlaying);
  }, [text, signLanguage, speed, size, isActive, isPlaying]);

  const drawAvatarPlaceholder = (ctx: CanvasRenderingContext2D, text: string, playing: boolean) => {
    const centerX = 200;
    const centerY = 200;
    const time = Date.now() * 0.005;
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 400, 400);
    gradient.addColorStop(0, '#0f172a');
    gradient.addColorStop(0.5, '#1e293b');
    gradient.addColorStop(1, '#334155');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 400);
    
    // Add subtle pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 400, Math.random() * 400, Math.random() * 3, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    // Avatar body with gradient
    const bodyGradient = ctx.createRadialGradient(centerX, centerY - 50, 0, centerX, centerY - 50, 90);
    bodyGradient.addColorStop(0, '#fbbf24');
    bodyGradient.addColorStop(1, '#f59e0b');
    ctx.fillStyle = bodyGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY - 50, 80, 0, 2 * Math.PI);
    ctx.fill();
    
    // Add glow effect
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 20;
    ctx.fillStyle = bodyGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY - 50, 80, 0, 2 * Math.PI);
    ctx.fill();
    ctx.shadowBlur = 0;
    
    // Face
    const faceGradient = ctx.createRadialGradient(centerX - 10, centerY - 60, 0, centerX, centerY - 50, 60);
    faceGradient.addColorStop(0, '#fef3c7');
    faceGradient.addColorStop(1, '#fbbf24');
    ctx.fillStyle = faceGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY - 50, 60, 0, 2 * Math.PI);
    ctx.fill();
    
    // Eyes with animation
    ctx.fillStyle = '#1f2937';
    const eyeOffset = playing ? Math.sin(time) * 2 : 0;
    ctx.beginPath();
    ctx.arc(centerX - 20 + eyeOffset, centerY - 60, 6, 0, 2 * Math.PI);
    ctx.arc(centerX + 20 + eyeOffset, centerY - 60, 6, 0, 2 * Math.PI);
    ctx.fill();
    
    // Eye highlights
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(centerX - 18 + eyeOffset, centerY - 62, 2, 0, 2 * Math.PI);
    ctx.arc(centerX + 18 + eyeOffset, centerY - 62, 2, 0, 2 * Math.PI);
    ctx.fill();
    
    // Smile
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(centerX, centerY - 40, 20, 0, Math.PI);
    ctx.stroke();
    
    // Arms with enhanced animation
    const armAnimation = playing ? Math.sin(time * 2) * 15 : 0;
    const armWave = playing ? Math.cos(time * 1.5) * 8 : 0;
    
    // Left arm with gradient
    const leftArmGradient = ctx.createLinearGradient(centerX - 40, centerY - 30, centerX - 80, centerY + armAnimation);
    leftArmGradient.addColorStop(0, '#fbbf24');
    leftArmGradient.addColorStop(1, '#f59e0b');
    ctx.strokeStyle = leftArmGradient;
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 10;
    
    ctx.beginPath();
    ctx.moveTo(centerX - 40, centerY - 30);
    ctx.lineTo(centerX - 80 + armWave, centerY + armAnimation);
    ctx.stroke();
    
    // Right arm with gradient
    const rightArmGradient = ctx.createLinearGradient(centerX + 40, centerY - 30, centerX + 80, centerY + armAnimation);
    rightArmGradient.addColorStop(0, '#fbbf24');
    rightArmGradient.addColorStop(1, '#f59e0b');
    ctx.strokeStyle = rightArmGradient;
    
    ctx.beginPath();
    ctx.moveTo(centerX + 40, centerY - 30);
    ctx.lineTo(centerX + 80 - armWave, centerY + armAnimation);
    ctx.stroke();
    
    ctx.shadowBlur = 0;
    
    // Hands with glow
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(centerX - 80 + armWave, centerY + armAnimation, 15, 0, 2 * Math.PI);
    ctx.arc(centerX + 80 - armWave, centerY + armAnimation, 15, 0, 2 * Math.PI);
    ctx.fill();
    ctx.shadowBlur = 0;
    
    // Language indicator with modern styling
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'bold 16px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Signing: ${signLanguage}`, centerX, centerY + 90);
    
    // Current text with gradient
    const displayText = text.length > 30 ? text.substring(0, 30) + '...' : text;
    const textGradient = ctx.createLinearGradient(centerX - 100, centerY + 100, centerX + 100, centerY + 100);
    textGradient.addColorStop(0, '#06b6d4');
    textGradient.addColorStop(0.5, '#8b5cf6');
    textGradient.addColorStop(1, '#ec4899');
    ctx.fillStyle = textGradient;
    ctx.font = '14px Inter, sans-serif';
    ctx.fillText(displayText, centerX, centerY + 115);
    
    // Add floating particles around avatar
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let i = 0; i < 8; i++) {
      const angle = (time + i * 0.8) % (Math.PI * 2);
      const radius = 120 + Math.sin(time + i) * 20;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY - 50 + Math.sin(angle) * radius;
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  const togglePlayback = () => {
    if (text.trim()) {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl"
        style={{
          width: `${size}%`,
          height: 'auto',
          maxWidth: '400px',
          maxHeight: '400px',
        }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-auto rounded-3xl"
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: '400px',
            maxHeight: '400px',
          }}
        />
        
        {/* Animated border effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
      </motion.div>
      
      {isActive && text.trim() && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlayback}
          className="absolute top-6 right-6 p-4 bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 border border-white/30"
        >
          <motion.div
            animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            {isPlaying ? <Pause size={24} className="text-white" /> : <Play size={24} className="text-white" />}
          </motion.div>
        </motion.button>
      )}
      
      {!isActive && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-3xl"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Hand size={48} className="mx-auto mb-4 text-white/60" />
            </motion.div>
            <p className="text-white/80 text-lg font-medium mb-2">Extension Inactive</p>
            <p className="text-white/50 text-sm">Activate to see sign language</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SignLanguageAvatar; 