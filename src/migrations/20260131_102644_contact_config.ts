import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_contact_contacts_type" AS ENUM('phone', 'email');
  CREATE TYPE "public"."enum_contact_locations_contacts_type" AS ENUM('phone', 'email');
  CREATE TYPE "public"."enum_contact_social_links_target" AS ENUM('_self', '_blank');
  CREATE TABLE "contact_contacts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_contact_contacts_type" NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "contact_locations_contacts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_contact_locations_contacts_type" NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "contact_locations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"address" varchar
  );
  
  CREATE TABLE "contact_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"icon" varchar NOT NULL,
  	"target" "enum_contact_social_links_target" DEFAULT '_blank'
  );
  
  CREATE TABLE "contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"bottom_text" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "contact_contacts" ADD CONSTRAINT "contact_contacts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_locations_contacts" ADD CONSTRAINT "contact_locations_contacts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_locations" ADD CONSTRAINT "contact_locations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_social_links" ADD CONSTRAINT "contact_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "contact_contacts_order_idx" ON "contact_contacts" USING btree ("_order");
  CREATE INDEX "contact_contacts_parent_id_idx" ON "contact_contacts" USING btree ("_parent_id");
  CREATE INDEX "contact_locations_contacts_order_idx" ON "contact_locations_contacts" USING btree ("_order");
  CREATE INDEX "contact_locations_contacts_parent_id_idx" ON "contact_locations_contacts" USING btree ("_parent_id");
  CREATE INDEX "contact_locations_order_idx" ON "contact_locations" USING btree ("_order");
  CREATE INDEX "contact_locations_parent_id_idx" ON "contact_locations" USING btree ("_parent_id");
  CREATE INDEX "contact_social_links_order_idx" ON "contact_social_links" USING btree ("_order");
  CREATE INDEX "contact_social_links_parent_id_idx" ON "contact_social_links" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "contact_contacts" CASCADE;
  DROP TABLE "contact_locations_contacts" CASCADE;
  DROP TABLE "contact_locations" CASCADE;
  DROP TABLE "contact_social_links" CASCADE;
  DROP TABLE "contact" CASCADE;
  DROP TYPE "public"."enum_contact_contacts_type";
  DROP TYPE "public"."enum_contact_locations_contacts_type";
  DROP TYPE "public"."enum_contact_social_links_target";`)
}
