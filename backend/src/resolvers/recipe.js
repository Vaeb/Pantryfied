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
        createRecipe: async (parent, args, { models }) => {
            console.log(1);
            try {
                console.log(2);
                const recipe = await models.Recipe.create({
                    ...args,
                });
                console.log(3);
                console.log(recipe);

                return { ok: true, recipe };
            } catch (err) {
                console.log(4);
                console.log(err);
                return { ok: false, errors: [{ path: 'Database recipe insertion', message: String(err) }] };
            }
        },
    },
};
