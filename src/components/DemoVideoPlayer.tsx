import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

interface DemoVideoPlayerProps {
  isOverlayMode: boolean;
}

const DemoVideoPlayer: React.FC<DemoVideoPlayerProps> = ({ isOverlayMode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="relative bg-gray-900 rounded-sm overflow-hidden shadow-lg"
    >
      {/* Minimal Video Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        {/* Minimal video content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-24 h-24 bg-white/10 rounded-full mx-auto mb-6 flex items-center justify-center backdrop-blur-sm"
            >
              <Play size={32} className="text-white/80" />
            </motion.div>
            <h3 className="text-xl font-light text-white/90 mb-2">Video Content</h3>
            <p className="text-gray-400 text-sm font-light">Your content plays here</p>
            <p className="text-gray-500 text-xs mt-2 font-light">
              Sign language avatar appears in the corner when text is entered
            </p>
          </div>
        </div>

        {/* Minimal video controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePlay}
                className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300"
              >
                {isPlaying ? <Pause size={20} className="text-white" /> : <Play size={20} className="text-white" />}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMute}
                className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300"
              >
                {isMuted ? <VolumeX size={20} className="text-white" /> : <Volume2 size={20} className="text-white" />}
              </motion.button>
              
              <div className="w-24 h-0.5 bg-white/30 rounded-full">
                <div className="w-1/3 h-full bg-white rounded-full"></div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-white/70 text-sm font-light">2:45 / 10:30</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleFullscreen}
                className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300"
              >
                <Maximize2 size={20} className="text-white" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Minimal overlay indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-sm px-3 py-1 flex items-center"
        >
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 animate-pulse"></div>
          <span className="text-gray-700 text-xs font-light">Overlay Ready</span>
        </motion.div>
      </div>

      {/* Subtle floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${30 + i * 20}%`,
              top: `${40 + i * 15}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 1,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default DemoVideoPlayer;