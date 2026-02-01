import * as migration_20260105_201500_initial from './20260105_201500_initial';
import * as migration_20260120_142437 from './20260120_142437';
import * as migration_20260120_152847 from './20260120_152847';
import * as migration_20260121_122552 from './20260121_122552';
import * as migration_20260127_124044_rename_hero_align_to_justify from './20260127_124044_rename_hero_align_to_justify';
import * as migration_20260127_125924_content_size_one_halves from './20260127_125924_content_size_one_halves';
import * as migration_20260127_135332_user_roles from './20260127_135332_user_roles';
import * as migration_20260128_122115_content_media from './20260128_122115_content_media';
import * as migration_20260128_133349_content_align from './20260128_133349_content_align';
import * as migration_20260128_145512_content_variant from './20260128_145512_content_variant';
import * as migration_20260131_102644_contact_config from './20260131_102644_contact_config';
import * as migration_20260201_073519_contact_address_title from './20260201_073519_contact_address_title';
import * as migration_20260201_080321_contact_location_title from './20260201_080321_contact_location_title';
import * as migration_20260201_082128_remove_contact_link from './20260201_082128_remove_contact_link';
import * as migration_20260201_151920_nav_config from './20260201_151920_nav_config';

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
    name: '20260127_125924_content_size_one_halves',
  },
  {
    up: migration_20260127_135332_user_roles.up,
    down: migration_20260127_135332_user_roles.down,
    name: '20260127_135332_user_roles',
  },
  {
    up: migration_20260128_122115_content_media.up,
    down: migration_20260128_122115_content_media.down,
    name: '20260128_122115_content_media',
  },
  {
    up: migration_20260128_133349_content_align.up,
    down: migration_20260128_133349_content_align.down,
    name: '20260128_133349_content_align',
  },
  {
    up: migration_20260128_145512_content_variant.up,
    down: migration_20260128_145512_content_variant.down,
    name: '20260128_145512_content_variant',
  },
  {
    up: migration_20260131_102644_contact_config.up,
    down: migration_20260131_102644_contact_config.down,
    name: '20260131_102644_contact_config',
  },
  {
    up: migration_20260201_073519_contact_address_title.up,
    down: migration_20260201_073519_contact_address_title.down,
    name: '20260201_073519_contact_address_title',
  },
  {
    up: migration_20260201_080321_contact_location_title.up,
    down: migration_20260201_080321_contact_location_title.down,
    name: '20260201_080321_contact_location_title',
  },
  {
    up: migration_20260201_082128_remove_contact_link.up,
    down: migration_20260201_082128_remove_contact_link.down,
    name: '20260201_082128_remove_contact_link',
  },
  {
    up: migration_20260201_151920_nav_config.up,
    down: migration_20260201_151920_nav_config.down,
    name: '20260201_151920_nav_config'
  },
];
