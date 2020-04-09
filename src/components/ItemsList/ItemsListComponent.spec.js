import { shallowMount } from '@vue/test-utils';

import ItemsListComponent from './ItemsListComponent';

const computed = {
  items: () => ([]),
};

describe('Given the Dashboard component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(ItemsListComponent, {
      computed,
    });
  });

  describe('when the components is mounted', () => {
    it('should not break', () => {
      expect(wrapper).toBeDefined();
    });
  });
});
