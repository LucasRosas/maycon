import { Post, PrismaClient } from "~/lib/generated/prisma";

export default defineEventHandler(async (): Promise<Post[]> => {
  const prisma = new PrismaClient();
  const posts = await prisma.post.findMany({
    orderBy: {
      publishedDate: "desc",
    },
  });
  return posts;
});
