import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'


export async function up({ db }: MigrateUpArgs) {
  // Tables
  await db.execute(sql`CREATE TABLE IF NOT EXISTS staff (
    id serial PRIMARY KEY NOT NULL,
    name varchar NOT NULL,
    title varchar NOT NULL,
    group_id integer NOT NULL,
    image_id integer,
    message jsonb,
    user_id integer,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
  );`)

  await db.execute(sql`CREATE TABLE IF NOT EXISTS staff_groups (
    id serial PRIMARY KEY NOT NULL,
    label varchar NOT NULL,
    show_on_team boolean DEFAULT true,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
  );`)

  // Columns
  await db.execute(sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS image_id integer;`)
  await db.execute(sql`ALTER TABLE payload_locked_documents_rels ADD COLUMN IF NOT EXISTS staff_id integer;`)
  await db.execute(sql`ALTER TABLE payload_locked_documents_rels ADD COLUMN IF NOT EXISTS staff_groups_id integer;`)

  // Foreign keys (drop first if exists)
  await db.execute(sql`ALTER TABLE staff DROP CONSTRAINT IF EXISTS staff_group_id_staff_groups_id_fk;`)
  await db.execute(sql`ALTER TABLE staff ADD CONSTRAINT staff_group_id_staff_groups_id_fk
    FOREIGN KEY (group_id) REFERENCES staff_groups(id) ON DELETE set null ON UPDATE no action;`)

  await db.execute(sql`ALTER TABLE staff DROP CONSTRAINT IF EXISTS staff_image_id_media_id_fk;`)
  await db.execute(sql`ALTER TABLE staff ADD CONSTRAINT staff_image_id_media_id_fk
    FOREIGN KEY (image_id) REFERENCES media(id) ON DELETE set null ON UPDATE no action;`)

  await db.execute(sql`ALTER TABLE staff DROP CONSTRAINT IF EXISTS staff_user_id_users_id_fk;`)
  await db.execute(sql`ALTER TABLE staff ADD CONSTRAINT staff_user_id_users_id_fk
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE set null ON UPDATE no action;`)

  await db.execute(sql`ALTER TABLE payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_staff_fk;`)
  await db.execute(sql`ALTER TABLE payload_locked_documents_rels ADD CONSTRAINT payload_locked_documents_rels_staff_fk
    FOREIGN KEY (staff_id) REFERENCES staff(id) ON DELETE cascade ON UPDATE no action;`)

  await db.execute(sql`ALTER TABLE payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_staff_groups_fk;`)
  await db.execute(sql`ALTER TABLE payload_locked_documents_rels ADD CONSTRAINT payload_locked_documents_rels_staff_groups_fk
    FOREIGN KEY (staff_groups_id) REFERENCES staff_groups(id) ON DELETE cascade ON UPDATE no action;`)

  // Indexes
  await db.execute(sql`CREATE INDEX IF NOT EXISTS staff_group_idx ON staff(group_id);`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS staff_image_idx ON staff(image_id);`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS staff_user_idx ON staff(user_id);`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS staff_updated_at_idx ON staff(updated_at);`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS staff_created_at_idx ON staff(created_at);`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS staff_groups_updated_at_idx ON staff_groups(updated_at);`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS staff_groups_created_at_idx ON staff_groups(created_at);`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS users_image_idx ON users(image_id);`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS payload_locked_documents_rels_staff_id_idx ON payload_locked_documents_rels(staff_id);`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS payload_locked_documents_rels_staff_groups_id_idx ON payload_locked_documents_rels(staff_groups_id);`)
}


export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "staff" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "staff_groups" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "staff" CASCADE;
  DROP TABLE "staff_groups" CASCADE;
  ALTER TABLE "users" DROP CONSTRAINT "users_image_id_media_id_fk";

  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_staff_fk";

  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_staff_groups_fk";

  DROP INDEX "users_image_idx";
  DROP INDEX "payload_locked_documents_rels_staff_id_idx";
  DROP INDEX "payload_locked_documents_rels_staff_groups_id_idx";
  ALTER TABLE "users" DROP COLUMN "image_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "staff_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "staff_groups_id";`)
}
