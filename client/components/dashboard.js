import React from 'react';
import { Link, browserHistory } from 'react-router';
import RepoList from './repoList.js';
import Profile from './profile.js';
import {getUser, getUserRepos } from './../api/user/userRequest.js';
import { init } from '../api/chatroom/chatroomRequest.js';

import Paper from 'material-ui/Paper';
import { grey200 } from './../util/colorScheme';

class Dashboard extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      repos: [],
      user: null
    }

    /* this bindings for methods */
    this.navToChatroom = this.navToChatroom.bind(this);
  }

  navToChatroom(name) {
    // Initiate chatroom
    init(name).then(() => {
      browserHistory.push(`/rooms/${name}`);
    }).catch(err => { 
      console.log(err); 
    });
  }

  componentDidMount() {
    /* Fetch all user public repos */
    getUserRepos().then(repos => {
      this.setState({ repos: repos });
    }).catch(err => console.log(err));

    getUser().then(user => {
      this.setState({ user: user });
    }).catch(err => console.log(err));
  }

  render () {
    return (
      <div style={ styles.dashboardContainer } >
        <Paper style={ styles.listContainer } zDepth={ 2 }>
          <RepoList navToChatroom={this.navToChatroom} repos={this.state.repos}/>
        </Paper>
        <Paper style={ styles.profileContainer } zDepth={ 2 }>
          { this.state.user ? <Profile user={ this.state.user } /> : null }
        </Paper>
      </div>
    )
  }
}

const styles = {
  dashboardContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  listContainer: {
    minWidth: '400px',
    flexGrow: '2',
    marginRight: '10px'
  },
  profileContainer: {
    height: '100%',
    minWidth: '400px',
    flexGrow: '1',
    position: 'relative'
  }
};

export default Dashboard;
