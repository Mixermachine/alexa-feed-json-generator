'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Pieces extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Pieces.init({
        uuid: {
            allowNull: false,
            defaultValue: Sequelize.uuid,
            primaryKey: true,
            type: Sequelize.UUID
        },
        filePath: DataTypes.STRING,
        title: DataTypes.STRING,
        redirectUrl: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Pieces',
    });
    return Pieces;
};