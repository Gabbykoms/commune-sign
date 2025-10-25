import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Palette, Monitor, Accessibility, Globe } from 'lucide-react';

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

interface SettingsPanelProps {
  onClose: () => void;
  settings: AppState;
  onSettingsChange: React.Dispatch<React.SetStateAction<AppState>>;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose, settings, onSettingsChange }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Settings Content */}
          <div className="p-6 space-y-8">
            {/* Accessibility Settings */}
            <div>
              <div className="flex items-center mb-4">
                <Accessibility size={20} className="text-gray-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">Accessibility</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    High Contrast Mode
                  </label>
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Reduce Motion
                  </label>
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Large Text
                  </label>
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            {/* Display Settings */}
            <div>
              <div className="flex items-center mb-4">
                <Monitor size={20} className="text-gray-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">Display</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Avatar Position
                  </label>
                  <select className="input-field">
                    <option value="bottom-right">Bottom Right</option>
                    <option value="bottom-left">Bottom Left</option>
                    <option value="top-right">Top Right</option>
                    <option value="top-left">Top Left</option>
                    <option value="center">Center</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Opacity
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="80"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </div>

            {/* Language Settings */}
            <div>
              <div className="flex items-center mb-4">
                <Globe size={20} className="text-gray-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">Language</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interface Language
                  </label>
                  <select className="input-field">
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Voice Language
                  </label>
                  <select className="input-field">
                    <option value="en-US">English (US)</option>
                    <option value="en-GB">English (UK)</option>
                    <option value="es-ES">Spanish</option>
                    <option value="fr-FR">French</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Theme Settings */}
            <div>
              <div className="flex items-center mb-4">
                <Palette size={20} className="text-gray-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">Theme</h3>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 transition-colors">
                  <div className="w-full h-8 bg-white border border-gray-300 rounded mb-2"></div>
                  <span className="text-sm font-medium">Light</span>
                </button>
                
                <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 transition-colors">
                  <div className="w-full h-8 bg-gray-800 rounded mb-2"></div>
                  <span className="text-sm font-medium">Dark</span>
                </button>
                
                <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 transition-colors">
                  <div className="w-full h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded mb-2"></div>
                  <span className="text-sm font-medium">Auto</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end p-6 border-t border-gray-200 space-x-4">
            <button
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="btn-primary"
            >
              Save Settings
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SettingsPanel; 