const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();

const {
  createUser,
} = require('../lib/db/user');

/**
 * @api {get} /rest/registration Registration Request
 * @apiName Registration In System
 * @apiGroup Registration

 * @apiParam {String} login User login.
 * @apiParam {String} name User name.
 * @apiParam {String} password User password.

 * @apiSuccess {String} login User login.
 * @apiSuccess {String} name User name.
 * @apiSuccess {String} password User password.
*/
router.post('/', asyncHandler(async (req, res) => {
  console.log('::::::', req.body);
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

  const {
    login,
    name,
    password,
  } = req.body;

  try {
    const user = (await createUser({ login, name, password })).toJSON();

    res.send(user);
  } catch (error) {
    console.log(error);
    res.send(409, { err: 'Can\'t register user' });
  }
}));


module.exports = router;
