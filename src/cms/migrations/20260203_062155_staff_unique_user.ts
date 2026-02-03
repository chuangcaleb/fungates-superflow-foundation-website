import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "staff_user_idx";
  CREATE UNIQUE INDEX "staff_user_idx" ON "staff" USING btree ("user_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "staff_user_idx";
  CREATE INDEX "staff_user_idx" ON "staff" USING btree ("user_id");`)
}
