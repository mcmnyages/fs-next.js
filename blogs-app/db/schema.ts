import {
  pgTable,
  serial,
  varchar,
  integer,
} from "drizzle-orm/pg-core"

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  url: varchar("url", { length: 255 }).notNull(),
  likes: integer("likes").notNull().default(0),
})