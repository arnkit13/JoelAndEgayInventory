/**
 * Database Restore Script
 * Clones the Chino Inventory database into your new Railway PostgreSQL database.
 * 
 * Usage:
 *   node scripts/restore_database.js <TARGET_DATABASE_URL>
 * 
 * Example:
 *   node scripts/restore_database.js postgresql://postgres:mypassword@roundhouse.proxy.rlwy.net:12345/railway
 */

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function restore() {
  const targetUrl = process.argv[2] || process.env.TARGET_DATABASE_URL;
  if (!targetUrl) {
    console.error('Error: Please provide the target database URL.');
    console.log('Usage: node scripts/restore_database.js postgresql://postgres:password@host:port/database');
    process.exit(1);
  }

  const dumpPath = path.resolve(__dirname, '..', 'chino_database_dump.sql');
  if (!fs.existsSync(dumpPath)) {
    console.error(`Dump file not found at: ${dumpPath}`);
    process.exit(1);
  }

  console.log(`Connecting to target database...`);
  const client = new Client({
    connectionString: targetUrl,
    ssl: targetUrl.includes('supabase') ? { rejectUnauthorized: false } : false
  });

  try {
    await client.connect();
    console.log('Connected successfully!');

    // Read and parse SQL statements
    const sqlContent = fs.readFileSync(dumpPath, 'utf8');
    const statements = sqlContent
      .split(';\n')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    console.log(`Executing ${statements.length} SQL statements...`);

    let count = 0;
    for (const stmt of statements) {
      if (!stmt) continue;
      try {
        await client.query(stmt);
        count++;
        if (count % 100 === 0 || count === statements.length) {
          console.log(`Progress: ${count}/${statements.length} statements executed.`);
        }
      } catch (err) {
        // Log error but continue for non-critical failures (like existing admin user)
        if (!err.message.includes('already exists') && !err.message.includes('duplicate key')) {
          console.warn(`Warning on statement: ${err.message}`);
        }
      }
    }

    console.log(`Database restore completed successfully!`);
    await client.end();
  } catch (err) {
    console.error('Restore failed:', err.message);
    process.exit(1);
  }
}

restore();
