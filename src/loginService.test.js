import React from 'react';

/*
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { shallow, mount, render } from 'enzyme';
import Login from './Login.js'
*/

import {getLoginPostData} from'./loginService.js'

describe("Login", () => {
  it("should encode login post", () => {
    let id='bob@bob.com'
    let pwd='hunter42'
    let post="{\"emailAddress\":\"bob@bob.com\",\"password\":\"LsRLB8LE3kQYWiTE7m83v+waSzoDdcJIGrc3nQhtD4M=\"}"
    let id1='joeyhuang1@gmail.com'

    expect(getLoginPostData(id, pwd)).toEqual(post)
    expect(getLoginPostData(id1, pwd)).not.toEqual(post)
  });
});

