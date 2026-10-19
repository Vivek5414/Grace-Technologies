export function loginMessage(reason?: string): string | null {
  if (reason === "setup") return "Authentication is not configured. Add the Supabase project URL and publishable key, then apply the database migration.";
  if (reason === "not-admin") return "This account does not have administrator access.";
  if (reason === "sign-in") return "Sign in to continue to the admin area.";
  return null;
}
