import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config();

const postgres_user = process.env.PG_USER;
const password = process.env.PG_PASSWORD;
const host = process.env.PG_HOST;
const port = process.env.PG_PORT;
const database = process.env.PG_DATABASE;

const migrationClient = postgres(`postgres://${postgres_user}:${password}@${host}:${port}/${database}`, { max: 1});

async function main() {
    try {
        await migrate(drizzle(migrationClient), {
            migrationsFolder: "src/db/migrations"
        });
        console.log("Migrate complete")
    } catch(err) {
        console.log("Could Not Migrate");
        console.log(err);
    }
}

main();
