const express = require('express');
const asyncHandler = require('express-async-handler');
const { hasPermision } = require('../lib/acl');

const router = express.Router();


const {
  getUserGroupsNames,
  setUserGroups,
} = require('../lib/db/usergroup');


router.get('/:login', asyncHandler(async (req, res) => {
  const userGroups = await getUserGroupsNames(req.params.login);

  res.send(userGroups);
}));


router.patch('/:login', asyncHandler(async (req, res) => {
  if (!await hasPermision(req.session.user, 'aclAddUserToGroup')) {
    res.send(403, 'You can\'t  do this');
    return -1;
  }

  const userGroups = await setUserGroups(req.params.login, req.body);

  res.send(userGroups);
  return 0;
}));


module.exports = router;
