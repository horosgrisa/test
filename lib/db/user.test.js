const {
  getUser,
  getUsers,
  createUser,
  changeUser,
  deleteUser,
} = require('./user');


test('create user with login "new"', async () => {
  expect((await createUser({
    login: 'new',
    name: 'New User',
    password: 'test',
  })).login).toBe('new');
});

test('Get user with login "new"', async () => {
  expect((await getUser('new')).login).toBe('new');
});

test('Change name of user  with login "new"', async () => {
  expect((await changeUser('new', {
    name: 'Changed Name',
  })).name).toBe('Changed Name');
});

test('Delete user with login "new"', async () => {
  expect((await deleteUser('new'))).toBe(true);
});
