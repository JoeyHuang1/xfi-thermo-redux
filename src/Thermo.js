import React from 'react';
import ThermoSlider from './ThermoSlider.js'
import PropTypes from 'prop-types';
import thermoService from './thermoService.js'
import { connect } from 'react-redux'


class Thermo extends React.Component {
  handleChange = async (value)=>{
    let newVal=this.state.temperature
    try {
      newVal = await thermoService(this.props.seedId, value)?value:newVal
    } catch(e) {
      console.log(new Error(e))
    }
  }
  
  render() {
    const thermoTitleStyle={width:'30%', 'maxWidth':'300px', 'minWidth':'100px', display:'inline-block'}
    return (
      <div>
        <p/>
        <div style={thermoTitleStyle}>
          <span>Thermostat {this.props.name}:</span>
          <span className={this.props.tempeClass}> {this.props.temperature} </span>
        </div>
        <ThermoSlider seedId={this.props.seedId}
        />
      </div>
    );
  }
}

Thermo.propTypes = {
  seedId:PropTypes.string.isRequired,
};

const mapStateToProps = function(state, ownProps) {
  let tempeClass=
        state.thermoListReducer.thermos[ownProps.seedId].isChanging?
        'blinkClass':''
  return {...state.loginReducer, 
      'temperature':
        state.thermoListReducer.thermos[ownProps.seedId].temperature,
      tempeClass
    };
}


export default connect(
  mapStateToProps
)(Thermo);