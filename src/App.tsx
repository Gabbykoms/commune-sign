import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import FloatingAvatar from './components/FloatingAvatar';
import DemoVideoPlayer from './components/DemoVideoPlayer';
import StardustVortex from './components/StardustVortex';
import CharacterSelector from './components/CharacterSelector';
import { Character } from './data/characters';

interface AppState {
  isActive: boolean;
  isMuted: boolean;
  isVisible: boolean;
  currentText: string;
  signLanguage: 'ASL' | 'BSL' | 'AUSLAN';
  avatarSpeed: number;
  avatarSize: number;
  overlayPosition: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  overlayOpacity: number;
  showSettings: boolean;
  selectedCharacter: Character;
}

function App() {
  const [state, setState] = useState<AppState>({
    isActive: false,
    isMuted: false,
    isVisible: true,
    currentText: '',
    signLanguage: 'ASL',
    avatarSpeed: 1,
    avatarSize: 100,
    overlayPosition: 'bottom-right',
    overlayOpacity: 0.9,
    showSettings: false,
    selectedCharacter: 'luna',
  });

  const toggleActive = () => setState(prev => ({ ...prev, isActive: !prev.isActive }));
  const toggleMuted = () => setState(prev => ({ ...prev, isMuted: !prev.isMuted }));
  const toggleVisible = () => setState(prev => ({ ...prev, isVisible: !prev.isVisible }));
  const toggleSettings = () => setState(prev => ({ ...prev, showSettings: !prev.showSettings }));

  const updateText = (text: string) => setState(prev => ({ ...prev, currentText: text }));

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <StardustVortex />
      {/* Minimal Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950 to-black"></div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}></div>
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Minimal Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="p-8"
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <motion.h1 
              className="text-2xl font-light text-neutral-200 tracking-wide"
              whileHover={{ opacity: 0.7 }}
            >
              commune sign
            </motion.h1>
            
            <div className="flex items-center space-x-4">
              {/* Minimal Status Indicators */}
              <motion.div
                className={`w-2 h-2 rounded-full ${
                  state.isActive ? 'bg-green-400' : 'bg-gray-300'
                }`}
                animate={state.isActive ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleSettings}
                className="p-2 text-neutral-400 hover:text-neutral-200 transition-colors duration-300"
              >
                <Settings size={20} />
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Main Content - Video and Avatar Space */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-6xl">
            {/* Video Player */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mb-8"
            >
              <DemoVideoPlayer isOverlayMode={true} />
            </motion.div>

            {/* Minimal Text Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <input
                  type="text"
                  value={state.currentText}
                  onChange={(e) => updateText(e.target.value)}
                  placeholder="Enter text for sign language interpretation..."
                  className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-none focus:outline-none focus:border-white/30 transition-all duration-500 text-neutral-100 placeholder-white/40 text-lg font-light"
                />
                
                {state.currentText && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </motion.div>
                )}
              </div>
              
              {/* Character Selector */}
              <div className="mt-8">
                <CharacterSelector
                  selectedCharacter={state.selectedCharacter}
                  onCharacterChange={(character) =>
                    setState((prev) => ({ ...prev, selectedCharacter: character }))
                  }
                />
              </div>

              {/* Minimal Controls */}
              <div className="flex items-center justify-center space-x-8 mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleActive}
                  className={`px-6 py-2 text-sm font-light transition-all duration-300 ${
                    state.isActive 
                      ? 'text-neutral-200 border-b border-neutral-200' 
                      : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  {state.isActive ? 'Active' : 'Inactive'}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleMuted}
                  className={`px-6 py-2 text-sm font-light transition-all duration-300 ${
                    state.isMuted 
                      ? 'text-neutral-200 border-b border-neutral-200' 
                      : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  {state.isMuted ? 'Muted' : 'Sound'}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleVisible}
                  className={`px-6 py-2 text-sm font-light transition-all duration-300 ${
                    state.isVisible 
                      ? 'text-neutral-200 border-b border-neutral-200' 
                      : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  {state.isVisible ? 'Visible' : 'Hidden'}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Minimal Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="p-8"
        >
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm text-neutral-500 font-light">
              Real-time sign language interpretation for video content
            </p>
          </div>
        </motion.footer>

        {/* Settings Panel */}
        {state.showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-8"
            onClick={toggleSettings}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-neutral-900 text-neutral-200 p-8 max-w-md w-full rounded-none shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-light text-gray-800 mb-6">Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-neutral-400 mb-2">Sign Language</label>
                  <select
                    value={state.signLanguage}
                    onChange={(e) => setState(prev => ({ ...prev, signLanguage: e.target.value as any }))}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 text-neutral-100 focus:outline-none focus:border-white/30 transition-colors"
                  >
                    <option value="ASL">American Sign Language</option>
                    <option value="BSL">British Sign Language</option>
                    <option value="AUSLAN">Australian Sign Language</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-neutral-400 mb-2">Avatar Position</label>
                  <select
                    value={state.overlayPosition}
                    onChange={(e) => setState(prev => ({ ...prev, overlayPosition: e.target.value as any }))}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 text-neutral-100 focus:outline-none focus:border-white/30 transition-colors"
                  >
                    <option value="bottom-right">Bottom Right</option>
                    <option value="bottom-left">Bottom Left</option>
                    <option value="top-right">Top Right</option>
                    <option value="top-left">Top Left</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-neutral-400 mb-2">Opacity: {Math.round(state.overlayOpacity * 100)}%</label>
                  <input
                    type="range"
                    min="0.3"
                    max="1"
                    step="0.1"
                    value={state.overlayOpacity}
                    onChange={(e) => setState(prev => ({ ...prev, overlayOpacity: parseFloat(e.target.value) }))}
                    className="w-full accent-neutral-200"
                  />
                </div>
              </div>
              
              <button
                onClick={toggleSettings}
                className="mt-8 w-full py-2 text-sm font-light text-gray-600 hover:text-gray-800 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Floating Avatar */}
        {state.isVisible && state.currentText && (
          <FloatingAvatar
            text={state.currentText}
            signLanguage={state.signLanguage}
            speed={state.avatarSpeed}
            size={Math.max(120, state.avatarSize * 1.2)}
            isActive={state.isActive}
            position={state.overlayPosition}
            opacity={state.overlayOpacity}
            character={state.selectedCharacter}
            onClose={() => setState(prev => ({ ...prev, isVisible: false }))}
            onPositionChange={(position) => setState(prev => ({ ...prev, overlayPosition: position }))}
          />
        )}
      </div>
    </div>
  );
}

export default App;