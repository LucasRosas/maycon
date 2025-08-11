import { PrismaClient } from "~/lib/generated/prisma";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  const prisma = new PrismaClient();
  const post = await prisma.post.delete({
    where: {
      id,
    },
  });
  return post;
});
