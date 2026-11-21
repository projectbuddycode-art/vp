import "server-only";

export function paymentBypassEnabled() {
  return process.env.PAYMENT_BYPASS_MODE === "true";
}

export function assertAdminBypassSafe() {
  if (process.env.NODE_ENV === "production" && process.env.ADMIN_DEV_BYPASS === "true") {
    throw new Error("ADMIN_DEV_BYPASS cannot be enabled when NODE_ENV=production.");
  }
}

export function adminDevBypassAllowed() {
  assertAdminBypassSafe();
  if (process.env.ADMIN_DEV_BYPASS !== "true") return false;
  if (process.env.NODE_ENV === "production") return false;
  return true;
}
