import * as migration_20260105_201500_initial from './20260105_201500_initial';
import * as migration_20260120_142437 from './20260120_142437';
import * as migration_20260120_152847 from './20260120_152847';
import * as migration_20260121_122552 from './20260121_122552';

export const migrations = [
  {
    up: migration_20260105_201500_initial.up,
    down: migration_20260105_201500_initial.down,
    name: '20260105_201500_initial',
  },
  {
    up: migration_20260120_142437.up,
    down: migration_20260120_142437.down,
    name: '20260120_142437',
  },
  {
    up: migration_20260120_152847.up,
    down: migration_20260120_152847.down,
    name: '20260120_152847',
  },
  {
    up: migration_20260121_122552.up,
    down: migration_20260121_122552.down,
    name: '20260121_122552'
  },
];
