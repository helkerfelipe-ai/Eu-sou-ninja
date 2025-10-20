import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "../../shared/const";
import { getUser } from "../db";
import { ENV } from "./env";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;

  try {
    // Extract JWT from cookie
    const cookies = opts.req.headers.cookie || "";
    const cookieMatch = cookies.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
    
    if (cookieMatch && cookieMatch[1]) {
      const token = cookieMatch[1];
      
      // Verify JWT
      const decoded = jwt.verify(token, ENV.cookieSecret) as { userId: string };
      
      // Load user from database
      if (decoded.userId) {
        user = await getUser(decoded.userId) || null;
      }
    }
  } catch (error) {
    // Authentication is optional for public procedures
    user = null;
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}

