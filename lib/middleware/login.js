const path = require('path');
const express = require('express');

const router = express.Router();

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

router.get('/', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../../views/login.html`));
});


module.exports = router;
