import React, { Fragment } from 'react';
import '@babel/polyfill';

import { sendData } from '../helpers/ajax.js';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
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

    this.nameInput = React.createRef();


    this.deleteGroup = this.deleteGroup.bind(this);

    this.createGroup = this.createGroup.bind(this);
  }

  async componentDidMount() {
    try {
      await Promise.all([this.fetchGroups(), this.fetchPermisions()]);
    } catch (error) {
      throw error;
    }
  }


  async fetchGroups() {
    try {
      const groups = await sendData('/rest/group', 'GET');
      this.setState({
        groups,
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

  async createGroup(event) {
    event.preventDefault();

    const name = this.nameInput.current.value;

    await sendData('/rest/group/', 'POST', {
      name,
    });

    this.fetchGroups();
  }


  async deleteGroup(name) {
    const deletedGroup = await sendData(`/rest/group/${name}`, 'DELETE');

    this.fetchGroups();
  }


  render() {
    const { groups, permisions } = this.state;
    const {
      deleteGroup,
    } = this;

    return (
      <Fragment>

        <div className="container">
          <h2>List of Groups</h2>
          <div className="row">
            <form onSubmit={this.createGroup}>

              <div className="input-field col s12">
                <input placeholder="Group Name" id="name" type="text" className="validate" ref={this.nameInput} />
                <label htmlFor="name">Group Name</label>
              </div>

              <button type="submit" disabled={!permisions.aclCreateGroup} className="waves-effect waves-light btn">Add group</button>

            </form>
          </div>

          <div>
            <table>
              <thead>
                <tr>
                  <td>Group Name</td>
                  <td>Edit</td>
                </tr>
              </thead>
              <tbody>
                {groups ? groups.map(group => (
                  <tr key={group.name}>

                    <td>
                      {group.name}
                    </td>
                    <td>


                      <button
                        type="button"
                        disabled={!permisions.aclDeleteGroup}
                        onClick={() => deleteGroup(group.name)}
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
