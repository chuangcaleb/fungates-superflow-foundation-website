import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "team_groups_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"member_name" varchar NOT NULL,
  	"member_title" varchar,
  	"member_message" jsonb,
  	"member_is_custom_photo" boolean DEFAULT false NOT NULL,
  	"member_custom_photo_id" integer,
  	"member_user_id" integer
  );
  
  CREATE TABLE "team_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "team" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "team_groups_members" ADD CONSTRAINT "team_groups_members_member_custom_photo_id_media_id_fk" FOREIGN KEY ("member_custom_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_groups_members" ADD CONSTRAINT "team_groups_members_member_user_id_users_id_fk" FOREIGN KEY ("member_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_groups_members" ADD CONSTRAINT "team_groups_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_groups" ADD CONSTRAINT "team_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "team_groups_members_order_idx" ON "team_groups_members" USING btree ("_order");
  CREATE INDEX "team_groups_members_parent_id_idx" ON "team_groups_members" USING btree ("_parent_id");
  CREATE INDEX "team_groups_members_member_member_custom_photo_idx" ON "team_groups_members" USING btree ("member_custom_photo_id");
  CREATE UNIQUE INDEX "team_groups_members_member_member_user_idx" ON "team_groups_members" USING btree ("member_user_id");
  CREATE INDEX "team_groups_order_idx" ON "team_groups" USING btree ("_order");
  CREATE INDEX "team_groups_parent_id_idx" ON "team_groups" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "team_groups_members" CASCADE;
  DROP TABLE "team_groups" CASCADE;
  DROP TABLE "team" CASCADE;`)
}
