import React from 'react';
import PropTypes from 'prop-types'
import {loginAction} from './actions'
import loginService from './loginService.js'
import { connect } from 'react-redux'

const inputStyle={'marginLeft':'10px'}
const loginErrMsg = 'Login failed. Please try again.'

class Login extends React.Component {
    constructor(props) {
    super(props);
    this.state = {account:'', password:'', errMsg:'', loginClass:''};
  }

  passwordChange=(e)=>{
    this.setState({password: e.target.value})
  }

  accountChange=(e)=>{
    this.setState({account: e.target.value})
  }



  getAccessToken= async (account, password)=>{    
    this.setState({loginClass:'blinkClass'})
    let errMsg=''
    try {
      let respObj = await loginService(account, password) 
      this.setState({errMsg: '', loginClass:''})
      this.props.afterLogin(respObj.access_token, respObj.fullName)
    } catch(e) {
      console.log(new Error(e))
      errMsg = loginErrMsg
      // can't move this setState after catch.
      // It will report warning in console log since 
      // afterLogin() already unmount login component
      this.setState({errMsg , loginClass:''}) 
    }
  }
  
  handleSubmit = (e)=>{
    e.preventDefault()
    this.getAccessToken(this.state.account, this.state.password)
  }

  render() {
    return (
      <div>
        <h1>Please login</h1>
        <form action='' onSubmit={this.handleSubmit}>
            <input type='text' value={this.state.account} onChange={this.accountChange}
              placeholder='email address' style={inputStyle}/>
            <input type='password'  value={this.state.password} onChange={this.passwordChange}
              placeholder='password' style={inputStyle}/>
            <input type='submit' value='Login' style={inputStyle} className={this.state.loginClass}/>
            <p>{this.state.errMsg}</p>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  afterLogin: PropTypes.func.isRequired
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    afterLogin: (accessToken, account)=> {
      dispatch(loginAction({accessToken, account}));
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Login);

