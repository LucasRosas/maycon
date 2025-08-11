import { PrismaClient } from "~/lib/generated/prisma";

export default defineEventHandler(async () => {
  const prisma = new PrismaClient();
  const posts = await prisma.post.findMany({
    where: {
      publishedDate: {
        lte: new Date(),
      },
    },
    orderBy: {
      publishedDate: "desc",
    },
  });
  return posts;
});
