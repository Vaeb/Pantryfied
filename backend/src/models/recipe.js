export default (sequelize, DataTypes) => {
    const Recipe = sequelize.define('recipe', {
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
        steps: {
            type: DataTypes.STRING(10000),
            get() {
                console.log(123);
                console.log('getting steps', this.getDataValue('steps'), JSON.parse(this.getDataValue('steps')));
                return JSON.parse(this.getDataValue('steps'));
            },
            set(stepsArr) {
                if (stepsArr == null) stepsArr = [];
                return this.setDataValue('steps', JSON.stringify(stepsArr));
            },
            defaultValue: '[]', // Unsure if this is checked before or after the "set" method. If it's after, I should change it to '[]', else []
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
