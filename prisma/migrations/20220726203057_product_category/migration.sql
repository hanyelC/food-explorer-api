/*
  Warnings:

  - You are about to drop the `products_ingredients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "products_ingredients" DROP CONSTRAINT "products_ingredients_fk_id_ingredient_fkey";

-- DropForeignKey
ALTER TABLE "products_ingredients" DROP CONSTRAINT "products_ingredients_fk_id_product_fkey";

-- DropTable
DROP TABLE "products_ingredients";

-- CreateTable
CREATE TABLE "product_ingredient" (
    "fk_id_product" INTEGER NOT NULL,
    "fk_id_ingredient" INTEGER NOT NULL,

    CONSTRAINT "product_ingredient_pkey" PRIMARY KEY ("fk_id_product","fk_id_ingredient")
);

-- CreateTable
CREATE TABLE "product_category" (
    "fk_id_product" INTEGER NOT NULL,
    "fk_id_category" INTEGER NOT NULL,

    CONSTRAINT "product_category_pkey" PRIMARY KEY ("fk_id_product","fk_id_category")
);

-- AddForeignKey
ALTER TABLE "product_ingredient" ADD CONSTRAINT "product_ingredient_fk_id_product_fkey" FOREIGN KEY ("fk_id_product") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_ingredient" ADD CONSTRAINT "product_ingredient_fk_id_ingredient_fkey" FOREIGN KEY ("fk_id_ingredient") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_category" ADD CONSTRAINT "product_category_fk_id_product_fkey" FOREIGN KEY ("fk_id_product") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_category" ADD CONSTRAINT "product_category_fk_id_category_fkey" FOREIGN KEY ("fk_id_category") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
