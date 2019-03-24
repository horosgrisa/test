const {
  Group,
  sequelize,
} = require('../../models');

const getGroup = async (name) => {
  try {
    const groupWrap = (await Group.findOne({ where: { name } }));
    const { createdAt, updatedAt, ...group } = groupWrap.toJSON();

    return group;
  } catch (error) {
    throw error;
  }
};

const getGroups = async () => {
  try {
    const groupWrap = (await Group.findAll());
    const groups = groupWrap.map(group => group.toJSON()).map(({ createdAt, updatedAt, ...group }) => group);

    return groups;
  } catch (error) {
    throw error;
  }
};

const createGroup = async ({
  name,
  ...ACLs
}) => {
  try {
    const groupWrap = await Group.create({ name, ...ACLs });
    const { createdAt, updatedAt, ...group } = groupWrap.toJSON();

    return group;
  } catch (error) {
    throw error;
  }
};

const changeGroup = async (name, ACLs) => {
  try {
    const group = await Group.findOne({ where: { name } });
    const updatedGroup = await group.update(ACLs);
    const { createdAt, updatedAt, ...groupClean } = updatedGroup.toJSON();

    return groupClean;
  } catch (error) {
    throw error;
  }
};

const deleteGroup = async (name) => {
  try {
    await Group.destroy({ where: { name } });

    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getGroup,
  getGroups,
  createGroup,
  changeGroup,
  deleteGroup,
};
