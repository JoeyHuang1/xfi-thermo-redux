import React from 'react';

/*
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { shallow, mount, render } from 'enzyme';
*/

import thermoListService, {filterThermo} from './thermoListService.js'
import ComcastConst from './ComcastConst.js'


describe("ThermoList", () => {
  it("should handle /seeds return", async () => {
    let in3={seedId:'123'}
    in3[ComcastConst.parent_type]=ComcastConst.parent_val
    in3[ComcastConst.attribSetAttr]=[{}]
    in3[ComcastConst.attribSetAttr][0][ComcastConst.hc_mode]=ComcastConst.heat_mode

    global.fetch = jest.fn().mockImplementation(() => {
      var p = new Promise((resolve, reject) => {
        resolve({
          ok: true, 
          status:200,
          json: function() { 
            return {seeds:[in3, in3]}
          }
        });
      });
  
      return p;
    });

    let thermos = await thermoListService()
    expect(thermos.length).toEqual(2)
    global.fetch.mockRestore()
  })
 

  it("should handle /seeds exception", async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      var p = new Promise((resolve, reject) => {
        reject('fecth() exception test');
      });
  
      return p;
    });
    let thermos = await thermoListService()
    expect(thermos.length).toEqual(0)
    global.fetch.mockRestore()
  })

  it("should handle /seeds errors", async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      var p = new Promise((resolve, reject) => {
        resolve({
          ok: false, 
          status:401,
          Id: '123', 
          json: function() { 
            return {Id: '123'}
          }
        });
      });

      return p;
    });

    let thermos = await thermoListService()
    expect(thermos.length).toEqual(0)
    global.fetch.mockRestore()
  })

  
  it("should filter thermo", () => {
    let in1={fake:'123 '}
    let in2={}
    in2[ComcastConst.parent_type]=ComcastConst.parent_val
    
    expect(filterThermo(null)).toEqual([])
    expect(filterThermo({})).toEqual([])
    expect(filterThermo([{}])).toEqual([])
    expect(filterThermo([in1])).toEqual([])
    
    in2[ComcastConst.attribSetAttr]=[{}]
    expect(filterThermo([in2]).length).toEqual(0)

    in2[ComcastConst.attribSetAttr]=[{}]
    in2[ComcastConst.attribSetAttr][0]['abc']=ComcastConst.heat_mode
    expect(filterThermo([in2]).length).toEqual(0)

    in2[ComcastConst.attribSetAttr]=[{}]
    in2[ComcastConst.attribSetAttr][0][ComcastConst.hc_mode]=ComcastConst.cool_mode
    expect(filterThermo([in2]).length).toEqual(1)

    let in3={}
    in3[ComcastConst.parent_type]=ComcastConst.parent_val
    in3[ComcastConst.attribSetAttr]=[{}]
    in3[ComcastConst.attribSetAttr][0][ComcastConst.hc_mode]=ComcastConst.heat_mode
    expect(filterThermo([in2, in3]).length).toEqual(2)

    in3[ComcastConst.parent_type]='w1qUpEDz_100000'
    expect(filterThermo([in2, in3]).length).toEqual(1)

    in2[ComcastConst.attribSetAttr]=[{}]
    in2[ComcastConst.attribSetAttr][0][ComcastConst.hc_mode]='abc'
    expect(filterThermo([in2]).length).toEqual(0)
  });
});

