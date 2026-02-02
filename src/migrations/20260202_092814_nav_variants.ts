import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_nav_items_item_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_nav_items_item_groups_item_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_nav_items_item_variant" AS ENUM('single', 'multi', 'group');
  CREATE TYPE "public"."enum_nav_items_item_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "nav_items_item_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_nav_items_item_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "nav_items_item_groups_item_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_nav_items_item_groups_item_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "nav_items_item_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item_label" varchar
  );
  
  CREATE TABLE "nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item_variant" "enum_nav_items_item_variant" DEFAULT 'single',
  	"item_link_type" "enum_nav_items_item_link_type" DEFAULT 'reference',
  	"item_link_new_tab" boolean,
  	"item_link_url" varchar,
  	"item_link_label" varchar,
  	"item_label" varchar
  );
  
  CREATE TABLE "nav" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "nav_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  ALTER TABLE "nav_items_item_links" ADD CONSTRAINT "nav_items_item_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_items_item_groups_item_links" ADD CONSTRAINT "nav_items_item_groups_item_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_items_item_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_items_item_groups" ADD CONSTRAINT "nav_items_item_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_items" ADD CONSTRAINT "nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_rels" ADD CONSTRAINT "nav_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_rels" ADD CONSTRAINT "nav_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_rels" ADD CONSTRAINT "nav_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "nav_items_item_links_order_idx" ON "nav_items_item_links" USING btree ("_order");
  CREATE INDEX "nav_items_item_links_parent_id_idx" ON "nav_items_item_links" USING btree ("_parent_id");
  CREATE INDEX "nav_items_item_groups_item_links_order_idx" ON "nav_items_item_groups_item_links" USING btree ("_order");
  CREATE INDEX "nav_items_item_groups_item_links_parent_id_idx" ON "nav_items_item_groups_item_links" USING btree ("_parent_id");
  CREATE INDEX "nav_items_item_groups_order_idx" ON "nav_items_item_groups" USING btree ("_order");
  CREATE INDEX "nav_items_item_groups_parent_id_idx" ON "nav_items_item_groups" USING btree ("_parent_id");
  CREATE INDEX "nav_items_order_idx" ON "nav_items" USING btree ("_order");
  CREATE INDEX "nav_items_parent_id_idx" ON "nav_items" USING btree ("_parent_id");
  CREATE INDEX "nav_rels_order_idx" ON "nav_rels" USING btree ("order");
  CREATE INDEX "nav_rels_parent_idx" ON "nav_rels" USING btree ("parent_id");
  CREATE INDEX "nav_rels_path_idx" ON "nav_rels" USING btree ("path");
  CREATE INDEX "nav_rels_pages_id_idx" ON "nav_rels" USING btree ("pages_id");
  CREATE INDEX "nav_rels_posts_id_idx" ON "nav_rels" USING btree ("posts_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "nav_items_item_links" CASCADE;
  DROP TABLE "nav_items_item_groups_item_links" CASCADE;
  DROP TABLE "nav_items_item_groups" CASCADE;
  DROP TABLE "nav_items" CASCADE;
  DROP TABLE "nav" CASCADE;
  DROP TABLE "nav_rels" CASCADE;
  DROP TYPE "public"."enum_nav_items_item_links_link_type";
  DROP TYPE "public"."enum_nav_items_item_groups_item_links_link_type";
  DROP TYPE "public"."enum_nav_items_item_variant";
  DROP TYPE "public"."enum_nav_items_item_link_type";`)
}
