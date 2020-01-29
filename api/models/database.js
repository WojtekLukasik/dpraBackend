import config from '../../config/config';
import fs from 'fs';
import path from 'path';
import Sequelize, { DataTypes } from 'sequelize';

const sequelize = new Sequelize (config.db.database,
config.db.user, config.db.password, {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
});

const db = {};

fs.readdirSync(__dirname).filter(function (file) {
    return (file.indexOf(".") !== 0) 
    && (file !== "database.js")
    && (file.slice(-3) === '.js');
}).forEach(function (file) {
    console.log(file);
    let model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;