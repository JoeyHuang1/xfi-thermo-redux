import update from 'react-addons-update';
import thermoService from '../thermoService.js'
import { loop, Cmd } from 'redux-loop';

const thermoListReducer = function(state, action) {
  let newState=state
  if (state === undefined) {
    newState = {thermos:[]};
  }
  if (action.type === 'GET_SEEDS') {
    newState={...state, 'thermos':action.seeds};
  }

  if (action.type === 'SET_TEMPE') {
    let seedIdAttr =action.seed.seedId
    let oldTempe=state.thermos[seedIdAttr].temperature, 
      newTempe=action.seed.temperature
    let newVal={'thermos':{}}
    newVal.thermos[seedIdAttr]={'temperature':{$set: action.seed.temperature},
        isChanging:{$set: true}
    }
    newState=update(state, newVal);

    return loop(
      newState,
      Cmd.run(async ()=>{
          await thermoService(action.seed.seedId, action.seed.temperature)
        }, 
        {
          successActionCreator: ()=>{
            console.log('set tempe ok')
            return {
              type: 'SET_TEMPE_DONE',
              seed: {seedId:action.seed.seedId, 'temperature': newTempe}
            }
          },
          failActionCreator: ()=>{
            console.log('set tempe fail')
            return {
              type: 'SET_TEMPE_DONE',
              seed:{seedId:action.seed.seedId, 'temperature': oldTempe}
            }
          },
      })
    );
  }

  if ('SET_TEMPE_DONE'===action.type){
    let seedIdAttr =action.seed.seedId
    let newVal={'thermos':{}}
    newVal.thermos[seedIdAttr]={'temperature':{$set: action.seed.temperature},
        isChanging:{$set: false}
    }
    newState=update(state, newVal);
  }

  return newState;
}

export default thermoListReducer