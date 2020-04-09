import { shallowMount } from '@vue/test-utils';

import { BContainer, BRow } from 'bootstrap-vue';

import { ItemsListComponent } from '@/components';
import Dashboard from './DashboardView';

const methods = {
  getItems: () => [],
};
describe('Given the Dashboard component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Dashboard, {
      methods,
    });
  });

  describe('when the components is mounted', () => {
    it('should not break', () => {
      expect(wrapper).toBeDefined();
    });
    it('should render a BContainer component', () => {
      expect(wrapper.findAll(BContainer).length).toBe(1);
    });
    it('should render 2 BRow component', () => {
      expect(wrapper.findAll(BRow).length).toBe(2);
    });
    it('should render the ItemsListComponent component', () => {
      expect(wrapper.find(ItemsListComponent).exists()).toBe(true);
    });
  });
});
