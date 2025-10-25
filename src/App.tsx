import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Volume2, VolumeX, Hand, Eye, EyeOff, Sparkles } from 'lucide-react';
import SignLanguageAvatar from './components/SignLanguageAvatar';
import FloatingAvatar from './components/FloatingAvatar';
import DemoVideoPlayer from './components/DemoVideoPlayer';
import ControlPanel from './components/ControlPanel';
import TextInput from './components/TextInput';
import SettingsPanel from './components/SettingsPanel';
import Footer from './components/Footer';

interface AppState {
  isActive: boolean;
  isMuted: boolean;
  isVisible: boolean;
  currentText: string;
  signLanguage: 'ASL' | 'BSL' | 'AUSLAN';
  avatarSpeed: number;
  avatarSize: number;
  showSettings: boolean;
  overlayMode: boolean;
  overlayPosition: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  overlayOpacity: number;
  autoDetectVideo: boolean;
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
    showSettings: false,
    overlayMode: false,
    overlayPosition: 'bottom-right',
    overlayOpacity: 0.9,
    autoDetectVideo: true,
  });

  const toggleActive = () => setState(prev => ({ ...prev, isActive: !prev.isActive }));
  const toggleMuted = () => setState(prev => ({ ...prev, isMuted: !prev.isMuted }));
  const toggleVisible = () => setState(prev => ({ ...prev, isVisible: !prev.isVisible }));
  const toggleSettings = () => setState(prev => ({ ...prev, showSettings: !prev.showSettings }));
  const toggleOverlayMode = () => setState(prev => ({ ...prev, overlayMode: !prev.overlayMode }));

  const updateText = (text: string) => setState(prev => ({ ...prev, currentText: text }));

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-500/30 to-blue-600/30 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/30 to-pink-600/30 rounded-full mix-blend-multiply filter blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-br from-indigo-500/30 to-purple-600/30 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-emerald-500/30 to-cyan-600/30 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-particle-float"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${10 + Math.random() * 20}s`
              }}
            />
          ))}
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="flex-1">
          <div className="container mx-auto px-6 py-12">
            {/* Header */}
            <motion.header 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-20"
            >
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex items-center justify-center mb-6"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="text-cyan-400 mr-4 glow-cyan" size={40} />
                </motion.div>
                <h1 className="text-6xl md:text-7xl font-black text-white mb-0 tracking-tight">
                  <span className="gradient-text">Commune</span>
                  <span className="text-white"> Sign</span>
                </h1>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="text-purple-400 ml-4 glow-purple" size={40} />
                </motion.div>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light"
              >
                Real-time sign language overlay for any video content.
                <br />
                <span className="gradient-text-secondary font-semibold text-3xl md:text-4xl">
                  Your favorite actor signing in the corner of every video.
                </span>
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="mt-8"
              >
                <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse mr-3"></div>
                  <span className="text-white/80 font-medium">System Ready</span>
                </div>
              </motion.div>
            </motion.header>

            {/* Main Content */}
            {state.overlayMode ? (
              /* Overlay Mode Layout */
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="mb-8"
                >
                  <DemoVideoPlayer isOverlayMode={true} />
                </motion.div>
                
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {/* Left Panel - Controls and Input */}
                  <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-8"
                  >
                    {/* Status Card */}
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.6 }}
                      className="card-premium"
                    >
                      <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-white">System Status</h2>
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 90 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={toggleSettings}
                          className="p-4 text-white/70 hover:text-white transition-all duration-300 bg-white/10 hover:bg-white/20 rounded-2xl backdrop-blur-lg"
                        >
                          <Settings size={28} />
                        </motion.button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <motion.button
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={toggleOverlayMode}
                          className={`p-8 rounded-3xl transition-all duration-500 ${
                            state.overlayMode 
                              ? 'status-visible glow-blue' 
                              : 'status-hidden'
                          }`}
                        >
                          <motion.div
                            animate={state.overlayMode ? { scale: [1, 1.1, 1] } : {}}
                            transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
                          >
                            <Eye size={32} className="mx-auto mb-4" />
                          </motion.div>
                          <div className="text-sm font-semibold">
                            {state.overlayMode ? 'Overlay Mode' : 'Desktop Mode'}
                          </div>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={toggleActive}
                          className={`p-8 rounded-3xl transition-all duration-500 ${
                            state.isActive 
                              ? 'status-active glow-cyan' 
                              : 'status-inactive'
                          }`}
                        >
                          <motion.div
                            animate={state.isActive ? { rotate: [0, 10, -10, 0] } : {}}
                            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                          >
                            <Hand size={32} className="mx-auto mb-4" />
                          </motion.div>
                          <div className="text-sm font-semibold">
                            {state.isActive ? 'Active' : 'Inactive'}
                          </div>
                        </motion.button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <motion.button
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={toggleMuted}
                          className={`p-8 rounded-3xl transition-all duration-500 ${
                            state.isMuted 
                              ? 'status-muted glow-purple' 
                              : 'status-unmuted'
                          }`}
                        >
                          <motion.div
                            animate={state.isMuted ? { scale: [1, 1.1, 1] } : {}}
                            transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 1.5 }}
                          >
                            {state.isMuted ? <VolumeX size={32} className="mx-auto mb-4" /> : <Volume2 size={32} className="mx-auto mb-4" />}
                          </motion.div>
                          <div className="text-sm font-semibold">
                            {state.isMuted ? 'Muted' : 'Sound'}
                          </div>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={toggleVisible}
                          className={`p-8 rounded-3xl transition-all duration-500 ${
                            state.isVisible 
                              ? 'status-visible glow-blue' 
                              : 'status-hidden'
                          }`}
                        >
                          <motion.div
                            animate={state.isVisible ? { opacity: [1, 0.5, 1] } : {}}
                            transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
                          >
                            {state.isVisible ? <Eye size={32} className="mx-auto mb-4" /> : <EyeOff size={32} className="mx-auto mb-4" />}
                          </motion.div>
                          <div className="text-sm font-semibold">
                            {state.isVisible ? 'Visible' : 'Hidden'}
                          </div>
                        </motion.button>
                      </div>
                    </motion.div>

                    {/* Text Input */}
                    <TextInput 
                      value={state.currentText}
                      onChange={updateText}
                      placeholder="Enter text to convert to sign language..."
                    />
                  </motion.div>

                  {/* Right Panel - Controls */}
                  <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-start justify-center"
                  >
                    <ControlPanel 
                      signLanguage={state.signLanguage}
                      speed={state.avatarSpeed}
                      size={state.avatarSize}
                      overlayMode={state.overlayMode}
                      overlayPosition={state.overlayPosition}
                      overlayOpacity={state.overlayOpacity}
                      onSignLanguageChange={(lang) => setState(prev => ({ ...prev, signLanguage: lang }))}
                      onSpeedChange={(speed) => setState(prev => ({ ...prev, avatarSpeed: speed }))}
                      onSizeChange={(size) => setState(prev => ({ ...prev, avatarSize: size }))}
                      onOverlayPositionChange={(position) => setState(prev => ({ ...prev, overlayPosition: position }))}
                      onOverlayOpacityChange={(opacity) => setState(prev => ({ ...prev, overlayOpacity: opacity }))}
                    />
                  </motion.div>
                </div>
              </div>
            ) : (
              /* Desktop Mode Layout */
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 max-w-7xl mx-auto">
                {/* Left Panel - Controls and Input */}
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-8"
                >
                  {/* Status Card */}
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="card-premium"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-3xl font-bold text-white">System Status</h2>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleSettings}
                        className="p-4 text-white/70 hover:text-white transition-all duration-300 bg-white/10 hover:bg-white/20 rounded-2xl backdrop-blur-lg"
                      >
                        <Settings size={28} />
                      </motion.button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleOverlayMode}
                        className={`p-8 rounded-3xl transition-all duration-500 ${
                          state.overlayMode 
                            ? 'status-visible glow-blue' 
                            : 'status-hidden'
                        }`}
                      >
                        <motion.div
                          animate={state.overlayMode ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
                        >
                          <Eye size={32} className="mx-auto mb-4" />
                        </motion.div>
                        <div className="text-sm font-semibold">
                          {state.overlayMode ? 'Overlay Mode' : 'Desktop Mode'}
                        </div>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleActive}
                        className={`p-8 rounded-3xl transition-all duration-500 ${
                          state.isActive 
                            ? 'status-active glow-cyan' 
                            : 'status-inactive'
                        }`}
                      >
                        <motion.div
                          animate={state.isActive ? { rotate: [0, 10, -10, 0] } : {}}
                          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                        >
                          <Hand size={32} className="mx-auto mb-4" />
                        </motion.div>
                        <div className="text-sm font-semibold">
                          {state.isActive ? 'Active' : 'Inactive'}
                        </div>
                      </motion.button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleMuted}
                        className={`p-8 rounded-3xl transition-all duration-500 ${
                          state.isMuted 
                            ? 'status-muted glow-purple' 
                            : 'status-unmuted'
                        }`}
                      >
                        <motion.div
                          animate={state.isMuted ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 1.5 }}
                        >
                          {state.isMuted ? <VolumeX size={32} className="mx-auto mb-4" /> : <Volume2 size={32} className="mx-auto mb-4" />}
                        </motion.div>
                        <div className="text-sm font-semibold">
                          {state.isMuted ? 'Muted' : 'Sound'}
                        </div>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleVisible}
                        className={`p-8 rounded-3xl transition-all duration-500 ${
                          state.isVisible 
                            ? 'status-visible glow-blue' 
                            : 'status-hidden'
                        }`}
                      >
                        <motion.div
                          animate={state.isVisible ? { opacity: [1, 0.5, 1] } : {}}
                          transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
                        >
                          {state.isVisible ? <Eye size={32} className="mx-auto mb-4" /> : <EyeOff size={32} className="mx-auto mb-4" />}
                        </motion.div>
                        <div className="text-sm font-semibold">
                          {state.isVisible ? 'Visible' : 'Hidden'}
                        </div>
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Text Input */}
                  <TextInput 
                    value={state.currentText}
                    onChange={updateText}
                    placeholder="Enter text to convert to sign language..."
                  />

                  {/* Control Panel */}
                  <ControlPanel 
                    signLanguage={state.signLanguage}
                    speed={state.avatarSpeed}
                    size={state.avatarSize}
                    overlayMode={state.overlayMode}
                    overlayPosition={state.overlayPosition}
                    overlayOpacity={state.overlayOpacity}
                    onSignLanguageChange={(lang) => setState(prev => ({ ...prev, signLanguage: lang }))}
                    onSpeedChange={(speed) => setState(prev => ({ ...prev, avatarSpeed: speed }))}
                    onSizeChange={(size) => setState(prev => ({ ...prev, avatarSize: size }))}
                    onOverlayPositionChange={(position) => setState(prev => ({ ...prev, overlayPosition: position }))}
                    onOverlayOpacityChange={(opacity) => setState(prev => ({ ...prev, overlayOpacity: opacity }))}
                  />
                </motion.div>

                {/* Right Panel - Sign Language Avatar */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="flex items-center justify-center"
                >
                  <motion.div 
                    className="card-premium w-full max-w-lg"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-center mb-8">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="mr-4"
                      >
                        <Hand className="text-cyan-400 glow-cyan" size={32} />
                      </motion.div>
                      <h2 className="text-3xl font-bold text-white text-center">
                        Sign Language Avatar
                      </h2>
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="ml-4"
                      >
                        <Hand className="text-purple-400 glow-purple" size={32} />
                      </motion.div>
                    </div>
                    
                    {state.isVisible ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <SignLanguageAvatar 
                          text={state.currentText}
                          signLanguage={state.signLanguage}
                          speed={state.avatarSpeed}
                          size={state.avatarSize}
                          isActive={state.isActive}
                        />
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-80 flex items-center justify-center text-white/60"
                      >
                        <div className="text-center">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <EyeOff size={80} className="mx-auto mb-6 opacity-50" />
                          </motion.div>
                          <p className="text-xl font-medium mb-2">Avatar Hidden</p>
                          <p className="text-sm text-white/40">Enable visibility to see signs</p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <Footer />

        {/* Settings Panel */}
        {state.showSettings && (
          <SettingsPanel 
            onClose={toggleSettings}
            settings={state}
            onSettingsChange={setState}
          />
        )}

        {/* Floating Avatar for Overlay Mode */}
        {state.overlayMode && state.isVisible && (
          <FloatingAvatar
            text={state.currentText}
            signLanguage={state.signLanguage}
            speed={state.avatarSpeed}
            size={Math.max(150, state.avatarSize * 1.5)}
            isActive={state.isActive}
            position={state.overlayPosition}
            opacity={state.overlayOpacity}
            onClose={() => setState(prev => ({ ...prev, overlayMode: false }))}
            onPositionChange={(position) => setState(prev => ({ ...prev, overlayPosition: position }))}
          />
        )}
      </div>
    </div>
  );
}

export default App;