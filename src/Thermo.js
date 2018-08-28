import React from 'react';
import thermoService from './thermoService.js'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import 'rc-slider/assets/index.css';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import {setTempeDoneAction} from './actions'

const minTempe=50
const maxTempe=90
const sliderStyle={display:'inline-block', width:'60%', minWidth:'200px', 
          maxWidth:'600px'}
const thermoTitleStyle={width:'30%', 'maxWidth':'300px', 'minWidth':'100px', 
          display:'inline-block'}
  
const SliderWithTooltip = createSliderWithTooltip(Slider);

class Thermo extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      tempeClass:'',
      sliderValue: this.props.temperature,
    };
  }
  
  onSliderChange = (sliderValue) => {
    this.setState({sliderValue});
  }

  onAfterChange = async (value) => {
    this.setState({tempeClass: 'blinkClass'})
    try {
      let ret=await thermoService(this.props.accessToken, this.props.seedId, 
            value)
      this.props.setTempe({'seedId':this.props.seedId, temperature:value})
    }catch(e){
      this.setState({sliderValue: this.props.temperature})
    }
    this.setState({tempeClass: ''})
  }

  render(){
    return (
      <div>
        <p/>
        <div style={thermoTitleStyle}>
          <span>Thermostat {this.props.name}:</span>
          <span className={this.state.tempeClass}> {this.props.temperature} </span>
        </div>
        <SliderWithTooltip value={this.state.sliderValue} 
              style={sliderStyle}
              min={minTempe} max={maxTempe}
              tipProps={{ overlayClassName: 'foo' }}
              trackStyle={[{ backgroundColor: 'red', height: 10 }]}
              railStyle={ {backgroundColor: '#82caff', height: 10 }}
              onChange={this.onSliderChange}
              onAfterChange={this.onAfterChange}
        />
      </div>
    );
  }
}

Thermo.propTypes = {
  seedId:PropTypes.string.isRequired,
};

const mapStateToProps = function(state, ownProps) {
  return {...state.loginReducer, 
      'temperature':
        state.thermoListReducer.thermos[ownProps.seedId].temperature,
    };
}

const mapDispatchToProps = function(dispatch) {
  return {
    setTempe: (seeds)=> {
      dispatch(setTempeDoneAction(seeds));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Thermo);