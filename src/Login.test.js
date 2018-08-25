import React from 'react';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
import { shallow, mount, render } from 'enzyme';

import Login from './Login.js'

describe("Login", () => {
  it("should encode login post", () => {
    /* moved to loginService.test.js
    let id='bob@bob.com'
    let pwd='hunter42'
    let post="{\"emailAddress\":\"bob@bob.com\",\"password\":\"LsRLB8LE3kQYWiTE7m83v+waSzoDdcJIGrc3nQhtD4M=\"}"
    let id1='joeyhuang1@gmail.com'

    function submit(){}
    const wrapper = shallow(<Login onSubmit={submit}/>);
    expect(wrapper.instance().getLoginPostData(id, pwd)).toEqual(post)
    expect(wrapper.instance().getLoginPostData(id1, pwd)).not.toEqual(post)
    */
  });
});

