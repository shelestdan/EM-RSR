import * as migration_20260430_073324_initial from './20260430_073324_initial';

export const migrations = [
  {
    up: migration_20260430_073324_initial.up,
    down: migration_20260430_073324_initial.down,
    name: '20260430_073324_initial'
  },
];
