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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className={`relative bg-black rounded-3xl overflow-hidden shadow-2xl ${
        isOverlayMode ? 'w-full h-96' : 'w-full max-w-4xl mx-auto h-96'
      }`}
    >
      {/* Video Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Simulated video content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-32 h-32 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center"
            >
              <Play size={48} className="text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2">Demo Video Content</h3>
            <p className="text-gray-300">Your favorite movie or show playing here</p>
            <p className="text-sm text-gray-400 mt-2">
              {isOverlayMode ? 'Sign language avatar appears in the corner' : 'Switch to overlay mode to see the avatar'}
            </p>
          </div>
        </div>

        {/* Simulated video controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className="p-3 bg-white/20 backdrop-blur-lg rounded-full hover:bg-white/30 transition-all duration-300"
              >
                {isPlaying ? <Pause size={24} className="text-white" /> : <Play size={24} className="text-white" />}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMute}
                className="p-3 bg-white/20 backdrop-blur-lg rounded-full hover:bg-white/30 transition-all duration-300"
              >
                {isMuted ? <VolumeX size={24} className="text-white" /> : <Volume2 size={24} className="text-white" />}
              </motion.button>
              
              <div className="w-32 h-1 bg-white/30 rounded-full">
                <div className="w-1/3 h-full bg-white rounded-full"></div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-white text-sm">2:45 / 10:30</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleFullscreen}
                className="p-3 bg-white/20 backdrop-blur-lg rounded-full hover:bg-white/30 transition-all duration-300"
              >
                <Maximize2 size={24} className="text-white" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Overlay mode indicator */}
        {isOverlayMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur-lg rounded-full px-4 py-2 flex items-center"
          >
            <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
            <span className="text-white text-sm font-medium">Overlay Mode Active</span>
          </motion.div>
        )}
      </div>

      {/* Floating elements to simulate video content */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default DemoVideoPlayer;
