import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // 1. Convert enum → text (Payload already did this)
  await db.execute(sql`
    ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "size" SET DATA TYPE text;
    ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "size" SET DEFAULT 'full'::text;
  `)

  // 2. NORMALISE DATA (this is the missing piece)
  await db.execute(sql`
    UPDATE "pages_blocks_content_columns"
    SET "size" = 'oneHalfWide'
    WHERE "size" = 'halfWide';

    UPDATE "pages_blocks_content_columns"
    SET "size" = 'oneHalfNarrow'
    WHERE "size" = 'half';
  `)

  // 3. Recreate enum and cast back
  await db.execute(sql`
    DROP TYPE "public"."enum_pages_blocks_content_columns_size";

    CREATE TYPE "public"."enum_pages_blocks_content_columns_size" AS ENUM (
      'full',
      'oneHalfWide',
      'oneThird',
      'twoThirds',
      'oneHalfNarrow'
    );

    ALTER TABLE "pages_blocks_content_columns"
      ALTER COLUMN "size"
      SET DEFAULT 'full'::"public"."enum_pages_blocks_content_columns_size";

    ALTER TABLE "pages_blocks_content_columns"
      ALTER COLUMN "size"
      SET DATA TYPE "public"."enum_pages_blocks_content_columns_size"
      USING "size"::"public"."enum_pages_blocks_content_columns_size";
  `)

  // ===== Versions table =====

  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "size" SET DATA TYPE text;
    ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "size" SET DEFAULT 'full'::text;
  `)

  await db.execute(sql`
    UPDATE "_pages_v_blocks_content_columns"
    SET "size" = 'oneHalfWide'
    WHERE "size" = 'halfWide';

    UPDATE "_pages_v_blocks_content_columns"
    SET "size" = 'oneHalfNarrow'
    WHERE "size" = 'half';
  `)

  await db.execute(sql`
    DROP TYPE "public"."enum__pages_v_blocks_content_columns_size";

    CREATE TYPE "public"."enum__pages_v_blocks_content_columns_size" AS ENUM (
      'full',
      'oneHalfWide',
      'oneThird',
      'twoThirds',
      'oneHalfNarrow'
    );

    ALTER TABLE "_pages_v_blocks_content_columns"
      ALTER COLUMN "size"
      SET DEFAULT 'full'::"public"."enum__pages_v_blocks_content_columns_size";

    ALTER TABLE "_pages_v_blocks_content_columns"
      ALTER COLUMN "size"
      SET DATA TYPE "public"."enum__pages_v_blocks_content_columns_size"
      USING "size"::"public"."enum__pages_v_blocks_content_columns_size";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "size" SET DATA TYPE text;
    ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "size" SET DEFAULT 'full'::text;
  `)

  await db.execute(sql`
    UPDATE "pages_blocks_content_columns"
    SET "size" = 'halfWide'
    WHERE "size" = 'oneHalfWide';

    UPDATE "pages_blocks_content_columns"
    SET "size" = 'half'
    WHERE "size" = 'oneHalfNarrow';
  `)

  await db.execute(sql`
    DROP TYPE "public"."enum_pages_blocks_content_columns_size";

    CREATE TYPE "public"."enum_pages_blocks_content_columns_size" AS ENUM (
      'full',
      'halfWide',
      'oneThird',
      'twoThirds',
      'half'
    );

    ALTER TABLE "pages_blocks_content_columns"
      ALTER COLUMN "size"
      SET DEFAULT 'full'::"public"."enum_pages_blocks_content_columns_size";

    ALTER TABLE "pages_blocks_content_columns"
      ALTER COLUMN "size"
      SET DATA TYPE "public"."enum_pages_blocks_content_columns_size"
      USING "size"::"public"."enum_pages_blocks_content_columns_size";
  `)

  // ===== Versions table =====

  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "size" SET DATA TYPE text;
    ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "size" SET DEFAULT 'full'::text;
  `)

  await db.execute(sql`
    UPDATE "_pages_v_blocks_content_columns"
    SET "size" = 'halfWide'
    WHERE "size" = 'oneHalfWide';

    UPDATE "_pages_v_blocks_content_columns"
    SET "size" = 'half'
    WHERE "size" = 'oneHalfNarrow';
  `)

  await db.execute(sql`
    DROP TYPE "public"."enum__pages_v_blocks_content_columns_size";

    CREATE TYPE "public"."enum__pages_v_blocks_content_columns_size" AS ENUM (
      'full',
      'halfWide',
      'oneThird',
      'twoThirds',
      'half'
    );

    ALTER TABLE "_pages_v_blocks_content_columns"
      ALTER COLUMN "size"
      SET DEFAULT 'full'::"public"."enum__pages_v_blocks_content_columns_size";

    ALTER TABLE "_pages_v_blocks_content_columns"
      ALTER COLUMN "size"
      SET DATA TYPE "public"."enum__pages_v_blocks_content_columns_size"
      USING "size"::"public"."enum__pages_v_blocks_content_columns_size";
  `)
}
