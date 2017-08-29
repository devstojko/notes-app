import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { Login } from './Login';

if (Meteor.isClient) {
  describe('Login', function () {

    it('it should show error messages', function () {
      const error = 'Error';
      const wrapper = shallow(<Login loginWithPassword={() => {}} />);

      wrapper.setState({ error });

      expect(wrapper.find('p').text()).toBe(error);

      wrapper.setState({ error: '' });
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call loginWithPassword with the form data', function () {
      const email = 'test@test.com';
      const password = 'password123';
      const spy = expect.createSpy();
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Login loginWithPassword={spy} />
        </MemoryRouter>
      );

      wrapper.find('[name="email"]').node.value = email;
      wrapper.find('[name="password"]').node.value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({ email });
      expect(spy.calls[0].arguments[1]).toBe(password);
    });

    it('should set loginWithPassword callback errors', function () {
      const spy = expect.createSpy();
      const error = 'Error';
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Login loginWithPassword={spy} />
        </MemoryRouter>
      );

      const login = wrapper.find(Login).node;
      
      // .state() belongs to wrapper (the root) so it will not work with the const "login".
      // It doesn't matter, you've just declared 'login' as the Login component node, so now with it you have access
      // to all of Login's objects!
      // The state inside "login" is an array and you can get the values as such:
      
      expect(login.state['error'].length).toBe(0); 
      login.setState({ error }); // <- you also get access to .setState()!
  
      // I think the following 2 lines are the ones that caused your error.
      // Try to use .text() in the following fashion:    
      const errorElement = wrapper.find('p'); // First, get the element.
      expect(errorElement.text()).toBe(error); // Then get its text.
  
      login.setState({ error: '' });
      expect(wrapper.find('p').length).toBe(0);
    });

  });
}