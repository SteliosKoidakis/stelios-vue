import { shallowMount } from '@vue/test-utils';
import App from './App';

describe('App component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(App);
  });

  describe('Set up', () => {
    it('Is mounted', () => {
      expect(wrapper).toBeDefined();
    });
  });
});
