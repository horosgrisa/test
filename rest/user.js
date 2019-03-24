const express = require('express');
const asyncHandler = require('express-async-handler');
const { hasPermision, getPermisions } = require('../lib/acl');

const {
  getUser,
  getUsers,
  createUser,
  changeUser,
  deleteUser,
} = require('../lib/db/user');

const router = express.Router();

/**
 * @api {get} /rest/user/permisions Request User Permisions
 * @apiName getPermisions
 * @apiGroup User

 * @apiSuccess {Boolean} aclEditUser User can edit user info
  * @apiSuccess {Boolean} aclDeleteUser User can delete users
  * @apiSuccess {Boolean} aclAddUser User can add users
  * @apiSuccess {Boolean} aclActivateUser User can activate user
  * @apiSuccess {Boolean} aclDeactivateUser User can  deactivate user
  * @apiSuccess {Boolean} aclAddUserToGroup User can add user into group
  * @apiSuccess {Boolean} aclCreateGroup User can create group
  * @apiSuccess {Boolean} aclDeleteGroup User can delete group
  * @apiSuccess {Boolean} aclChangeGroupPermissions User can change group permisions
*/
router.get('/permisions', asyncHandler(async (req, res) => {
  res.send(await getPermisions(req.session.user));
}));

router.get('/:login', asyncHandler(async (req, res) => {
  const user = getUser(req.params.login);
  res.send(user);
}));

router.get('/', asyncHandler(async (req, res) => {
  const users = await getUsers();
  res.send(users);
}));

/**
 * @api {get} /rest/user Create User
 * @apiName createUser
 * @apiGroup User

 * @apiParam {String} login User login.
 * @apiParam {String} name User name.
 * @apiParam {String} password User password.

 * @apiSuccess {String} login User login.
 * @apiSuccess {String} name User name.
 * @apiSuccess {String} password User password.

*/
router.post('/', asyncHandler(async (req, res) => {
  if (!await hasPermision(req.session.user, 'aclAddUser')) {
    res.send(403, 'You can\'t  do this');
    return -1;
  }
  if (!req.body.login) {
    res.send(400, { err: 'send login' });
    return -1;
  }
  if (!req.body.name) {
    res.send(400, { err: 'send name' });
    return -1;
  }
  if (!req.body.password) {
    res.send(400, { err: 'send password' });
    return -1;
  }
  const { login, name, password } = req.body;
  const active = req.body.active == null ? true : req.body.active;

  try {
    const user = await createUser({
      login, name, password, active,
    });
    res.send(user);
  } catch (error) {
    res.send(500, { err: 'User Not Created' });
    return -1;
  }
  return 0;
}));


router.patch('/:login', asyncHandler(async (req, res) => {
  if (req.body.name) {
    if (!await hasPermision(req.session.user, 'aclEditUser')) {
      res.send(403, 'You can\'t  do this');
      return -1;
    }
    const user = await changeUser(req.params.login, {
      ...req.body,
    });
    res.send({ user });
    return 0;
  }
  if (req.body.password) {
    if (!await hasPermision(req.session.user, 'aclEditUser')) {
      res.send(403, 'You can\'t  do this');
      return -1;
    }
    const user = await changeUser(req.params.login, {
      ...req.body,
    });
    res.send(user);
    return 0;
  }


  if (req.body.active === true) {
    if (!await hasPermision(req.session.user, 'aclActivateUser')) {
      res.send(403, 'You can\'t  do this');
      return -1;
    }
    const user = await changeUser(req.params.login, {
      ...req.body,
    });
    res.send(user);
    return 0;
  }

  if (req.body.active === false) {
    if (!await hasPermision(req.session.user, 'aclDeactivateUser')) {
      res.send(403, 'You can\'t  do this');
      return -1;
    }
    const user = await changeUser(req.params.login, {
      ...req.body,
    });
    res.send(user);
    return 0;
  }

  return 0;
}));

router.delete('/:login', asyncHandler(async (req, res) => {
  try {
    await deleteUser(req.params.login);
    res.send({ msg: 'User was deleted' });

    return 0;
  } catch (error) {
    res.send(403, { err: "Can't delete user" });
    return -1;
  }
}));


module.exports = router;
