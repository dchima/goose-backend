import { Sequelize } from 'sequelize';
import * as fs from 'fs';
import * as path from 'path';
import * as sequelizeConfig from '@/config/config';
import env from '@/config/env';

// db environment housekeeping. Point to my env
const basename: string = path.basename(__filename);
const environment: string = env.NODE_ENV || 'development';
const config = sequelizeConfig[environment];

// setup my database
const sequelize = new Sequelize(config.url, config);
if (environment === 'test') config.logging = false;
const db: any = {};

// find module folder and all module files
fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
