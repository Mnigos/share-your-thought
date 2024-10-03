import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();
const publicProcedure = t.procedure;

const appRouter = t.router({
  user: t.router({
    login: publicProcedure.input(z.object({
      id: z.string(),
      name: z.string(),
      createdAt: z.date(),
    }).pick({ name: true })).output(z.object({
      id: z.string(),
      name: z.string(),
      createdAt: z.date(),
    })).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    byName: publicProcedure.input(z.string()).output(z.object({
      id: z.string(),
      name: z.string(),
      createdAt: z.date(),
    })).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  }),
  thoughts: t.router({
    all: publicProcedure.output(z.array(z.object({
      id: z.string(),
      content: z.string(),
      author: z.object({
        id: z.string(),
        name: z.string(),
        createdAt: z.date(),
      }),
      createdAt: z.date(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  }),
  thought: t.router({
    create: publicProcedure.input(z.object({
      id: z.string(),
      content: z.string(),
      author: z.object({
        id: z.string(),
        name: z.string(),
        createdAt: z.date(),
      }),
      createdAt: z.date(),
    }).pick({
      content: true,
    }).extend({
      authorId: z.string(),
    })).output(z.object({
      id: z.string(),
      content: z.string(),
      author: z.object({
        id: z.string(),
        name: z.string(),
        createdAt: z.date(),
      }),
      createdAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    edit: publicProcedure.input(z.object({
      id: z.string(),
      content: z.string(),
      author: z.object({
        id: z.string(),
        name: z.string(),
        createdAt: z.date(),
      }),
      createdAt: z.date(),
    }).pick({
      content: true,
      id: true,
    })).output(z.object({
      id: z.string(),
      content: z.string(),
      author: z.object({
        id: z.string(),
        name: z.string(),
        createdAt: z.date(),
      }),
      createdAt: z.date(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    byId: publicProcedure.input(z.string()).output(z.object({
      id: z.string(),
      content: z.string(),
      author: z.object({
        id: z.string(),
        name: z.string(),
        createdAt: z.date(),
      }),
      createdAt: z.date(),
    })).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  })
});
export type AppRouter = typeof appRouter;

