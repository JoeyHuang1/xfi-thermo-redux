import 'rc-slider/assets/index.css';

import React from 'react';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {setTempeAction} from './actions'

const minTempe=50
const maxTempe=90
const sliderStyle={display:'inline-block', width:'60%', minWidth:'200px', maxWidth:'600px'}

const SliderWithTooltip = createSliderWithTooltip(Slider);

class ThermoSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.value===this.state.value && this.props.value!==this.state.value){
      this.setState({value:this.props.value})
    }
  }

  onSliderChange = (value) => {
    this.setState({value});
  }
  
  onAfterChange = (value) => {
    this.props.setTempe({accessToken:this.props.accessToken,
      'seedId':this.props.seedId, 'temperature':value})
  }

  render() {
    return (
        <SliderWithTooltip value={this.state.value} style={sliderStyle}
            min={minTempe} max={maxTempe}
            tipProps={{ overlayClassName: 'foo' }}
            trackStyle={[{ backgroundColor: 'red', height: 10 }]}
            railStyle={ {backgroundColor: '#82caff', height: 10 }}
            onChange={this.onSliderChange} onAfterChange={this.onAfterChange}
        />
    );
  }
}

ThermoSlider.propTypes = {
  seedId: PropTypes.string.isRequired
};

const mapStateToProps = function(state, ownProps) {
  return {...state.loginReducer, 
      'value':state.thermoListReducer.thermos[ownProps.seedId].temperature};
}

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    setTempe: (seeds)=> {
      dispatch(setTempeAction(seeds));
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThermoSlider);

