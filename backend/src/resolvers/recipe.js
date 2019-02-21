export default {
    Query: {
        getRecipes: async (parent, args, { models }) => {
            const recipes = models.Recipe.findAll({
                raw: true,
            });

            return recipes;
        },
    },
    Mutation: {
        createRecipe: async (parent, { name }, { models }) => false,
    },
};
