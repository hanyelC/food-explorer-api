-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_fk_id_product_fkey";

-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_fk_id_user_fkey";

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_fk_id_product_fkey" FOREIGN KEY ("fk_id_product") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
