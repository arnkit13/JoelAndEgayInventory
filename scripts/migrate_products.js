/**
 * Product Migration Script
 * Migrates all 781 products from chino_products_backup.json to a new backend.
 * 
 * Usage:
 *   node scripts/migrate_products.js <target_backend_url>
 * Example:
 *   node scripts/migrate_products.js https://joel-egay-backend.up.railway.app
 */

const fs = require('fs');
const path = require('path');

async function migrate() {
  const targetUrl = process.argv[2] || process.env.TARGET_API_URL;
  if (!targetUrl) {
    console.error('Error: Please provide the target backend URL.');
    console.log('Usage: node scripts/migrate_products.js https://your-backend.up.railway.app');
    process.exit(1);
  }

  const cleanBase = targetUrl.replace(/\/+$/, '');
  const endpoint = `${cleanBase}/api/products/bulk`;

  const backupPath = path.resolve(__dirname, '..', 'chino_products_backup.json');
  if (!fs.existsSync(backupPath)) {
    console.error(`Backup file not found at: ${backupPath}`);
    process.exit(1);
  }

  const rawData = fs.readFileSync(backupPath, 'utf8');
  const products = JSON.parse(rawData);
  console.log(`Loaded ${products.length} products from backup.`);

  // Clean products (strip old IDs and timestamps to let new database auto-generate fresh keys)
  const cleanedProducts = products.map(p => ({
    name: p.name,
    supplier: p.supplier || null,
    originalPrice: p.originalPrice || null,
    price: p.price,
    priceAbove10: p.priceAbove10 || null,
    wholesalePrice: p.wholesalePrice || null,
    category: p.category || 'General',
    stock: p.stock || 0,
    unit: p.unit || 'pc',
    barcode: p.barcode || null,
    description: p.description || null
  }));

  console.log(`Uploading ${cleanedProducts.length} products to ${endpoint}...`);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cleanedProducts)
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Upload failed (${response.status}): ${errText}`);
    }

    const result = await response.json();
    console.log(`Successfully migrated ${result.length} products into your new database!`);
  } catch (err) {
    console.error('Migration failed:', err.message);
    process.exit(1);
  }
}

migrate();
