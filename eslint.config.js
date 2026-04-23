const prettier = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

const screepsGlobals = {
  Game: 'readonly',
  Memory: 'readonly',
  RawMemory: 'readonly',
  PathFinder: 'readonly',
  WORK: 'readonly',
  CARRY: 'readonly',
  MOVE: 'readonly',
  ATTACK: 'readonly',
  RANGED_ATTACK: 'readonly',
  HEAL: 'readonly',
  CLAIM: 'readonly',
  TOUGH: 'readonly',
  RESOURCE_ENERGY: 'readonly',
  ERR_NOT_IN_RANGE: 'readonly',
  OK: 'readonly',
  FIND_SOURCES: 'readonly',
  FIND_STRUCTURES: 'readonly',
  FIND_MY_SPAWNS: 'readonly',
  FIND_CREEPS: 'readonly',
  FIND_MY_CREEPS: 'readonly',
  STRUCTURE_CONTAINER: 'readonly',
  STRUCTURE_EXTENSION: 'readonly',
  STRUCTURE_ROAD: 'readonly',
  STRUCTURE_SPAWN: 'readonly',
  STRUCTURE_TOWER: 'readonly',
  STRUCTURE_WALL: 'readonly',
  STRUCTURE_RAMPART: 'readonly',
  STRUCTURE_STORAGE: 'readonly',
  STRUCTURE_LINK: 'readonly',
  STRUCTURE_TERMINAL: 'readonly',
  STRUCTURE_LAB: 'readonly',
  STRUCTURE_CONTROLLER: 'readonly',
  BODYPART_COST: 'readonly',
  COLOR_RED: 'readonly',
  COLOR_GREEN: 'readonly',
  COLOR_BLUE: 'readonly',
};

module.exports = [
  {
    files: ['src/**/*.js'],
    plugins: {
      prettier,
    },
    languageOptions: {
      ecmaVersion: 2021,
      globals: {
        ...screepsGlobals,
        module: 'writable',
        require: 'readonly',
        exports: 'writable',
        __dirname: 'readonly',
        __filename: 'readonly',
        process: 'readonly',
        console: 'readonly',
      },
    },
    rules: {
      ...prettierConfig.rules,
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
      'prettier/prettier': 'error',
    },
  },
  {
    ignores: ['node_modules/', 'dist/'],
  },
];
