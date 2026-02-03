import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_nav_items_item_groups_item_links_link_type" RENAME TO "enum_nav_items_item_groups_group_links_link_type";
  ALTER TABLE "nav_items_item_groups_item_links" RENAME TO "nav_items_item_groups_group_links";
  ALTER TABLE "nav_items_item_groups" RENAME COLUMN "item_label" TO "group_label";
  ALTER TABLE "nav_items_item_groups_group_links" DROP CONSTRAINT "nav_items_item_groups_item_links_parent_id_fk";
  
  DROP INDEX "nav_items_item_groups_item_links_order_idx";
  DROP INDEX "nav_items_item_groups_item_links_parent_id_idx";
  ALTER TABLE "nav_items_item_groups_group_links" ADD CONSTRAINT "nav_items_item_groups_group_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_items_item_groups"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "nav_items_item_groups_group_links_order_idx" ON "nav_items_item_groups_group_links" USING btree ("_order");
  CREATE INDEX "nav_items_item_groups_group_links_parent_id_idx" ON "nav_items_item_groups_group_links" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_nav_items_item_groups_group_links_link_type" RENAME TO "enum_nav_items_item_groups_item_links_link_type";
  ALTER TABLE "nav_items_item_groups_group_links" RENAME TO "nav_items_item_groups_item_links";
  ALTER TABLE "nav_items_item_groups" RENAME COLUMN "group_label" TO "item_label";
  ALTER TABLE "nav_items_item_groups_item_links" DROP CONSTRAINT "nav_items_item_groups_group_links_parent_id_fk";
  
  DROP INDEX "nav_items_item_groups_group_links_order_idx";
  DROP INDEX "nav_items_item_groups_group_links_parent_id_idx";
  ALTER TABLE "nav_items_item_groups_item_links" ADD CONSTRAINT "nav_items_item_groups_item_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_items_item_groups"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "nav_items_item_groups_item_links_order_idx" ON "nav_items_item_groups_item_links" USING btree ("_order");
  CREATE INDEX "nav_items_item_groups_item_links_parent_id_idx" ON "nav_items_item_groups_item_links" USING btree ("_parent_id");`)
}
