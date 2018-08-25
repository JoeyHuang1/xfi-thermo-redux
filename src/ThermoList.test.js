import React from 'react';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
import { shallow, mount, render } from 'enzyme';

import ThermoList from './ThermoList.js'
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

    let orggetThermoList= ThermoList.prototype.getThermoList
    let fnx=jest.spyOn(ThermoList.prototype, 'getThermoList')
        .mockImplementation(async function cb(){
          await orggetThermoList.apply(this)
          expect(wrapper.state().thermos.length).toEqual(2)
          global.fetch.mockRestore()
          fnx.mockRestore()
        })

    var wrapper = shallow(<ThermoList account={'test'}/>)
  })
 

  it("should handle /seeds exception", () => {
    global.fetch = jest.fn().mockImplementation(() => {
      var p = new Promise((resolve, reject) => {
        reject('fecth() exception test');
      });
  
      return p;
    });
    let orggetThermoList= ThermoList.prototype.getThermoList
    let fnx=jest.spyOn(ThermoList.prototype, 'getThermoList')
        .mockImplementation(async function cb(){
          await orggetThermoList.apply(this)
          expect(wrapper.state().thermos.length).toEqual(0)
          global.fetch.mockRestore()
          fnx.mockRestore()
        })

    var wrapper = shallow(<ThermoList account={'test'}/>)
  })

  it("should handle /seeds errors", () => {
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

    let orggetThermoList= ThermoList.prototype.getThermoList
    let fnx=jest.spyOn(ThermoList.prototype, 'getThermoList')
        .mockImplementation(async function cb(){
          await orggetThermoList.apply(this)
          expect(wrapper.state().thermos.length).toEqual(0)
          global.fetch.mockRestore()
          fnx.mockRestore()
        })

    var wrapper = shallow(<ThermoList account={'test'}/>)
  })

  
  it("should filter thermo", () => {
    let in1={fake:'123 '}
    let in2={}
    in2[ComcastConst.parent_type]=ComcastConst.parent_val
    
    let fnx=jest.spyOn(ThermoList.prototype, 'getThermoList')
        .mockImplementation(()=>{})
    const wrapper = shallow(<ThermoList account={'test'}/>)
    expect(fnx).toHaveBeenCalledTimes(1)

    expect(wrapper.instance().filterThermo(null)).toEqual([])
    expect(wrapper.instance().filterThermo({})).toEqual([])
    expect(wrapper.instance().filterThermo([{}])).toEqual([])
    expect(wrapper.instance().filterThermo([in1])).toEqual([])
    
    in2[ComcastConst.attribSetAttr]=[{}]
    expect(wrapper.instance().filterThermo([in2]).length).toEqual(0)

    in2[ComcastConst.attribSetAttr]=[{}]
    in2[ComcastConst.attribSetAttr][0]['abc']=ComcastConst.heat_mode
    expect(wrapper.instance().filterThermo([in2]).length).toEqual(0)

    in2[ComcastConst.attribSetAttr]=[{}]
    in2[ComcastConst.attribSetAttr][0][ComcastConst.hc_mode]=ComcastConst.cool_mode
    expect(wrapper.instance().filterThermo([in2]).length).toEqual(1)

    let in3={}
    in3[ComcastConst.parent_type]=ComcastConst.parent_val
    in3[ComcastConst.attribSetAttr]=[{}]
    in3[ComcastConst.attribSetAttr][0][ComcastConst.hc_mode]=ComcastConst.heat_mode
    expect(wrapper.instance().filterThermo([in2, in3]).length).toEqual(2)

    in3[ComcastConst.parent_type]='w1qUpEDz_100000'
    expect(wrapper.instance().filterThermo([in2, in3]).length).toEqual(1)

    in2[ComcastConst.attribSetAttr]=[{}]
    in2[ComcastConst.attribSetAttr][0][ComcastConst.hc_mode]='abc'
    expect(wrapper.instance().filterThermo([in2]).length).toEqual(0)
    fnx.mockRestore()
  });
});

