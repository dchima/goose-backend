import * as Sequelize from 'sequelize';

// model attributes interface to keep ts happy

export interface UserAttributes {
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  verified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// still not sure how sequelize is creating this instance
export type UserInstance = Sequelize.Instance<UserAttributes> & UserAttributes;

// okay, sorta familiar with these next steps. let's declare the fields
export const User = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<UserInstance, UserAttributes> => {
  // had to add a types.d.ts file in src/ to map below attribute
  const attributes: SequelizeAttributes<UserAttributes> = {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  };
  return sequelize.define<UserInstance, UserAttributes>('User', attributes);
};
