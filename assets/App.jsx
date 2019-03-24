import React, { Fragment } from 'react';

import Main from './Main/index.jsx';
import User from './User/index.jsx';
import Group from './Group/index.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: 'GROUPS' };
  }

  render() {
    const { selected } = this.state;
    return (
      <Fragment>
        <nav>
          <div className="nav-wrapper">
            <a className="brand-logo" onClick={() => { this.setState((state, props) => ({ selected: 'MAIN' })); }}>Logo</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a onClick={() => { this.setState((state, props) => ({ selected: 'USERS' })); }}>Users</a></li>
              <li><a onClick={() => { this.setState((state, props) => ({ selected: 'GROUPS' })); }}>Groups</a></li>
              <li><a href="/login/logout">Logout</a></li>
            </ul>
          </div>
        </nav>
        <main>
          {selected === 'MAIN' ? <Main /> : null}
          {selected === 'USERS' ? <User /> : null}
          {selected === 'GROUPS' ? <Group /> : null}
        </main>
      </Fragment>
    );
  }
}
