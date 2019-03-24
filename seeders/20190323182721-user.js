module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    login: 'admin',
    name: 'Administrator',
    password: 'admin',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),

  }, {
    login: 'default',
    name: 'Default User',
    password: 'default',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),

  }, {
    login: 'test',
    name: 'Test User',
    password: 'test',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
