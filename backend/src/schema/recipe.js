export default `

    type Recipe {
        id: Int!
        name: String!
        quantities: [RecipeIngredient!]!
        steps: [String!]!
        editors: [User!]!
    }

    type RecipeIngredient {
        ingredient: Ingredient!
        quantity: Int!
        unit: String
    }

    input RecipeIngredientRaw {
        ingredientId: Int!
        quantity: Int!
        unit: String
    }

    type CreateRecipeResponse {
        ok: Boolean!
        recipe: Recipe
        errors: [Error!]
    }

    type Query {
        getRecipes(ingredientsRaw: [Int!]): [Recipe!]!
    }

    type Mutation {
        createRecipe(name: String!, quantitiesRaw: [RecipeIngredientRaw!], steps: [String!], testing: Int): CreateRecipeResponse!
        addRecipeIngredient(recipeId: Int!, ingredientId: Int!, quantity: Int!, unit: String): CreateRecipeResponse!
    }

`;
