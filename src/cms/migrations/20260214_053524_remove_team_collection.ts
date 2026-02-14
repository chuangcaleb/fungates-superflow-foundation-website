import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'


export async function up({ db }: MigrateUpArgs): Promise<void> {

  await db.execute(sql`ALTER TABLE "staff" DISABLE ROW LEVEL SECURITY;`)
  await db.execute(sql`ALTER TABLE "staff_groups" DISABLE ROW LEVEL SECURITY;`)

  await db.execute(sql`DROP TABLE IF EXISTS "staff" CASCADE;`)
  await db.execute(sql`DROP TABLE IF EXISTS "staff_groups" CASCADE;`)

  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
    DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_staff_fk";
  `)

  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
    DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_staff_groups_fk";
  `)

  await db.execute(sql`
    DROP INDEX IF EXISTS "payload_locked_documents_rels_staff_id_idx";
  `)

  await db.execute(sql`
    DROP INDEX IF EXISTS "payload_locked_documents_rels_staff_groups_id_idx";
  `)

  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
    DROP COLUMN IF EXISTS "staff_id";
  `)

  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
    DROP COLUMN IF EXISTS "staff_groups_id";
  `)

}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "staff" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"group_id" integer NOT NULL,
  	"image_id" integer,
  	"message" jsonb,
  	"user_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "staff_groups" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"show_on_team" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "staff_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "staff_groups_id" integer;
  ALTER TABLE "staff" ADD CONSTRAINT "staff_group_id_staff_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."staff_groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "staff" ADD CONSTRAINT "staff_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "staff" ADD CONSTRAINT "staff_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "staff_group_idx" ON "staff" USING btree ("group_id");
  CREATE INDEX "staff_image_idx" ON "staff" USING btree ("image_id");
  CREATE UNIQUE INDEX "staff_user_idx" ON "staff" USING btree ("user_id");
  CREATE INDEX "staff_updated_at_idx" ON "staff" USING btree ("updated_at");
  CREATE INDEX "staff_created_at_idx" ON "staff" USING btree ("created_at");
  CREATE INDEX "staff_groups_updated_at_idx" ON "staff_groups" USING btree ("updated_at");
  CREATE INDEX "staff_groups_created_at_idx" ON "staff_groups" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_staff_fk" FOREIGN KEY ("staff_id") REFERENCES "public"."staff"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_staff_groups_fk" FOREIGN KEY ("staff_groups_id") REFERENCES "public"."staff_groups"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_staff_id_idx" ON "payload_locked_documents_rels" USING btree ("staff_id");
  CREATE INDEX "payload_locked_documents_rels_staff_groups_id_idx" ON "payload_locked_documents_rels" USING btree ("staff_groups_id");`)
}
