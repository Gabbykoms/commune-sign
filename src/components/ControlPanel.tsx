import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Zap, Maximize2, Globe, Palette, Monitor, Eye } from 'lucide-react';

interface ControlPanelProps {
  signLanguage: 'ASL' | 'BSL' | 'AUSLAN';
  speed: number;
  size: number;
  overlayMode: boolean;
  overlayPosition: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  overlayOpacity: number;
  onSignLanguageChange: (lang: 'ASL' | 'BSL' | 'AUSLAN') => void;
  onSpeedChange: (speed: number) => void;
  onSizeChange: (size: number) => void;
  onOverlayPositionChange: (position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right') => void;
  onOverlayOpacityChange: (opacity: number) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  signLanguage,
  speed,
  size,
  overlayMode,
  overlayPosition,
  overlayOpacity,
  onSignLanguageChange,
  onSpeedChange,
  onSizeChange,
  onOverlayPositionChange,
  onOverlayOpacityChange,
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="card-premium"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Settings size={28} className="text-cyan-400 mr-4 glow-cyan" />
          </motion.div>
          <h3 className="text-2xl font-bold text-white">Controls</h3>
        </div>
        
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Palette size={24} className="text-purple-400 glow-purple" />
        </motion.div>
      </div>

      {/* Sign Language Selection */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        className="mb-8"
      >
        <label className="block text-lg font-semibold text-white mb-4 flex items-center">
          <Globe size={20} className="text-cyan-400 mr-3 glow-cyan" />
          Sign Language
        </label>
        <div className="relative">
          <select
            value={signLanguage}
            onChange={(e) => onSignLanguageChange(e.target.value as 'ASL' | 'BSL' | 'AUSLAN')}
            className="input-field appearance-none pr-10 cursor-pointer"
          >
            <option value="ASL">American Sign Language (ASL)</option>
            <option value="BSL">British Sign Language (BSL)</option>
            <option value="AUSLAN">Australian Sign Language (AUSLAN)</option>
          </select>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <motion.div
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Globe size={20} className="text-cyan-400" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Speed Control */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <label className="text-lg font-semibold text-white flex items-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Zap size={20} className="text-purple-400 mr-3 glow-purple" />
            </motion.div>
            Speed
          </label>
          <motion.span 
            animate={{ scale: speed > 1 ? 1.1 : 1 }}
            className="text-lg font-bold text-cyan-400 bg-white/10 px-4 py-2 rounded-full backdrop-blur-lg"
          >
            {speed}x
          </motion.span>
        </div>
        
        <div className="relative">
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={speed}
            onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
            className="w-full h-3 bg-white/10 rounded-2xl appearance-none cursor-pointer slider-modern"
            style={{
              background: `linear-gradient(to right, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)`
            }}
          />
          <div className="flex justify-between text-sm text-white/60 mt-3">
            <span className="flex items-center">
              <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></div>
              Slow
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
              Normal
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-pink-400 rounded-full mr-2"></div>
              Fast
            </span>
          </div>
        </div>
      </motion.div>

      {/* Size Control */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <label className="text-lg font-semibold text-white flex items-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Maximize2 size={20} className="text-emerald-400 mr-3 glow-blue" />
            </motion.div>
            Size
          </label>
          <motion.span 
            animate={{ scale: size > 100 ? 1.1 : 1 }}
            className="text-lg font-bold text-emerald-400 bg-white/10 px-4 py-2 rounded-full backdrop-blur-lg"
          >
            {size}%
          </motion.span>
        </div>
        
        <div className="relative">
          <input
            type="range"
            min="50"
            max="200"
            step="10"
            value={size}
            onChange={(e) => onSizeChange(parseInt(e.target.value))}
            className="w-full h-3 bg-white/10 rounded-2xl appearance-none cursor-pointer slider-modern"
            style={{
              background: `linear-gradient(to right, #10b981 0%, #06b6d4 50%, #8b5cf6 100%)`
            }}
          />
          <div className="flex justify-between text-sm text-white/60 mt-3">
            <span className="flex items-center">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
              Small
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></div>
              Medium
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
              Large
            </span>
          </div>
        </div>
      </motion.div>

      {/* Overlay Controls - Only show when in overlay mode */}
      {overlayMode && (
        <>
          {/* Overlay Position Control */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <label className="text-lg font-semibold text-white flex items-center">
                <motion.div
                  animate={{ rotate: [0, 90, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Monitor size={20} className="text-emerald-400 mr-3 glow-blue" />
                </motion.div>
                Overlay Position
              </label>
              <motion.span 
                animate={{ scale: 1.05 }}
                className="text-lg font-bold text-emerald-400 bg-white/10 px-4 py-2 rounded-full backdrop-blur-lg"
              >
                {overlayPosition.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </motion.span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'top-left', label: 'Top Left' },
                { key: 'top-right', label: 'Top Right' },
                { key: 'bottom-left', label: 'Bottom Left' },
                { key: 'bottom-right', label: 'Bottom Right' },
              ].map((pos) => (
                <motion.button
                  key={pos.key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onOverlayPositionChange(pos.key as any)}
                  className={`p-4 rounded-2xl transition-all duration-300 ${
                    overlayPosition === pos.key
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  <div className="text-sm font-semibold">{pos.label}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Overlay Opacity Control */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <label className="text-lg font-semibold text-white flex items-center">
                <motion.div
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Eye size={20} className="text-cyan-400 mr-3 glow-cyan" />
                </motion.div>
                Overlay Opacity
              </label>
              <motion.span 
                animate={{ scale: overlayOpacity > 0.8 ? 1.1 : 1 }}
                className="text-lg font-bold text-cyan-400 bg-white/10 px-4 py-2 rounded-full backdrop-blur-lg"
              >
                {Math.round(overlayOpacity * 100)}%
              </motion.span>
            </div>
            
            <div className="relative">
              <input
                type="range"
                min="0.3"
                max="1"
                step="0.1"
                value={overlayOpacity}
                onChange={(e) => onOverlayOpacityChange(parseFloat(e.target.value))}
                className="w-full h-3 bg-white/10 rounded-2xl appearance-none cursor-pointer slider-modern"
                style={{
                  background: `linear-gradient(to right, #10b981 0%, #06b6d4 50%, #8b5cf6 100%)`
                }}
              />
              <div className="flex justify-between text-sm text-white/60 mt-3">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                  Transparent
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></div>
                  Semi-Transparent
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                  Opaque
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default ControlPanel; 