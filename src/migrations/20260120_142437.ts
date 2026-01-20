import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_align" AS ENUM('start', 'center', 'end');
  CREATE TYPE "public"."enum__pages_v_version_hero_align" AS ENUM('start', 'center', 'end');
  ALTER TABLE "pages" ADD COLUMN "hero_align" "enum_pages_hero_align" DEFAULT 'start';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_align" "enum__pages_v_version_hero_align" DEFAULT 'start';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" DROP COLUMN "hero_align";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_align";
  DROP TYPE "public"."enum_pages_hero_align";
  DROP TYPE "public"."enum__pages_v_version_hero_align";`)
}
