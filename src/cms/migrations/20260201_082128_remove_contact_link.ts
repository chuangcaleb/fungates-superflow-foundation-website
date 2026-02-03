import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contact_social_links" DROP COLUMN "target";
  DROP TYPE "public"."enum_contact_social_links_target";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_contact_social_links_target" AS ENUM('_self', '_blank');
  ALTER TABLE "contact_social_links" ADD COLUMN "target" "enum_contact_social_links_target" DEFAULT '_blank';`)
}
