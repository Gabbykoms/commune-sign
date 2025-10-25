export type Character = 'luna' | 'zephyr' | 'iris' | 'phoenix';

export interface CharacterData {
  id: Character;
  name: string;
  color: string;
  accentColor: string;
  description: string;
}

export const characters: Record<Character, CharacterData> = {
  luna: {
    id: 'luna',
    name: 'Luna',
    color: '#e0e7ff',
    accentColor: '#818cf8',
    description: 'Gentle and calm',
  },
  zephyr: {
    id: 'zephyr',
    name: 'Zephyr',
    color: '#cffafe',
    accentColor: '#06b6d4',
    description: 'Swift and graceful',
  },
  iris: {
    id: 'iris',
    name: 'Iris',
    color: '#fbcfe8',
    accentColor: '#ec4899',
    description: 'Vibrant and expressive',
  },
  phoenix: {
    id: 'phoenix',
    name: 'Phoenix',
    color: '#fed7aa',
    accentColor: '#f97316',
    description: 'Warm and energetic',
  },
};

export const characterArray = Object.values(characters);
