export interface Post {
  title: string;
  title_en: string;
  thumbnail: string;
  content: string;
  content_en: string;
  images: string[];
  publishedDate: string;
  authorId: string;
  author: string;
  metadata: {
    brand: string;
    country: string;
    year: string;
  };
}
