const { getUserGroups } = require('./db/usergroup');

const sumOfACL = arrayOfACLs => arrayOfACLs.reduce((acc, ACL) => ({
  aclEditUser: acc.aclEditUser || ACL.aclEditUser,
  aclDeleteUser: acc.aclDeleteUser || ACL.aclDeleteUser,
  aclAddUser: acc.aclAddUser || ACL.aclAddUser,
  aclActivateUser: acc.aclActivateUser || ACL.aclActivateUser,
  aclDeactivateUser: acc.aclDeactivateUser || ACL.aclDeactivateUser,
  aclAddUserToGroup: acc.aclAddUserToGroup || ACL.aclAddUserToGroup,
  aclCreateGroup: acc.aclCreateGroup || ACL.aclCreateGroup,
  aclDeleteGroup: acc.aclDeleteGroup || ACL.aclDeleteGroup,
  aclChangeGroupPermissions: acc.aclChangeGroupPermissions || ACL.aclChangeGroupPermissions,
}), {
  aclEditUser: false,
  aclDeleteUser: false,
  aclAddUser: false,
  aclActivateUser: false,
  aclDeactivateUser: false,
  aclAddUserToGroup: false,
  aclCreateGroup: false,
  aclDeleteGroup: false,
  aclChangeGroupPermissions: false,
});

const getPermisions = async (login) => {
  const usergroups = await getUserGroups(login);
  console.log(sumOfACL(usergroups));
  return sumOfACL(usergroups);
};

const hasPermision = async (login, permision) => (await getPermisions(login))[permision];

module.exports.getPermisions = getPermisions;
module.exports.hasPermision = hasPermision;
