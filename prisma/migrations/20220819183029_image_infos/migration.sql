/*
  Warnings:

  - You are about to drop the column `image` on the `images` table. All the data in the column will be lost.
  - Added the required column `imageData` to the `images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageName` to the `images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageType` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "images" DROP COLUMN "image",
ADD COLUMN     "imageData" BYTEA NOT NULL,
ADD COLUMN     "imageName" TEXT NOT NULL,
ADD COLUMN     "imageType" TEXT NOT NULL;
