import { publicProcedure, router } from "./trpc";
import { z } from "zod";

import { healthRouter } from "./routes/health/route";
import { authRouter } from "./routes/auth/route";

export const serverRouter = router({
  auth: authRouter,



  
  // chaicode: publicProcedure
  //   .meta({ openapi: { method: "GET", path: "/chaicode" } })
  //   .input(z.object({ email: z.email(), name: z.string().optional(), age: z.number().optional() }))
  //   .output(z.object({ message: z.string() }))
  //   .query(async ({ input }) => {
  //     return {
  //       message: `Hello ${input.name || "there"}!
  //                 Your email is ${input.email}
  //                 and you are ${input.age || "ageless"}.

  //                 This is a response from the chaicode endpoint.`.trim(),
  //     }
  //   })
});

export { createContext } from "./context";
export type ServerRouter = typeof serverRouter;
