/*
  Warnings:

  - Added the required column `content_en` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title_en` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "content_en" TEXT NOT NULL,
ADD COLUMN     "title_en" TEXT NOT NULL;
