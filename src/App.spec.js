import { shallowMount } from '@vue/test-utils';

import App from './App';

import DashboardView from './views/Dashboard/DashboardView';

describe('Given the App component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(App);
  });

  describe('when the components is mounted', () => {
    it('should not break', () => {
      expect(wrapper).toBeDefined();
    });
    it('should render the DashboardView component', () => {
      expect(wrapper.find(DashboardView).exists()).toBe(true);
    });
  });
});
