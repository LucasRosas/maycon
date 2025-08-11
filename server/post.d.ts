// model Post {
//   id            String   @id @default(uuid())
//   title         String
//   content       String
//   publishedDate DateTime
//   authorId      String
//   author String
//   images        String[]
//   metadata      Json
//   createdAt    DateTime @default(now())
//   updatedAt    DateTime @updatedAt
//   deletedAt    DateTime?
// }

export interface Post {
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
