import * as migration_20260105_201500_initial from './20260105_201500_initial';
import * as migration_20260120_142437 from './20260120_142437';
import * as migration_20260120_152847 from './20260120_152847';
import * as migration_20260121_122552 from './20260121_122552';
import * as migration_20260127_124044_rename_hero_align_to_justify from './20260127_124044_rename_hero_align_to_justify';
import * as migration_20260127_125924_content_size_one_halves from './20260127_125924_content_size_one_halves';

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
    name: '20260121_122552',
  },
  {
    up: migration_20260127_124044_rename_hero_align_to_justify.up,
    down: migration_20260127_124044_rename_hero_align_to_justify.down,
    name: '20260127_124044_rename_hero_align_to_justify',
  },
  {
    up: migration_20260127_125924_content_size_one_halves.up,
    down: migration_20260127_125924_content_size_one_halves.down,
    name: '20260127_125924_content_size_one_halves'
  },
];
