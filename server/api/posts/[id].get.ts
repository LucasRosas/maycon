import { PrismaClient } from "~/lib/generated/prisma";
import { H3Event } from "h3";

export default defineEventHandler(async (event: H3Event) => {
  const { id } = getRouterParams(event);
  const prisma = new PrismaClient();
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  return post;
});
