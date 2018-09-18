import React from 'react';
import thermoService from './thermoService.js'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import 'rc-slider/assets/index.css';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import {setTempeDoneAction} from './actions'

const minTempe=50
const maxTempe=90

  
const SliderWithTooltip = createSliderWithTooltip(Slider);

class Thermo extends React.PureComponent{
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
      await thermoService(this.props.accessToken, this.props.seedId, 
            value)
      this.props.setTempe({'seedId':this.props.seedId, temperature:value})
    }catch(e){
      this.setState({sliderValue: this.props.temperature})
    }
    this.setState({tempeClass: ''})
  }


  render(){
    //console.log(this.props.name+' thermo render '+this.props.temperature)
    return (
      <div className='thermoContainer'>
        <p/>
        <div className='thermoTitle' >
          <span>Thermostat {this.props.name}:</span>
          <span className={this.state.tempeClass}> {this.props.temperature} </span>
        </div>
        <SliderWithTooltip 
              className='thermoSlider' value={this.state.sliderValue} 
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
      'name':
        state.thermoListReducer.thermos[ownProps.seedId].name,
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