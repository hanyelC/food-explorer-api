/*
  Warnings:

  - You are about to drop the column `imageData` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `imageName` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `imageType` on the `images` table. All the data in the column will be lost.
  - Added the required column `image_data` to the `images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_name` to the `images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_type` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "images" DROP COLUMN "imageData",
DROP COLUMN "imageName",
DROP COLUMN "imageType",
ADD COLUMN     "image_data" BYTEA NOT NULL,
ADD COLUMN     "image_name" TEXT NOT NULL,
ADD COLUMN     "image_type" TEXT NOT NULL;
