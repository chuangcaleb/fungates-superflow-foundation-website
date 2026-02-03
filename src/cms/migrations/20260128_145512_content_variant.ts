import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_content_columns_variant" AS ENUM('align-start', 'align-center', 'card');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_variant" AS ENUM('align-start', 'align-center', 'card');
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "variant" "enum_pages_blocks_content_columns_variant" DEFAULT 'align-start';
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "variant" "enum__pages_v_blocks_content_columns_variant" DEFAULT 'align-start';
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "align";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "align";
  DROP TYPE "public"."enum_pages_blocks_content_columns_align";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_align";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_content_columns_align" AS ENUM('start', 'center', 'end');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_align" AS ENUM('start', 'center', 'end');
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "align" "enum_pages_blocks_content_columns_align" DEFAULT 'start';
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "align" "enum__pages_v_blocks_content_columns_align" DEFAULT 'start';
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "variant";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "variant";
  DROP TYPE "public"."enum_pages_blocks_content_columns_variant";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_variant";`)
}
