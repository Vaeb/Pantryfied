export default `

    type Recipe {
        id: Int!
        name: String!
    }

    type CreateRecipeResponse {
        ok: Boolean!
        recipe: Recipe
        errors: [Error!]
    }

    type Query {
        getRecipes(): [Recipe!]!
    }

    type Mutation {
        createRecipe(name: String!): CreateRecipeResponse!
    }

`;
