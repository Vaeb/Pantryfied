export default (sequelize, DataTypes) => {
    const Recipe = sequelize.define('recipe', {
        name: DataTypes.STRING(1000),
    });

    return Recipe;
};
