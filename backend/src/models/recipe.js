export default (sequelize, DataTypes) => {
    const Recipe = sequelize.define('recipe', {
        name: {
            type: DataTypes.STRING,
        },
        steps: {
            type: DataTypes.STRING(10000),
            get() {
                return JSON.parse(this.getDataValue('steps'));
            },
            set(stepsArr) {
                if (stepsArr == null) stepsArr = [];
                return this.setDataValue('steps', JSON.stringify(stepsArr));
            },
            defaultValue: [], // Unsure if this is checked before or after the "set" method. If it's after, I should change it to '[]'
        },
    });

    Recipe.associate = (models) => {
        Recipe.belongsToMany(models.Ingredient, {
            through: models.RecipeIngredient,
            foreignKey: {
                name: 'recipeId',
                field: 'recipe_id',
            },
        });
        Recipe.belongsToMany(models.User, {
            through: models.RecipeUser,
            foreignKey: {
                name: 'recipeId',
                field: 'recipe_id',
            },
        });
    };

    return Recipe;
};
