import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {mount, render, shallow} from 'enzyme';

import ReactTestUtils from 'react-addons-test-utils'; // ES6

chai.use(chaiEnzyme());
const expect = chai.expect;

import Chatroom from '../../../client/components/chatroom';
import NavBar from '../../../client/components/navbar';
import TopBar from '../../../client/components/topbar';
import Messages from '../../../client/components/messages';
import EnterMessage from '../../../client/components/entermessage';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const muiTheme = getMuiTheme();                                                   

const shallowWithContext = (node) => {                                            
  return shallow(node, {                                                          
    context: {muiTheme},                                                          
    childContextTypes: {muiTheme: React.PropTypes.object}                         
  });                                                                             
};                                                                                 
                                                                                  
const mountWithContext = (node) => {                                              
  return mount(node, {                                                            
    context: {muiTheme},                                                          
    childContextTypes: {muiTheme: React.PropTypes.object}                         
  });                                                                             
};


describe('Chatroom Component', function () {

  const wrapper = shallowWithContext(<Chatroom params={{ username: 'oleg', reponame: 'assessment' }} />);

  it('should contain NavBar', function () {
    expect(wrapper).to.have.descendants(NavBar);
  });

  it('should contain TopBar', function () {
    expect(wrapper).to.have.descendants(TopBar);
  });

  it('should contain Messages if this.state.username is loaded', function () {
    wrapper.setState({ username: 'marcus' });
    expect(wrapper).to.have.descendants(Messages);
  });

  it('should contain EnterMessage if this.state.username is loaded', function () {
    wrapper.setState({ username: 'marcus' });
    expect(wrapper).to.have.descendants(EnterMessage);
  });

  it('should not contain Messages if this.state.username is blank', function () {
    wrapper.setState({ username: '' });
    expect(wrapper).to.not.have.descendants(Messages);
  });

  it('should not contain EnterMessage if this.state.username is blank', function () {
    wrapper.setState({ username: '' });
    expect(wrapper).to.not.have.descendants(EnterMessage);
  });

  it('should pass username, photo, channels, changeChannel, sendEmailInvite, inviteSent, into NavBar', function () {
    wrapper.setState({ username: 'marcus', userAvatarUrl: 'face', channels: 'gittalk' });
    expect(wrapper.find(NavBar)).to.have.props(['username', 'photo', 'channels', 'changeChannel', 'sendEmailInvite', 'inviteSent']);
  });

  it('should pass reponame into TopBar', function () {
    expect(wrapper.contains(<TopBar reponame='assessment' />)).to.equal(true);
  });

  it('should pass messages into Messages', function () {
    wrapper.setState({ username: 'marcus' });
    expect(wrapper.find(Messages)).to.have.props(['messages']);
  });

  it('should pass username, chatroomId, userAvatarUrl, and reponame into EnterMessage', function () {
    wrapper.setState({ username: 'marcus', userAvatarUrl: 'face', channels: 'gittalk' });
    expect(wrapper.find(EnterMessage)).to.have.props(['username', 'chatroomId', 'userAvatarUrl', 'reponame']);
  });

});
