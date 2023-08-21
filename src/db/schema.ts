import { pgTable, pgEnum, pgSchema, AnyPgColumn, varchar, timestamp, text, integer, uniqueIndex, serial, foreignKey } from "drizzle-orm/pg-core"

export const keyStatus = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const keyType = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const factorType = pgEnum("factor_type", ['totp', 'webauthn'])
export const factorStatus = pgEnum("factor_status", ['unverified', 'verified'])
export const aalLevel = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['s256', 'plain'])

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

export const recipe = pgTable("Recipe", {
	id: serial("id").primaryKey().notNull(),
	title: text("title"),
	photo: text("photo"),
	description: text("description"),
	authorId: integer("authorId").notNull().references(() => user.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	video: text("video"),
});

export const comments = pgTable("Comments", {
	id: serial("id").primaryKey().notNull(),
	text: text("text"),
	recipeId: integer("recipeId").notNull().references(() => recipe.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	authorId: integer("authorId").notNull().references(() => user.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
});

export const like = pgTable("Like", {
	id: serial("id").primaryKey().notNull(),
	recipeId: integer("recipeId").notNull().references(() => recipe.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	userId: integer("userId").notNull().references(() => user.id, { onDelete: "restrict", onUpdate: "cascade" } ),
});

export const save = pgTable("Save", {
	id: serial("id").primaryKey().notNull(),
	recipeId: integer("recipeId").notNull().references(() => recipe.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	userId: integer("userId").notNull().references(() => user.id, { onDelete: "restrict", onUpdate: "cascade" } ),
});

export const video = pgTable("Video", {
	id: serial("id").primaryKey().notNull(),
	url: text("url").notNull(),
	recipeId: integer("recipeId").notNull().references(() => recipe.id, { onDelete: "restrict", onUpdate: "cascade" } ),
});