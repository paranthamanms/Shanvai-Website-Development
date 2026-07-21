import fs from 'fs';
import path from 'path';
import { pool } from './db';

async function migrate() {
  const schemaPath = path.resolve(__dirname, '../../../../db/init_schema.sql');
  const sql = fs.readFileSync(schemaPath, 'utf8');
  console.log('[migrate] Applying schema from', schemaPath);
  await pool.query(sql);
  console.log('[migrate] Schema applied successfully');
  await pool.end();
}

migrate().catch(async (err) => {
  console.error('[migrate] Failed', err);
  await pool.end();
  process.exit(1);
});
