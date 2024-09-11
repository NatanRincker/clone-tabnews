test("API EndPoint | GET | ", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();
  console.log(responseBody);

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  const pgVersion = responseBody.pg_version;
  expect(typeof pgVersion).toBe("string");
  pgVersionIsEmpty = pgVersion.length > 0 ? false : true;
  expect(pgVersionIsEmpty).toBe(false);

  const pgMaxConnections = responseBody.pg_max_connections;
  expect(typeof pgMaxConnections).toBe("number");
});
