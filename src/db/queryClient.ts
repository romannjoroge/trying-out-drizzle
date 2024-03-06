import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from 'dotenv';
dotenv.config();

const postgres_user = process.env.PG_USER;
const password = process.env.PG_PASSWORD;
const host = process.env.PG_HOST;
const port = process.env.PG_PORT;
const database = process.env.PG_DATABASE;

const queryClient = postgres(`postgres://${postgres_user}:${password}@${host}:${port}/${database}`, { max: 1});
const db = drizzle(queryClient);

export default db;