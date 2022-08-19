-- DropForeignKey
ALTER TABLE "product_category" DROP CONSTRAINT "product_category_fk_id_category_fkey";

-- DropForeignKey
ALTER TABLE "product_category" DROP CONSTRAINT "product_category_fk_id_product_fkey";

-- DropForeignKey
ALTER TABLE "product_ingredient" DROP CONSTRAINT "product_ingredient_fk_id_ingredient_fkey";

-- DropForeignKey
ALTER TABLE "product_ingredient" DROP CONSTRAINT "product_ingredient_fk_id_product_fkey";

-- AddForeignKey
ALTER TABLE "product_ingredient" ADD CONSTRAINT "product_ingredient_fk_id_product_fkey" FOREIGN KEY ("fk_id_product") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_ingredient" ADD CONSTRAINT "product_ingredient_fk_id_ingredient_fkey" FOREIGN KEY ("fk_id_ingredient") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_category" ADD CONSTRAINT "product_category_fk_id_product_fkey" FOREIGN KEY ("fk_id_product") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_category" ADD CONSTRAINT "product_category_fk_id_category_fkey" FOREIGN KEY ("fk_id_category") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
