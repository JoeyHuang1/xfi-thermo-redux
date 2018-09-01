import React from 'react';
import Thermo from './Thermo.js'
import PropTypes from 'prop-types';
import thermoListService from './thermoListService.js'
import {gotSeedsAction} from './actions'
import { connect } from 'react-redux'

const noDevErrMsg='No thermostat found.'
const noHCDevErrMsg = 'No heat/cool thermostat found.'

class ThermoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errMsg:'', accountClass:''};
    this.getThermoList = this.getThermoList.bind(this)
  }

  componentDidMount() {
    this.getThermoList()
  }


  async getThermoList(){
    this.setState({accountClass:'blinkClass'})
    let thermoList=[]
    try {
      thermoList = await thermoListService(this.props.accessToken) 

      if (thermoList!=={}) 
        this.setState({ errMsg:'', accountClass:''})
      else 
        this.setState({errMsg: noHCDevErrMsg, accountClass:''})
    } catch(e) {
      console.log(new Error(e))
      this.setState({ errMsg: noDevErrMsg, accountClass:''})
    }
    this.props.gotThermos(thermoList)
  }
  
  listThermo=()=>{
    let thermoList=[]
    for (let key in this.props.thermos){
      let thermo = this.props.thermos[key]
      thermoList.push(<Thermo key={thermo.seedId}
        seedId={thermo.seedId}/>)
    }
    return thermoList
  }

  render() {
    return (
      <div>
        <h1>Account 
          <span className={this.state.accountClass}> {this.props.account} </span>
        </h1>
        <p>{this.state.errMsg}</p>
        {this.listThermo()}
      </div>
    );
  }
}

ThermoList.propTypes = {
  account: PropTypes.string.isRequired,
  gotThermos:PropTypes.func.isRequired
};

const mapStateToProps = function(state) {
  return {...state.loginReducer, ...state.thermoListReducer};
}

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    gotThermos: (seeds)=> {dispatch(gotSeedsAction(seeds))},
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThermoList);
