import Sequelize from 'sequelize';
import decamelize from 'decamelize';

import configOptions from '../config/config';

const env = process.env.NODE_ENV || 'development';
const config = configOptions[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

sequelize.addHook('beforeDefine', (attributes) => {
    Object.keys(attributes).forEach((key) => {
        if (typeof attributes[key] !== 'function') {
            attributes[key].field = decamelize(key);
        }
    });
});

const models = {
    Recipe: sequelize.import('./recipe'),
    User: sequelize.import('./user'),
};

Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;
models.op = Sequelize.Op;

export default models;
