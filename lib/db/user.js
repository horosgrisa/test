const {
  User,
  sequelize,
} = require('../../models');

const getUser = async (login) => {
  try {
    const userWrap = (await User.findOne({ where: { login } }));
    const user = userWrap.toJSON();

    return {
      login: user.login,
      name: user.name,
      active: user.active,
    };
  } catch (error) {
    throw error;
  }
};

const getUsers = async () => {
  try {
    const users = await User.findAll();
    return (users.map((user) => {
      const userJSON = user.toJSON();
      return { login: userJSON.login, name: userJSON.name, active: userJSON.active };
    }));
  } catch (error) {
    throw error;
  }
};


const createUser = async ({
  login, name, password, active,
}) => {
  try {
    const userWrap = await User.create({
      login, name, password, active,
    });
    const user = userWrap.toJSON();

    return {
      login: user.login,
      name: user.name,
      active: user.active,
    };
  } catch (error) {
    throw error;
  }
};

const changeUser = async (login, {
  name, active, password,
}) => {
  try {
    const user = await User.findOne({ where: { login } });
    const updatedUser = await user.update({ name, active, password });

    return {
      login: user.login,
      name: user.name,
      active: user.active,
    };
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (login) => {
  try {
    await User.destroy({ where: { login } });


    return true;
  } catch (error) {
    throw error;
  }
};

const checkUserPassword = async (login, password) => {
  try {
    const user = await User.findOne({ where: { login, password, active: true } });
    if (!user.toJSON()) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  changeUser,
  deleteUser,
  checkUserPassword,
};
