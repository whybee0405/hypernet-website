import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`site_settings_accreditations\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`detail\` text,
  	\`verified\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_accreditations_order_idx\` ON \`site_settings_accreditations\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_accreditations_parent_id_idx\` ON \`site_settings_accreditations\` (\`_parent_id\`);`)
  // Defaulted rather than bare NOT NULL: SQLite rejects ADD COLUMN ... NOT NULL
  // with no default the moment the table already has a row, which the live
  // site_settings row does on every deployment past the first. The default
  // only ever backfills that one existing row; Payload's own "required" field
  // validation still applies to every edit made through the admin from here on.
  await db.run(
    sql`ALTER TABLE \`site_settings\` ADD \`trust_heading\` text NOT NULL DEFAULT 'What we are registered and working toward';`,
  )
  await db.run(
    sql`ALTER TABLE \`site_settings\` ADD \`trust_intro\` text NOT NULL DEFAULT 'Some of this is confirmed. Some of it is still moving through the process. We would rather show you both than print a badge we cannot back up.';`,
  )
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`site_settings_accreditations\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`trust_heading\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`trust_intro\`;`)
}
