'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Pieces', {
            uuid: {
                allowNull: false,
                defaultValue: Sequelize.uuid,
                primaryKey: true,
                type: Sequelize.UUID
            },
            filePath: {
                type: Sequelize.STRING
            },
            title: {
                type: Sequelize.STRING
            },
            redirectUrl: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Pieces');
    }
};