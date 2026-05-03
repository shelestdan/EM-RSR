import * as migration_20260430_073324_initial from './20260430_073324_initial';
import * as migration_20260503_172908_add_map_admin_filters from './20260503_172908_add_map_admin_filters';

export const migrations = [
  {
    up: migration_20260430_073324_initial.up,
    down: migration_20260430_073324_initial.down,
    name: '20260430_073324_initial',
  },
  {
    up: migration_20260503_172908_add_map_admin_filters.up,
    down: migration_20260503_172908_add_map_admin_filters.down,
    name: '20260503_172908_add_map_admin_filters'
  },
];
