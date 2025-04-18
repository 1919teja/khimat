import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from "@shared/schema";
import { neon, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// Get database connection string from environment
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/worldquestrealm';

// Configure database connection based on connection string
let db;

// If using Neon (connection string contains neon.tech)
if (connectionString.includes('neon.tech')) {
  console.log('Using Neon database connection');
  // Set up WebSocket for Neon
  neonConfig.webSocketConstructor = ws;
  const sql = neon(connectionString);
  db = drizzle(sql, { schema });
} 
// Otherwise use standard PostgreSQL connection
else {
  console.log('Using standard PostgreSQL connection');
  const pool = new Pool({
    connectionString: connectionString,
  });
  
  // Add error handling
  pool.on('error', (err) => {
    console.error('Unexpected error on idle PostgreSQL client', err);
    process.exit(-1);
  });






//   import { Pool, neonConfig } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-serverless';
// import ws from "ws";
// import * as schema from "@shared/schema";
// import dotenv from 'dotenv';

// // Load environment variables
// dotenv.config();

// if (!process.env.DATABASE_URL) {
//   throw new Error(
//     "DATABASE_URL must be set. Did you forget to provision a database?",
//   );
// }

// // Only use WebSocket configuration for production (Neon database)
// if (process.env.NODE_ENV === 'production') {


//   neonConfig.webSocketConstructor = ws;
  
  db = drizzle(pool, { schema });
}

export { db };
