import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from '../src/db/schema.ts'
import fs from 'fs'
import path from 'path'

const sqlite = new Database(path.resolve('data/kodlama.db'))
const db = drizzle(sqlite, { schema })

const termRows = db.select().from(schema.terms).orderBy(schema.terms.id).all()
const catRows = db.select().from(schema.categories).orderBy(schema.categories.id).all()

fs.mkdirSync(path.resolve('src/data'), { recursive: true })
fs.writeFileSync(path.resolve('src/data/terms.json'), JSON.stringify(termRows))
fs.writeFileSync(path.resolve('src/data/categories.json'), JSON.stringify(catRows))

console.log('Exported', termRows.length, 'terms and', catRows.length, 'categories')