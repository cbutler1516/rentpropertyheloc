/**
 * Authorizes admin test-lead requests.
 * Non-production: allowed without a token.
 * Production: requires ADMIN_TEST_TOKEN via Authorization or x-admin-test-token.
 */
export function isAdminTestAuthorized(request: Request): boolean {
  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  const expected = process.env.ADMIN_TEST_TOKEN?.trim();
  if (!expected) {
    return false;
  }

  const authorization = request.headers.get("authorization");
  if (authorization?.startsWith("Bearer ")) {
    return authorization.slice("Bearer ".length) === expected;
  }

  const headerToken = request.headers.get("x-admin-test-token");
  return headerToken === expected;
}
