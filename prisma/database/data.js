const { readFileSync } = require('fs')
const { resolve } = require('path')

const categories = [
  {
    id: 1,
    name: 'principais',
    description: 'Pratos principais'
  },
  {
    id: 2,
    name: 'mais_vendidos',
    description: 'Produtos mais vendidos',
  },
  {
    id: 3,
    name: 'sobremesas',
    description: 'Sobremesas',
  },
  {
    id: 4,
    name: 'bebidas',
    description: 'Bebidas',
  }
]

const users = [
  {
    id: 1,
    email: 'admin@admin.com',
    name: 'admin',
    admin: true,
    password: '$2a$10$gl75s.NS0nDvVaENFWKSaOyfDiaPGAM6AmwL5HtzJVkOaQ9D8KwI.',
  },
  {
    id: 2,
    email: 'user@user.com',
    name: 'admin',
    admin: false,
    password: '$2a$10$NddwXmOQerz1kY.k6ZkpUeQIKOU41Ncb5mLvzekiqnmeqG0uh7FqW',
  }
]

const products = [
  {
    id: 1,
    name: 'Pão com mortadela',
    description: 'Pão francês (pão de sal) salgado feito com trigo, com mortadela por dentro',
    price: 5,
    image_id: '4e8ccd93-cffe-4704-95e8-09c20da8ebb9'
  },
  {
    id: 2,
    name: 'Pão com salame',
    description: 'Pão francês (pão de sal) salgado feito com trigo, com salame por dentro',
    price: 3,
    image_id: '4e8ccd93-cffe-4704-95e8-09c20da8ebb9'
  },
  {
    id: 3,
    name: 'Água mineral',
    description: 'Garrafa de água mineral, com água líquida por dentro',
    price: 1,
    image_id: '01065e55-1c36-49da-b7ab-d96ac207fea3'
  },

]

const images = [
  {
    id: '4e8ccd93-cffe-4704-95e8-09c20da8ebb9',
    image_data: readFileSync(resolve(__dirname, 'images', '4e8ccd93-cffe-4704-95e8-09c20da8ebb9.png')),
    image_type: 'image/png',
    image_name: '4e8ccd93-cffe-4704-95e8-09c20da8ebb9.png'
  },
  {
    id: '01065e55-1c36-49da-b7ab-d96ac207fea3',
    image_data: readFileSync(resolve(__dirname, 'images', '01065e55-1c36-49da-b7ab-d96ac207fea3.png')),
    image_type: 'image/png',
    image_name: '01065e55-1c36-49da-b7ab-d96ac207fea3.png'
  }
]

const productCategory = [
  {
    fk_id_category: 1,
    fk_id_product: 1
  },
  {
    fk_id_category: 1,
    fk_id_product: 2
  },
  {
    fk_id_category: 2,
    fk_id_product: 2
  },
  {
    fk_id_category: 2,
    fk_id_product: 3
  },
  {
    fk_id_category: 2,
    fk_id_product: 3
  }
]

const ingredients = []

const productIngredient = []

module.exports = Object.freeze({
  users,
  categories,
  products,
  images,
  productCategory,
  ingredients,
  productIngredient
})