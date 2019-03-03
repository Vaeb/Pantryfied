import formatErrors from '../formatErrors';
import { requiresAuth } from '../permissions';

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
        createRecipe: requiresAuth.createResolver(async (parent, args, { models }) => {
            try {
                const recipe = await models.Recipe.create({
                    ...args,
                });

                return { ok: true, recipe };
            } catch (err) {
                return { ok: false, errors: formatErrors(err, models) };
            }
        }),
    },
};
