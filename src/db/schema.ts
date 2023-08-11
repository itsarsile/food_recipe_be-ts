import { pgTable, pgEnum, pgSchema, AnyPgColumn, varchar, timestamp, text, integer, uniqueIndex, serial } from "drizzle-orm/pg-core"

export const keyStatus = pgEnum("key_status", ['expired', 'invalid', 'valid', 'default'])
export const keyType = pgEnum("key_type", ['stream_xchacha20', 'secretstream', 'secretbox', 'kdf', 'generichash', 'shorthash', 'auth', 'hmacsha256', 'hmacsha512', 'aead-det', 'aead-ietf'])
export const factorType = pgEnum("factor_type", ['webauthn', 'totp'])
export const factorStatus = pgEnum("factor_status", ['verified', 'unverified'])
export const aalLevel = pgEnum("aal_level", ['aal3', 'aal2', 'aal1'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['plain', 's256'])

import { sql } from "drizzle-orm"

export const prismaMigrations = pgTable("_prisma_migrations", {
	id: varchar("id", { length: 36 }).primaryKey().notNull(),
	checksum: varchar("checksum", { length: 64 }).notNull(),
	finishedAt: timestamp("finished_at", { withTimezone: true, mode: 'string' }),
	migrationName: varchar("migration_name", { length: 255 }).notNull(),
	logs: text("logs"),
	rolledBackAt: timestamp("rolled_back_at", { withTimezone: true, mode: 'string' }),
	startedAt: timestamp("started_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});

export const user = pgTable("User", {
	id: serial("id").primaryKey().notNull(),
	name: text("name").notNull(),
	email: text("email").notNull(),
	avatar: text("avatar"),
	phone: text("phone"),
	password: text("password").notNull(),
},
(table) => {
	return {
		emailKey: uniqueIndex("User_email_key").on(table.email),
	}
});