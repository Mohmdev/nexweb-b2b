import * as migration_20250129_120136 from './20250129_120136';

export const migrations = [
  {
    up: migration_20250129_120136.up,
    down: migration_20250129_120136.down,
    name: '20250129_120136'
  },
];
