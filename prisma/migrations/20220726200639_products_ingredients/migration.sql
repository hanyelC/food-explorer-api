-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products_ingredients" (
    "fk_id_product" INTEGER NOT NULL,
    "fk_id_ingredient" INTEGER NOT NULL,

    CONSTRAINT "products_ingredients_pkey" PRIMARY KEY ("fk_id_product","fk_id_ingredient")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_name_key" ON "products"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ingredients_name_key" ON "ingredients"("name");

-- AddForeignKey
ALTER TABLE "products_ingredients" ADD CONSTRAINT "products_ingredients_fk_id_product_fkey" FOREIGN KEY ("fk_id_product") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_ingredients" ADD CONSTRAINT "products_ingredients_fk_id_ingredient_fkey" FOREIGN KEY ("fk_id_ingredient") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
