import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'
import path from 'path'
import fs from 'fs'

const dbDir = path.resolve(process.cwd(), 'data')
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

const sqlitePath = path.resolve(dbDir, 'kodlama.db')
const sqlite = new Database(sqlitePath)

// Enable WAL mode for better concurrency and performance
sqlite.pragma('journal_mode = WAL')

export const db = drizzle(sqlite, { schema })
export { schema }

