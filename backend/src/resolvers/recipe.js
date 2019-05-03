import pick from 'lodash/pick';
import formatErrors from '../formatErrors';
import { requiresAuth, requiresEditor } from '../permissions';
import { linkedQueryId } from '../linkedQueries';

export default {
    Query: {
        getRecipes: async (parent, { ingredientsRaw }, { models }) => {
            if (!ingredientsRaw || ingredientsRaw.length === 0) {
                const allRecipes = await models.Recipe.findAll({});
                return allRecipes;
            }

            const foundRecipes = await linkedQueryId({
                returnModel: models.Recipe,
                midModel: models.RecipeIngredient,
                keyModel: models.Ingredient,
                id: ingredientsRaw,
            });

            foundRecipes.forEach((recipe) => {
                recipe.steps = JSON.parse(recipe.steps);

                const numMatchedIngredients = recipe.quantities.reduce(
                    (total, recipeIngredient) => (ingredientsRaw.includes(recipeIngredient.ingredient.id) ? total + 1 : total),
                    0,
                );

                recipe.matchScore = Math.floor((numMatchedIngredients / recipe.quantities.length) * 1000 + numMatchedIngredients);
            });

            foundRecipes.sort((a, b) => b.matchScore - a.matchScore);

            return foundRecipes;
        },
    },
    Mutation: {
        createRecipe: requiresAuth.createResolver(async (parent, args, { models }) => {
            try {
                const recipeData = pick(args, ['name', 'steps', 'description', 'rating', 'imgURL', 'fat', 'protein', 'sodium', 'calories']);
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
