import React, { Component } from 'react';
import './App.css';
import Login from './Login.js'
import ThermoList from './ThermoList.js'
import { connect } from 'react-redux'

class App extends Component {


  render() {
      if (this.props.accessToken==null){
        return (<Login/>)
      }
      else {
        return(<ThermoList />)
      }
  }
}

const mapStateToProps = function(state) {
  return {...state.loginReducer};
}

export default connect(
  mapStateToProps
)(App);