const {
  getGroup,
  getGroups,
  createGroup,
  deleteGroup,
  changeGroup,
} = require('./group');

test('Create group with name "new"', async () => {
  expect((await createGroup({
    name: 'new',
  })).name).toBe('new');
});

test('Get group with name "new"', async () => {
  expect((await getGroup('new')).name).toBe('new');
});

test('Change group with name "new"', async () => {
  expect((await changeGroup('new', {
    aclEditUser: true,
  })).name).toBe('new');
});

test('Delete group with name "new"', async () => {
  expect((await deleteGroup('new'))).toBe(true);
});
