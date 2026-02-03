import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_hero_align" RENAME TO "enum_pages_hero_justify";
  ALTER TYPE "public"."enum__pages_v_version_hero_align" RENAME TO "enum__pages_v_version_hero_justify";
  ALTER TABLE "pages" RENAME COLUMN "hero_align" TO "hero_justify";
  ALTER TABLE "_pages_v" RENAME COLUMN "version_hero_align" TO "version_hero_justify";
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "size" SET DEFAULT 'full';
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "size" SET DEFAULT 'full';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_hero_justify" RENAME TO "enum_pages_hero_align";
  ALTER TYPE "public"."enum__pages_v_version_hero_justify" RENAME TO "enum__pages_v_version_hero_align";
  ALTER TABLE "pages" RENAME COLUMN "hero_justify" TO "hero_align";
  ALTER TABLE "_pages_v" RENAME COLUMN "version_hero_justify" TO "version_hero_align";
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "size" SET DEFAULT 'oneThird';
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "size" SET DEFAULT 'oneThird';`)
}
