-- CreateTable
CREATE TABLE "Favorite" (
    "fk_id_user" INTEGER NOT NULL,
    "fk_id_product" INTEGER NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("fk_id_user","fk_id_product")
);

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_fk_id_product_fkey" FOREIGN KEY ("fk_id_product") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
