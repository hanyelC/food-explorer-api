/*
  Warnings:

  - You are about to drop the `ingredients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_ingredient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ingredients" DROP CONSTRAINT "ingredients_image_id_fkey";

-- DropForeignKey
ALTER TABLE "product_ingredient" DROP CONSTRAINT "product_ingredient_fk_id_ingredient_fkey";

-- DropForeignKey
ALTER TABLE "product_ingredient" DROP CONSTRAINT "product_ingredient_fk_id_product_fkey";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "ingredients" TEXT[];

-- DropTable
DROP TABLE "ingredients";

-- DropTable
DROP TABLE "product_ingredient";
