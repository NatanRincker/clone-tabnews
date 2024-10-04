import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";

export default async function migrations(request, response) {
  const dbClient = await database.getNewClient();
  const defaultMigrationOptions = {
    dbClient: dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };
  let migrationsResponse = {};
  let statusCode;
  if (request.method === "GET") {
    const pendingMigrations = await migrationRunner(defaultMigrationOptions);
    statusCode = 200;
    migrationsResponse = pendingMigrations;
  } else if (request.method === "POST") {
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dryRun: false,
    });
    statusCode = migratedMigrations.length > 0 ? 201 : 200;
    migrationsResponse = migratedMigrations;
  } else {
    statusCode = 405; // Method Not Allowed
  }
  await dbClient.end();
  return response.status(statusCode).json(migrationsResponse);
}
