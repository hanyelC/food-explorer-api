const { PrismaClient } = require("@prisma/client");
const {
  users,
  products,
  categories,
  images,
  productCategory,
  ingredients,
  productIngredient,
} = require("./data");

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.user.createMany({
      data: users,
      skipDuplicates: true,
    });

    await prisma.category.createMany({
      data: categories,
      skipDuplicates: true,
    });

    await prisma.image.createMany({
      data: images,
      skipDuplicates: true,
    });

    await prisma.product.createMany({
      data: products,
      skipDuplicates: true,
    });

    await prisma.productCategory.createMany({
      data: productCategory,
      skipDuplicates: true,
    });

    await prisma.ingredient.createMany({
      data: ingredients,
      skipDuplicates: true,
    });

    await prisma.productIngredient.createMany({
      data: productIngredient,
      skipDuplicates: true
    }

    );
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
