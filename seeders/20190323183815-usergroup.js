module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('UserGroups', [{
    userId: 'admin',
    groupId: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    userId: 'default',
    groupId: 'default',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    userId: 'test',
    groupId: 'test1',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    userId: 'test',
    groupId: 'test2',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    userId: 'test',
    groupId: 'test3',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('UserGroups', null, {}),
};
