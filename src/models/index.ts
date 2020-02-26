import Sequelize from 'sequelize';
import * as cls from 'continuation-local-storage';
import * as fs from 'fs';
import * as path from 'path';
import sequelizeConfig from '@/config/config.json';
import env from '@/config/env';
import { UserAttributes, UserInstance } from './user';

export interface SequelizeModels {
  User: Sequelize.Model<UserInstance, UserAttributes>;
}
// db environment housekeeping. Point to my env
const environment: string = env.NODE_ENV || 'development';

class Database {
  private basename: string;

  private models: SequelizeModels;

  private sequelize: Sequelize.Sequelize;

  constructor() {
    this.basename = path.basename(__filename);
    const config = sequelizeConfig[environment];
    if (environment === 'test') config.logging = false;
    (Sequelize as any).cls = cls.createNamespace('sequelize-transaction');
    this.sequelize = new Sequelize(config.url, config);
    this.models = {} as any;

    fs.readdirSync(__dirname)
      .filter(file => file.indexOf('.') !== 0 && file !== this.basename && file.slice(-3) === '.js')
      .forEach((file: string) => {
        const model = this.sequelize.import(path.join(__dirname, file));
        this.models[(model as any).name] = model;
      });

    Object.keys(this.models).forEach((modelName: string) => {
      if (typeof this.models[modelName].associate === 'function') {
        this.models[modelName].associate(this.models);
      }
    });
  }

  getModels(): SequelizeModels {
    return this.models;
  }

  getSequelize(): Sequelize.Sequelize {
    return this.sequelize;
  }
}

const database = new Database();
export const models = database.getModels();
export const sequelize = database.getSequelize();
