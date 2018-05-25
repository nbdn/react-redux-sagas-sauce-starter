import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../Images/logo.svg';
import './Styles/RootContainer.css';

class RootContainer extends Component {
  render() {
    const { username } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            React / Redux / ReduxSagas / ReduxSauce STARTER
          </h1>
        </header>
        <h3>Welcome {username},</h3>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.login.username
  };
};

export default connect(mapStateToProps, null)(RootContainer);
