import database from "infra/database.js";

export default async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const queryVersion = await database.query("SELECT VERSION();");
  const pgVersion = queryVersion.rows[0].version;

  const queryMaxConnections = await database.query("SHOW max_connections;");
  const pgMaxConnectionsBuffer = queryMaxConnections.rows[0].max_connections;
  let pgMaxConnections =
    typeof pgMaxConnectionsBuffer == "string" ? pgMaxConnectionsBuffer : -1;
  pgMaxConnections = Number(pgMaxConnections);
  pgMaxConnections = isNaN(pgMaxConnections) ? -1 : pgMaxConnections;

  response.status(200).json({
    updated_at: updatedAt,
    pg_version: pgVersion,
    pg_max_connections: pgMaxConnections,
  });
}
