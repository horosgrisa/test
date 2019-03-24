
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Groups', {
    name: { type: Sequelize.STRING(64), unique: true, primaryKey: true },
    aclEditUser: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    aclDeleteUser: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    aclAddUser: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    aclActivateUser: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    aclDeactivateUser: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    aclAddUserToGroup: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    aclCreateGroup: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    aclDeleteGroup: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    aclChangeGroupPermissions: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Groups'),
};
