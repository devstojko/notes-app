import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

it('React application handles routing correctly', () => {
  const wrapper = shallow(
    <BrowserRouter>
      <Switch>
        <Route path="/" component={() => <div>Home</div>} />
      </Switch>
    </BrowserRouter>
  );
  expect(wrapper.find('div').text()).to.equal('Home');
});