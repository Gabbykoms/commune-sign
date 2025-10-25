import React from 'react';
import { motion } from 'framer-motion';
import { characterArray, Character } from '../data/characters';

interface CharacterSelectorProps {
  selectedCharacter: Character;
  onCharacterChange: (character: Character) => void;
}

const CharacterSelector: React.FC<CharacterSelectorProps> = ({
  selectedCharacter,
  onCharacterChange,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-neutral-200 uppercase tracking-wide">
          Choose Your Signer
        </h3>
        <div className="text-xs text-neutral-500">
          {characterArray.find(c => c.id === selectedCharacter)?.description}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {characterArray.map((character) => (
          <motion.button
            key={character.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCharacterChange(character.id)}
            className={`relative p-4 rounded-lg transition-all duration-300 group ${
              selectedCharacter === character.id
                ? 'ring-2 ring-offset-2 ring-offset-black'
                : 'hover:bg-white/5'
            }`}
            style={{
              backgroundColor:
                selectedCharacter === character.id
                  ? `${character.accentColor}20`
                  : 'rgba(255, 255, 255, 0.03)',
              borderColor:
                selectedCharacter === character.id ? character.accentColor : 'transparent',
              borderWidth: selectedCharacter === character.id ? 2 : 0,
            }}
          >
            {/* Character Preview Circle */}
            <motion.div
              animate={selectedCharacter === character.id ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
              style={{ backgroundColor: character.color }}
            >
              <div
                className="w-8 h-8 rounded-full opacity-60"
                style={{ backgroundColor: character.accentColor }}
              />
            </motion.div>

            {/* Character Name */}
            <p className="text-sm font-medium text-neutral-200 text-center">
              {character.name}
            </p>

            {/* Selected Badge */}
            {selectedCharacter === character.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: character.accentColor, color: '#0a0a0a' }}
              >
                ✓
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default CharacterSelector;
