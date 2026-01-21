import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "size" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "size" SET DEFAULT 'oneThird'::text;
  DROP TYPE "public"."enum_pages_blocks_content_columns_size";
  CREATE TYPE "public"."enum_pages_blocks_content_columns_size" AS ENUM('full', 'halfWide', 'oneThird', 'twoThirds', 'half');
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "size" SET DEFAULT 'oneThird'::"public"."enum_pages_blocks_content_columns_size";
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "size" SET DATA TYPE "public"."enum_pages_blocks_content_columns_size" USING "size"::"public"."enum_pages_blocks_content_columns_size";
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "size" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "size" SET DEFAULT 'oneThird'::text;
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_size";
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_size" AS ENUM('full', 'halfWide', 'oneThird', 'twoThirds', 'half');
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "size" SET DEFAULT 'oneThird'::"public"."enum__pages_v_blocks_content_columns_size";
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "size" SET DATA TYPE "public"."enum__pages_v_blocks_content_columns_size" USING "size"::"public"."enum__pages_v_blocks_content_columns_size";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "size" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "size" SET DEFAULT 'oneThird'::text;
  DROP TYPE "public"."enum_pages_blocks_content_columns_size";
  CREATE TYPE "public"."enum_pages_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'halfWide', 'twoThirds', 'full');
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "size" SET DEFAULT 'oneThird'::"public"."enum_pages_blocks_content_columns_size";
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "size" SET DATA TYPE "public"."enum_pages_blocks_content_columns_size" USING "size"::"public"."enum_pages_blocks_content_columns_size";
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "size" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "size" SET DEFAULT 'oneThird'::text;
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_size";
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'halfWide', 'twoThirds', 'full');
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "size" SET DEFAULT 'oneThird'::"public"."enum__pages_v_blocks_content_columns_size";
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "size" SET DATA TYPE "public"."enum__pages_v_blocks_content_columns_size" USING "size"::"public"."enum__pages_v_blocks_content_columns_size";`)
}
