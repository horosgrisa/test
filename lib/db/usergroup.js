const {
  User,
  Group,
  sequelize,
} = require('../../models');

const getUserGroups = async (login) => {
  const user = await User.findOne({ where: { login } });
  const userGroupsWrap = await user.getGroups();

  const userGroups = (userGroupsWrap.map(group => group.toJSON()));
  return userGroups;
};

const getUserGroupsNames = async (login) => {
  const user = await User.findOne({ where: { login } });
  const userGroupsWrap = await user.getGroups();

  const userGroups = (userGroupsWrap.map(group => group.toJSON().name));
  return userGroups;
};

const setUserGroups = async (login, groups) => {
  const user = await User.findOne({ where: { login } });
  const groupsWrap = await Promise.all(groups.map(group => Group.findOne({ where: { name: group } })));
  await user.setGroups(groupsWrap);

  const userGroups = await (await user.getGroups()).map(group => group.toJSON().name);

  return userGroups;
};

module.exports = {
  getUserGroups,
  getUserGroupsNames,
  setUserGroups,
};
