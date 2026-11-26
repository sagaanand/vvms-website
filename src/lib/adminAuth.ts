import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "vvms_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "vvms-local-session-secret"
  );
}

export function createAdminSessionToken(): string {
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = `admin:${expiresAt}`;
  const sig = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");
  return `${payload}:${sig}`;
}

export function verifyAdminSessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(":");
  if (parts.length !== 3) return false;
  const [role, expiresStr, sig] = parts;
  if (role !== "admin") return false;
  const expiresAt = Number(expiresStr);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;

  const expectedSig = crypto
    .createHmac("sha256", getSecret())
    .update(`${role}:${expiresStr}`)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(sig, "utf8"),
      Buffer.from(expectedSig, "utf8")
    );
  } catch {
    return false;
  }
}

export function isAdminAuthenticated(): boolean {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get(COOKIE_NAME)?.value;
    return verifyAdminSessionToken(sessionCookie);
  } catch {
    return false;
  }
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
export const ADMIN_COOKIE_MAX_AGE = SESSION_MAX_AGE_SECONDS;
