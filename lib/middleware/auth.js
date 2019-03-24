const auth = mode => (req, res, next) => {
  if (req.session && req.session.isAuthorized) return next();

  if (mode === 'redirect') {
    return res.redirect(302, '/login');
  }

  res.send(401, { err: 'Not authorized' });
};


module.exports = auth;
