# food-explorer-api

deploy [https://food-explorer-api-m4i7.onrender.com](https://food-explorer-api-m4i7.onrender.com)

## Descrição
Neste desafio, vamos desenvolver o food explorer, um menu interativo para um restaurante fictício.

Você deverá construir uma aplicação de ponta a ponta com front-end e back-end, utilizando as teconologias aprendidas no Explorer, simulando um restaurante de acordo com o layout disponibilizado no Figma. O link do Figma possui o layout de uma aplicação completa que vai desde a visualização de um prato até o pagamento do mesmo, bem como a versão mobile do projeto.

O food explorer terá duas personas: o admin e o usuário;

O admin é a pessoa responsável pelo restaurante, logo, poderá criar, visualizar, editar e apagar um prato a qualquer momento. Cada prato deve conter uma imagem, um nome, uma categoria, uma breve descrição, os ingredientes e o seu preço. Ao clicar em adicionar prato, o admin receberá uma mensagem de sucesso e será redirecionado para a página principal;

O usuário irá visualizar todos os pratos cadastrados e, quando clicar em um prato, será redirecionado para uma nova tela com informações mais detalhadas sobre ele.

## Tecnologias utilizadas
- Javascript
- NodeJs
- PostgreSQL
- express
- Prisma
- jest
- JWT
- docker
- husky

## Instalar e rodar o projeto

### Dependências globais

Você precisa ter duas principais dependências instaladas:

- Node.js LTS v16 (ou qualquer versão superior)
- Docker Engine v17.12.0 com Docker Compose v1.24.1 (ou qualquer versão superior)

### Dependências locais

Então após baixar o repositório, não se esqueça de instalar as dependências locais do projeto:

```bash
npm install
```

### Rodar o projeto

Para rodar o projeto localmente, basta criar o arquivo `.env` igual ao arquivo `.env.example`:

```bash
cp .env.example .env
```

E depois rodar o comando abaixo:
```bash
npm run start:dev
```

Isto irá automaticamente rodar serviços como Banco de dados (incluindo as Migrations e seed) e irá expor um Serviço Web (API) no seguinte endereço:

```bash
http://localhost:3333/
```

Observações:

- Para derrubar todos os serviços, basta utilizar as teclas `CTRL+C`, que é o padrão dos terminais para matar processos e depois rodar o comando `npm run services:stop`.

#### Utilizar usuários pré-cadastrados

Por padrão, ao rodar o comando `npm run start:dev` será injetado dois usuários ativos. Segue abaixo as credenciais deste  usuário (`"email"` + `"senha"`):

- **Usuário Admin**: `"admin@admin.com"` + `"secret"`
- **Usuário Comum**: `"user@user.com"` + `"secret"`

