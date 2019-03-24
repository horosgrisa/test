
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('UserGroups', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.STRING,
      references: { model: 'Users', key: 'login' },
      onDelete: 'CASCADE',

    },
    groupId: {
      type: Sequelize.STRING,
      references: { model: 'Groups', key: 'name' },
      onDelete: 'CASCADE',

    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('UserGroups'),
};
