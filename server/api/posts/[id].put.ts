import { PrismaClient } from "~/lib/generated/prisma";

interface Post {
  id: string;
  title: string;
  metadata: {
    brand: string;
    country: string;
    year: number;
  };
  thumbnail: string;
  content: string;
  images: string[];
  publishedDate: Date;
  authorId: string;
  author: string;
}

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  const data = await readBody<Post>(event);
  const prisma = new PrismaClient();
  const post = await prisma.post.update({
    where: {
      id,
    },
    data: data,
  });
  return post;
});
