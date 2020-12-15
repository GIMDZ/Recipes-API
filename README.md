# Recipes-API

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Login](#login)
* [Examples](#examples)

## Overview
This project consists of a CRUD API in NodeJs + Graphql of recipes, users and categories.

## Technologies
Project is created with:

* Node.js
* TypeScript
* GraphQL
* TypeORM
* Express.js
* Apollo Server
* JWT
* MySQL

## Setup
To run this project, you can clone it or download it, following that, install the project locally using npm:

```
$ npm install
$ npm run dev
```
The server will run on port 3000 (you can change the port on the index.ts file)

## Login

To start using this API you must be logged in. In order to do so, you have to register using the signUp mutation (as shown below) and then, log in using the login mutation. After a succesful login, a token will be generated, copy and paste this token on the HTTP Headers as follows:

```
"Authorization": "Bearer: (paste your token here)"
```

## Code Examples
Examples of usage:

1. Go to http://localhost:3000/graphql to access the playground.

2. You can try some queries and mutation, below you have a list of queries to try:

`mutation register {
  signUp(
      name: "gimdz2",
      email: "gimdz2@gmail.com",
      password: "1234"
  )
}
mutation login {
  login(
    email: "gimdz2@gmail.com",
    password: "1234" )
  {
    accessToken
    user{
      name
    }
  }
}
mutation createCategory {
   createCategory(variables: { name: "FastFood" }) {
    id
    name
  }
}
query getCategories {
  getCategories {
		id
    name
  }
}
query getOneCategory {
  getOneCategory(id: 1 ) {
    name
  }
}
mutation updateCat {
  updateCategory( id: 1, fields: { name: "ConfortFood" })
}
mutation deleteCat {
  deleteCategory(id: 4)
}
mutation createRec {
  createRecipe(
    variables: {
      name: "Recipe10"
      description: "Hamburguer10"
      ingredients: "10 burger, 20 cheese, 20 bread"
      category: "ConfortFood"
    }
  )
  {
    id
    name
    description
    ingredients
    category{
      name
    }
  }
}
query getRecipes {
  getRecipes {
		id
    name
    description
    ingredients
     user {
      name
    }
    category {
      name
    }
  }
}
query getOneRecipe {
  getOneRecipe(id: 6 ){
    id
    name
    description
    ingredients
    user{
      name
    }
    category{
      name
    }
  }
}
query getMyRecipes{
  getMyRecipes{
    id
    name
    description
    ingredients
    category{
      name
    }
    user{
      name
    }
  }
}
mutation deleteRec {
  deleteRecipe(id: 4)
}`

## Status
Project is: _in progress_.

There's always room for improvement. 
