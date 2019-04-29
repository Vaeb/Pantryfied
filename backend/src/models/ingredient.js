export default (sequelize, DataTypes) => {
    const Ingredient = sequelize.define('ingredient', {
        name: DataTypes.STRING(1000),
    });

    Ingredient.associate = (models) => {
        Ingredient.belongsToMany(models.Recipe, {
            through: models.RecipeIngredient,
            foreignKey: {
                name: 'ingredientId',
                field: 'ingredient_id',
            },
        });
    };

    return Ingredient;
};
