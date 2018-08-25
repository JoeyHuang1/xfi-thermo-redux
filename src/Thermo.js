import React from 'react';
import ThermoSlider from './ThermoSlider.js'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'


function Thermo (props){
  const thermoTitleStyle={width:'30%', 'maxWidth':'300px', 'minWidth':'100px', display:'inline-block'}
  return (
    <div>
      <p/>
      <div style={thermoTitleStyle}>
        <span>Thermostat {props.name}:</span>
        <span className={props.tempeClass}> {props.temperature} </span>
      </div>
      <ThermoSlider seedId={props.seedId}
      />
    </div>
  );
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