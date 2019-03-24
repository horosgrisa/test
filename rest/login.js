const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();

const {
  checkUserPassword,
} = require('../lib/db/user');

/**
 * @api {get} /rest/login Login Request
 * @apiName Login In System
 * @apiGroup Login

 * @apiParam {String} login User login.
 * @apiParam {String} name User name.
 * @apiParam {String} password User password.

 * @apiSuccess {String} login User login.
 * @apiSuccess {String} name User name.
 * @apiSuccess {String} password User password.
*/
router.post('/', asyncHandler(async (req, res) => {
  if (!req.body.login || !req.body.password) {
    res.send(400, { err: 'Missing login or password ' });
    return -1;
  }

  try {
    const user = await checkUserPassword(req.body.login, req.body.password);

    if (user) {
      req.session.isAuthorized = true;
      req.session.user = req.body.login;
      res.send({ msg: 'Logined successeful' });
      return 0;
    }

    res.send(403, { err: 'Error in login or password ' });
    return -1;
  } catch (error) {
    res.send(403, { err: 'Error in login or password ' });
    return -1;
  }
}));

module.exports = router;
