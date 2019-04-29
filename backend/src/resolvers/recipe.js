import pick from 'lodash/pick';
import formatErrors from '../formatErrors';
import { requiresAuth, requiresEditor } from '../permissions';
import { linkedQueryId, linkedQuery } from '../linkedQueries';

export default {
    Query: {
        getRecipes: async (parent, { ingredientsRaw }, { models }) => {
            if (!ingredientsRaw || ingredientsRaw.length === 0) {
                const allRecipes = await models.Recipe.findAll({});
                console.log(allRecipes[0]);
                return allRecipes;
            }

            const foundRecipes = await linkedQueryId({
                returnModel: models.Recipe,
                midModel: models.RecipeIngredient,
                keyModel: models.Ingredient,
                id: ingredientsRaw,
            });

            return foundRecipes;
        },
    },
    Mutation: {
        createRecipe: requiresAuth.createResolver(async (parent, args, { models }) => {
            try {
                const recipeData = pick(args, ['name', 'steps']);
                const recipe = await models.Recipe.create({ ...recipeData });

                if (args.quantitiesRaw && args.quantitiesRaw.length > 0) {
                    const insertRows = args.quantitiesRaw.map(recipeIngredientRaw => ({ recipeId: recipe.id, ...recipeIngredientRaw }));
                    await models.RecipeIngredient.bulkCreate(insertRows);
                }

                return { ok: true, recipe };
            } catch (err) {
                return { ok: false, errors: formatErrors(err, models) };
            }
        }),
        addRecipeIngredient: requiresEditor.createResolver(async (parent, args, { models }) => {
            try {
                await models.RecipeIngredient.create({ ...args });

                const recipe = await models.Recipe.findOne({ id: args.recipeId });

                return { ok: true, recipe };
            } catch (err) {
                return { ok: false, errors: formatErrors(err, models) };
            }
        }),
    },
    Recipe: {
        editors: ({ id: recipeId, editors }, args, { models }) => editors
            || linkedQueryId({
                returnModel: models.User,
                midModel: models.RecipeUser,
                keyModel: models.Recipe,
                id: recipeId,
            }),
        quantities: async ({ id: recipeId, quantities }, args, { models }) => {
            if (quantities) return quantities;

            quantities = (await models.Ingredient.sequelize.query(
                // eslint-disable-next-line max-len
                'select m.quantity, m.unit, m.ingredient_id, u.name from ingredients as u join recipeingredients as m on m.ingredient_id = u.id where m.recipe_id = ?',
                {
                    replacements: [recipeId],
                    model: models.Ingredient,
                    raw: true,
                },
            )).map(queryData => ({
                quantity: queryData.quantity,
                unit: queryData.unit,
                ingredient: { id: queryData.ingredient_id, name: queryData.name },
            }));

            return quantities;
        },
    },
};
