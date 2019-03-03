import formatErrors from '../formatErrors';

export default {
    Query: {
        getIngredients: async (parent, args, { models }) => {
            const ingredients = models.Ingredient.findAll({
                raw: true,
            });

            return ingredients;
        },
    },
    Mutation: {
        createIngredient: async (parent, args, { models }) => {
            try {
                const ingredient = await models.Ingredient.create({
                    ...args,
                });

                return { ok: true, ingredient };
            } catch (err) {
                return { ok: false, errors: formatErrors(err, models) };
            }
        },
    },
};
