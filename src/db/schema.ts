import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  badge: text('badge').notNull(),
  icon: text('icon').notNull(),
  color: text('color').notNull(),
  count: integer('count').notNull().default(0),
})

export const terms = sqliteTable('terms', {
  id: integer('id').primaryKey(),
  categoryId: integer('category_id')
    .notNull()
    .references(() => categories.id),
  categoryName: text('category_name').notNull(),
  name: text('name').notNull(),
  expansion: text('expansion').notNull(),
  turkish: text('turkish').notNull(),
  definition: text('definition').notNull(),
  purpose: text('purpose').notNull(),
  howItWorks: text('how_it_works').notNull(),
  example: text('example').notNull(),
  difference: text('difference').notNull(),
  relatedText: text('related_text').notNull(),
  relatedIds: text('related_ids').notNull(), // JSON string e.g. "[2, 3, 4]"
  slug: text('slug').notNull().unique(),
})

export type Category = typeof categories.$inferSelect
export type Term = typeof terms.$inferSelect

