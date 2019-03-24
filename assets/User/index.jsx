import React, { Fragment } from 'react';
import '@babel/polyfill';

import { sendData } from '../helpers/ajax.js';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      permisions: {
        aclEditUser: false,
        aclDeleteUser: false,
        aclAddUser: false,
        aclActivateUser: false,
        aclDeactivateUser: false,
        aclAddUserToGroup: false,
        aclCreateGroup: false,
        aclDeleteGroup: false,
        aclChangeGroupPermissions: false,
      },
    };

    this.loginInput = React.createRef();
    this.nameInput = React.createRef();
    this.passwordInput = React.createRef();


    this.changeUserName = this.changeUserName.bind(this);
    this.activateUser = this.activateUser.bind(this);
    this.deactivateUser = this.deactivateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  async componentDidMount() {
    try {
      await Promise.all([this.fetchUsers(), this.fetchPermisions()]);
    } catch (error) {
      throw error;
    }
  }


  async fetchUsers() {
    try {
      const users = await sendData('/rest/user', 'GET');
      this.setState({
        users,
      });
    } catch (error) {
      throw error;
    }
  }

  async fetchPermisions() {
    try {
      const permisions = await sendData('/rest/user/permisions', 'GET');

      this.setState({
        permisions,
      });
    } catch (error) {
      throw error;
    }
  }


  async changeUserName(login) {
    const name = prompt('Change User Name');

    try {
      const changedName = await sendData(`/rest/user/${login}`, 'PATCH', { name });

      this.fetchUsers();
    } catch (error) {
      throw error;
    }
  }

  async activateUser(login) {
    const activatedUser = await sendData(`/rest/user/${login}`, 'PATCH', { active: true });

    this.fetchUsers();
  }

  async deactivateUser(login) {
    const deactivatedUser = await sendData(`/rest/user/${login}`, 'PATCH', { active: false });

    this.fetchUsers();
  }

  async deleteUser(login) {
    const deletedUser = await sendData(`/rest/user/${login}`, 'DELETE');

    this.fetchUsers();
  }

  async createUser(event) {
    event.preventDefault();

    const login = this.loginInput.current.value;
    const name = this.nameInput.current.value;
    const password = this.passwordInput.current.value;

    await sendData('/rest/user/', 'POST', {
      login,
      name,
      password,
    });

    this.fetchUsers();
  }

  render() {
    const { users, permisions } = this.state;
    const {
      changeUserName, activateUser, deactivateUser, deleteUser,
    } = this;

    return (
      <Fragment>

        <div className="container">
          <h2>List of Users</h2>
          <div className="row">
            <form onSubmit={this.createUser}>
              <div className="input-field col s6">
                <input placeholder="Login" id="login" type="text" className="validate" ref={this.loginInput} />
                <label htmlFor="login">Login</label>
              </div>
              <div className="input-field col s6">
                <input placeholder="Name" id="name" type="text" className="validate" ref={this.nameInput} />
                <label htmlFor="name">Name</label>
              </div>
              <div className="input-field col s6">
                <input placeholder="Password" id="password" type="text" className="validate" ref={this.passwordInput} />
                <label htmlFor="password">Password</label>
              </div>
              <button type="submit" disabled={!permisions.aclAddUser} className="waves-effect waves-light btn">Add user</button>

            </form>
          </div>

          <div>
            <table>
              <thead>
                <tr>
                  <td>User login</td>
                  <td>User Name</td>
                  <td>Edit</td>
                </tr>
              </thead>
              <tbody>
                {users ? users.map(user => (
                  <tr key={user.login}>
                    <td>
                      {user.login}
                    </td>
                    <td>
                      {user.name}
                    </td>
                    <td>
                      <button
                        type="button"
                        disabled={!permisions.aclEditUser}
                        onClick={() => changeUserName(user.login)}
                        className="waves-effect waves-light btn"
                      >
Edit
                      </button>
                      {user.active
                        ? (
                          <button
                            type="button"
                            disabled={!permisions.aclDeactivateUser}
                            onClick={() => deactivateUser(user.login)}
                            className="waves-effect waves-light btn"
                          >
Deactivate
                          </button>
                        )
                        : (
                          <button
                            type="button"
                            disabled={!permisions.aclActivateUser}
                            onClick={() => activateUser(user.login)}
                            className="waves-effect waves-light btn"
                          >
Activate
                          </button>
                        )
                      }
                      <button
                        type="button"
                        disabled={!permisions.aclDeleteUser}
                        onClick={() => deleteUser(user.login)}
                        className="waves-effect waves-light btn"
                      >
Delete
                      </button>
                    </td>
                  </tr>
                )) : null}
              </tbody>
            </table>
          </div>

        </div>

      </Fragment>
    );
  }
}
