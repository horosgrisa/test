
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    login: { type: DataTypes.STRING(64), unique: true, primaryKey: true },
    name: {
      type: DataTypes.STRING,
    },
    password: DataTypes.STRING,
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
  }, {});
  User.associate = function (models) {
    User.belongsToMany(models.Group, {
      through: models.UserGroup,
      foreignKey: 'userId',
      as: 'groups',

    });
  };
  return User;
};
