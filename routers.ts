Text file: routers.ts
Latest content with line numbers:
2	import { getSessionCookieOptions } from "./_core/cookies";
3	import { systemRouter } from "./_core/systemRouter";
4	import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
5	import { z } from "zod";
6	import * as db from "./db";
7	import jwt from "jsonwebtoken";
8	import { ENV } from "./_core/env";
9	
10	export const appRouter = router({
11	  system: systemRouter,
12	
13	  auth: router({
14	    me: publicProcedure.query(opts => opts.ctx.user),
15	    
16	    logout: publicProcedure.mutation(({ ctx }) => {
17	      const cookieOptions = getSessionCookieOptions(ctx.req);
18	      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
19	      return {
20	        success: true,
21	      } as const;
22	    }),
23	
24	    login: publicProcedure
25	      .input(z.object({
26	        email: z.string().email(),
27	        password: z.string().min(6),
28	      }))
29	      .mutation(async ({ input, ctx }) => {
30	        const user = await db.verifyPassword(input.email, input.password);