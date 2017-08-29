import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { Singup } from './Singup';

if (Meteor.isClient) {
  describe('Singup', function () {

    it('it should show error messages', function () {
      const error = 'Error';
      const wrapper = shallow(<Singup createUser={() => {}} />);

      wrapper.setState({ error });

      expect(wrapper.find('p').text()).toBe(error);

      wrapper.setState({ error: '' });
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call createUser with the form data', function () {
      const email = 'test@test.com';
      const password = 'password123';
      const spy = expect.createSpy();
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Singup createUser={spy} />
        </MemoryRouter>
      );

      wrapper.find('[name="email"]').node.value = email;
      wrapper.find('[name="password"]').node.value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({ email, password });
    });

    it('should set error if short password', function () {
      const email = 'test@test.com';
      const password = 'pass';
      const spy = expect.createSpy();
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Singup createUser={spy} />
        </MemoryRouter>
      );

      const singup = wrapper.find(Singup).node;

      wrapper.find('[name="email"]').node.value = email;
      wrapper.find('[name="password"]').node.value = password;
      wrapper.find('form').simulate('submit');

      expect(singup.state['error'].length).toBeGreaterThan(0);
    });

    it('should set createUser callback errors', function () {
      const spy = expect.createSpy();
      const reason = 'Failed reason:';
      const password = 'password123';
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Singup createUser={spy} />
        </MemoryRouter>
      );

      const singup = wrapper.find(Singup).node;

      wrapper.find('[name="password"]').node.value = password;
      wrapper.find('form').simulate('submit');
            
      spy.calls[0].arguments[1]({reason});
      expect(singup.state['error']).toBe(reason);
  
      spy.calls[0].arguments[1]();
      expect(singup.state['error'].length).toBe(0);
      expect(spy).toHaveBeenCalled();
    });

  });
}