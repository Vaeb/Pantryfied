export default (sequelize, DataTypes) => {
    const Ingredient = sequelize.define('ingredient', {
        name: DataTypes.STRING(1000),
    });

    return Ingredient;
};
