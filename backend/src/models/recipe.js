export default (sequelize, DataTypes) => {
    const Recipe = sequelize.define('recipe', {
        name: {
            type: DataTypes.STRING, // set
            unique: true,
        },
        steps: {
            type: DataTypes.STRING(10000), // set
            get() {
                return JSON.parse(this.getDataValue('steps'));
            },
            set(stepsArr) {
                if (stepsArr == null) stepsArr = [];
                return this.setDataValue('steps', JSON.stringify(stepsArr));
            },
            defaultValue: '[]', // Unsure if this is checked before or after the "set" method. If it's after, I should change it to '[]', else []
        },
        description: {
            type: DataTypes.STRING, // set
        },
        rating: {
            type: DataTypes.INTEGER, // set
        },
        imgURL: {
            type: DataTypes.STRING(1000), // set
        },
        fat: {
            type: DataTypes.INTEGER,
        },
        protein: {
            type: DataTypes.INTEGER,
        },
        sodium: {
            type: DataTypes.INTEGER,
        },
        calories: {
            type: DataTypes.INTEGER,
        },
        tags: {
            type: DataTypes.STRING(500), // set
            defaultValue: '[]',
        },
        preparationMinutes: {
            type: DataTypes.INTEGER, // set
        },
        cookingMinutes: {
            type: DataTypes.INTEGER, // set
        },
        servings: {
            type: DataTypes.INTEGER, // set
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
