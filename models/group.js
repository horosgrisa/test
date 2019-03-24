
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: { type: DataTypes.STRING(64), unique: true, primaryKey: true },
    aclEditUser: { type: DataTypes.BOOLEAN, defaultValue: false },
    aclDeleteUser: { type: DataTypes.BOOLEAN, defaultValue: false },
    aclAddUser: { type: DataTypes.BOOLEAN, defaultValue: false },
    aclActivateUser: { type: DataTypes.BOOLEAN, defaultValue: false },
    aclDeactivateUser: { type: DataTypes.BOOLEAN, defaultValue: false },
    aclAddUserToGroup: { type: DataTypes.BOOLEAN, defaultValue: false },
    aclCreateGroup: { type: DataTypes.BOOLEAN, defaultValue: false },
    aclDeleteGroup: { type: DataTypes.BOOLEAN, defaultValue: false },
    aclChangeGroupPermissions: { type: DataTypes.BOOLEAN, defaultValue: false },
  }, {});
  Group.associate = function (models) {
    Group.belongsToMany(models.User, {
      through: models.UserGroup,
      foreignKey: 'groupId',
      as: 'users',
    });
  };
  return Group;
};
