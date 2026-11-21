export async function register() {
  if (process.env.NODE_ENV === "production" && process.env.ADMIN_DEV_BYPASS === "true") {
    throw new Error("Refusing to start: ADMIN_DEV_BYPASS is true in production.");
  }
}
