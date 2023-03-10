import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = dirname(__filename)

export const categories = Object.freeze([
  {
    id: 1,
    name: 'principais',
    description: 'Pratos principais',
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
  },
])

export const users = Object.freeze([
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
  },
])

export const products = Object.freeze([
  {
    id: 1,
    name: 'Pão com mortadela',
    description:
      'Pão francês (pão de sal) salgado feito com trigo, com mortadela por dentro',
    price: 5,
    image_id: '4e8ccd93-cffe-4704-95e8-09c20da8ebb9',
    ingredients: ['Pão de sal', 'Mortadela'],
  },
  {
    id: 2,
    name: 'Pão com salame',
    description:
      'Pão francês (pão de sal) salgado feito com trigo, com salame por dentro',
    price: 3,
    image_id: '4e8ccd93-cffe-4704-95e8-09c20da8ebb9',
    ingredients: ['Pão de sal', 'Salame'],
  },
  {
    id: 3,
    name: 'Água mineral',
    description: 'Garrafa de água mineral, com água líquida por dentro',
    price: 1,
    image_id: '01065e55-1c36-49da-b7ab-d96ac207fea3',
    ingredients: ['Água líquida', 'Garrafa'],
  },
  {
    id: 4,
    name: 'Farofa',
    description: 'Ovos de galinha mexidos com óleo e farinha de mandioca',
    price: 10,
    image_id: 'cdb4047d-562a-438d-9741-581f1946f5c8',
    ingredients: ['Ovos', 'Farinha', 'Óleo'],
  },
])

export const images = Object.freeze([
  {
    id: '4e8ccd93-cffe-4704-95e8-09c20da8ebb9',
    image_data: readFileSync(
      resolve(__dirname, 'images', '4e8ccd93-cffe-4704-95e8-09c20da8ebb9.png')
    ),
    image_type: 'image/png',
    image_name: '4e8ccd93-cffe-4704-95e8-09c20da8ebb9.png',
  },
  {
    id: '01065e55-1c36-49da-b7ab-d96ac207fea3',
    image_data: readFileSync(
      resolve(__dirname, 'images', '01065e55-1c36-49da-b7ab-d96ac207fea3.png')
    ),
    image_type: 'image/png',
    image_name: '01065e55-1c36-49da-b7ab-d96ac207fea3.png',
  },
  {
    id: 'cdb4047d-562a-438d-9741-581f1946f5c8',
    image_data: readFileSync(
      resolve(__dirname, 'images', 'cdb4047d-562a-438d-9741-581f1946f5c8.jpg')
    ),
    image_type: 'image/png',
    image_name: 'cdb4047d-562a-438d-9741-581f1946f5c8.jpg',
  },
])

export const productCategory = Object.freeze([
  {
    fk_id_category: 1,
    fk_id_product: 1,
  },
  {
    fk_id_category: 1,
    fk_id_product: 2,
  },
  {
    fk_id_category: 1,
    fk_id_product: 4,
  },
  {
    fk_id_category: 2,
    fk_id_product: 2,
  },
  {
    fk_id_category: 2,
    fk_id_product: 3,
  },
  {
    fk_id_category: 4,
    fk_id_product: 3,
  },
])
