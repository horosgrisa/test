const express = require('express');
const asyncHandler = require('express-async-handler');
const { hasPermision, getPermisions } = require('../lib/acl');

const {
  getGroup,
  getGroups,
  createGroup,
  deleteGroup,
  changeGroup,
} = require('../lib/db/group');

const router = express.Router();

/**
 * @api {get} /rest/group/:name Request Group
 * @apiName GetGroup
 * @apiGroup Group

 * @apiParam {String} name Group unique name.

 * @apiSuccess {String} name Name of group.
 * @apiSuccess {Boolean} aclEditUser Group can edit user info
  * @apiSuccess {Boolean} aclDeleteUser Group can delete users
  * @apiSuccess {Boolean} aclAddUser Group can add users
  * @apiSuccess {Boolean} aclActivateUser Group can activate user
  * @apiSuccess {Boolean} aclDeactivateUser Group can  deactivate user
  * @apiSuccess {Boolean} aclAddUserToGroup Group can add user into group
  * @apiSuccess {Boolean} aclCreateGroup Group can create group
  * @apiSuccess {Boolean} aclDeleteGroup Group can delete group
  * @apiSuccess {Boolean} aclChangeGroupPermissions Group can change group permisions
*/
router.get('/:name', asyncHandler(async (req, res) => {
  const group = await getGroup(req.params.name);

  res.send(group);
}));

/**
 * @api {get} /rest/group/ Request Groups
 * @apiName GetGroups
 * @apiGroup Group

 * @apiSuccess {Array} group Array of groups
 * @apiSuccess {String} group.name Name of group
 * @apiSuccess {Boolean} group.aclEditUser Group can edit user info
  * @apiSuccess {Boolean} group.aclDeleteUser Group can delete users
  * @apiSuccess {Boolean} group.aclAddUser Group can add users
  * @apiSuccess {Boolean} group.aclActivateUser Group can activate user
  * @apiSuccess {Boolean} group.aclDeactivateUser Group can  deactivate user
  * @apiSuccess {Boolean} group.aclAddUserToGroup Group can add user into group
  * @apiSuccess {Boolean} group.aclCreateGroup Group can create group
  * @apiSuccess {Boolean} group.aclDeleteGroup Group can delete group
  * @apiSuccess {Boolean} group.aclChangeGroupPermissions Group can change group permisions
*/
router.get('/', asyncHandler(async (req, res) => {
  const groups = await getGroups();

  res.send(groups);
}));

/**
 * @api {post} /rest/group/ Create Group
 * @apiName CreateGroup
 * @apiGroup Group

  * @apiParam {String} name Group unique name.
  * @apiParam {Boolean} [aclEditUser] Group can edit user info
  * @apiParam {Boolean} [aclDeleteUser] Group can delete users
  * @apiParam {Boolean} [aclAddUser] Group can add users
  * @apiParam {Boolean} [aclActivateUser] Group can activate user
  * @apiParam {Boolean} [aclDeactivateUser] Group can  deactivate user
  * @apiParam {Boolean} [aclAddUserToGroup] Group can add user into group
  * @apiParam {Boolean} [aclCreateGroup] Group can create group
  * @apiParam {Boolean} [aclDeleteGroup] Group can delete group
  * @apiParam {Boolean} [aclChangeGroupPermissions] Group can change group permisions

  * @apiSuccess {String} name Group unique name.
  * @apiSuccess {Boolean} [aclEditUser] Group can edit user info
  * @apiSuccess {Boolean} [aclDeleteUser] Group can delete users
  * @apiSuccess {Boolean} [aclAddUser] Group can add users
  * @apiSuccess {Boolean} [aclActivateUser] Group can activate user
  * @apiSuccess {Boolean} [aclDeactivateUser] Group can  deactivate user
  * @apiSuccess {Boolean} [aclAddUserToGroup] Group can add user into group
  * @apiSuccess {Boolean} [aclCreateGroup] Group can create group
  * @apiSuccess {Boolean} [aclDeleteGroup] Group can delete group
  * @apiSuccess {Boolean} [aclChangeGroupPermissions] Group can change group permisions
*/
router.post('/', asyncHandler(async (req, res) => {
  if (!await hasPermision(req.session.user, 'aclCreateGroup')) {
    res.send(403, 'You can\'t  do this');
    return -1;
  }

  if (!req.body.name) {
    res.send(400, { err: 'send name' });
    return -1;
  }

  const params = {};
  if (req.body.name) {
    params.name = req.body.name;
  }

  try {
    const group = await createGroup(params);

    res.send(group);
  } catch (error) {
    res.send(500, { err: 'Group Not Created' });
  }
}));

/**
 * @api {patch} /rest/group/:name Change Group
 * @apiName ChangeGroup
 * @apiGroup Group

  * @apiParam {Boolean} [aclEditUser] Group can edit user info
  * @apiParam {Boolean} [aclDeleteUser] Group can delete users
  * @apiParam {Boolean} [aclAddUser] Group can add users
  * @apiParam {Boolean} [aclActivateUser] Group can activate user
  * @apiParam {Boolean} [aclDeactivateUser] Group can  deactivate user
  * @apiParam {Boolean} [aclAddUserToGroup] Group can add user into group
  * @apiParam {Boolean} [aclCreateGroup] Group can create group
  * @apiParam {Boolean} [aclDeleteGroup] Group can delete group
  * @apiParam {Boolean} [aclChangeGroupPermissions] Group can change group permisions
*/
router.patch('/:name', asyncHandler(async (req, res) => {
  if (!await hasPermision(req.session.user, 'aclChangeGroupPermissions')) {
    res.send(403, 'You can\'t  do this');
    return -1;
  }

  try {
    const modifiedGroup = await changeGroup(req.params.name, req.body);

    res.send(modifiedGroup);
  } catch (error) {
    res.send(400, { err: 'Group Can\'t changed ' });
  }
}));

/**
 * @api {delete} /rest/group/:name Delete Group
 * @apiName DeleteGroup
 * @apiGroup Group
*/
router.delete('/:name', asyncHandler(async (req, res) => {
  if (!await hasPermision(req.session.user, 'aclDeleteGroup')) {
    res.send(403, 'You can\'t  do this');
    return -1;
  }

  try {
    await deleteGroup(req.params.name);
    res.send({ msg: 'Group deleted' });
    return 0;
  } catch (error) {
    res.send({ err: 'Group wasn\'tdeleted' });
    return -1;
  }
}));

module.exports = router;
