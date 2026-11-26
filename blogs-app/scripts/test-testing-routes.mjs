const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

async function assertStatus(res, expectedStatus, label) {
  const bodyText = await res.text();
  let body;
  try {
    body = bodyText ? JSON.parse(bodyText) : null;
  } catch {
    body = bodyText;
  }

  if (res.status !== expectedStatus) {
    throw new Error(
      `${label} failed: expected ${expectedStatus}, got ${res.status}. Response: ${JSON.stringify(body)}`
    );
  }

  console.log(`PASS: ${label} (${res.status})`, body ?? "");
  return body;
}

async function runDevChecks() {
  console.log(`Testing against ${BASE_URL}...\n`);

  // 1. Reset database
  const resetRes = await fetch(`${BASE_URL}/api/testing/reset`, {
    method: "DELETE",
  });
  await assertStatus(resetRes, 200, "DELETE /api/testing/reset");

  // 2. Create test user
  const createUserRes = await fetch(`${BASE_URL}/api/testing/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "testuser",
      name: "Test User",
      password: "testpass123",
    }),
  });
  const createdUser = await assertStatus(
    createUserRes,
    201,
    "POST /api/testing/users"
  );

  if (!createdUser || createdUser.username !== "testuser") {
    throw new Error("Created user did not match expected username 'testuser'");
  }

  // 3. Reset again so test data does not linger
  const resetAfterRes = await fetch(`${BASE_URL}/api/testing/reset`, {
    method: "DELETE",
  });
  await assertStatus(resetAfterRes, 200, "Cleanup DELETE /api/testing/reset");
}

async function runProductionGuardCheck() {
  console.log(`\nChecking production guard on ${BASE_URL}...\n`);

  const resetProdRes = await fetch(`${BASE_URL}/api/testing/reset`, {
    method: "DELETE",
  });
  await assertStatus(
    resetProdRes,
    403,
    "Production guard on DELETE /api/testing/reset"
  );

  const createProdRes = await fetch(`${BASE_URL}/api/testing/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "testuser",
      name: "Test User",
      password: "testpass123",
    }),
  });
  await assertStatus(
    createProdRes,
    403,
    "Production guard on POST /api/testing/users"
  );
}

const mode = process.argv[2] || "dev";

try {
  if (mode === "prod") {
    await runProductionGuardCheck();
  } else {
    await runDevChecks();
  }
  console.log("\nAll checks passed.");
} catch (err) {
  console.error("\nCheck failed:", err.message);
  process.exit(1);
}