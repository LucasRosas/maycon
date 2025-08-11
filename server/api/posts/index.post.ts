import { PrismaClient } from "~/lib/generated/prisma";
import { H3Event } from "h3";

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

export default defineEventHandler(async (event: H3Event) => {
  const data = await readBody<Post>(event);
  console.log("data", data);
  const prisma = new PrismaClient();
  const post = await prisma.post.create({ data: data });
  return post;
});
