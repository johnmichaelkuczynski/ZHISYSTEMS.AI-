import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const journalIssues = pgTable("journal_issues", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  body: text("body").notNull(),
  volume: integer("volume").notNull(),
  issue: integer("issue").notNull(),
  year: integer("year").notNull(),
  tags: text("tags").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const officeDocuments = pgTable("office_documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  body: text("body").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertOfficeDocumentSchema = createInsertSchema(officeDocuments).pick({
  title: true,
  body: true,
});

export type InsertOfficeDocument = z.infer<typeof insertOfficeDocumentSchema>;
export type OfficeDocument = typeof officeDocuments.$inferSelect;

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertJournalIssueSchema = createInsertSchema(journalIssues).pick({
  title: true,
  body: true,
  volume: true,
  issue: true,
  year: true,
  tags: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertJournalIssue = z.infer<typeof insertJournalIssueSchema>;
export type JournalIssue = typeof journalIssues.$inferSelect;
