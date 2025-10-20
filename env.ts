export const ENV = {
  cookieSecret: process.env.JWT_SECRET ?? "default-secret-change-in-production",
  databaseUrl: process.env.DATABASE_URL ?? "",
  isProduction: process.env.NODE_ENV === "production",
};
