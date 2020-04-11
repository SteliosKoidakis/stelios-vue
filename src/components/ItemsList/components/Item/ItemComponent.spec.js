import { shallowMount } from '@vue/test-utils';
import { BButton } from 'bootstrap-vue';

import ItemComponent from './ItemComponent';

const propsData = {
  image: 'image',
  title: 'title',
  description: 'description',
  price: 'price',
  email: 'email',
};

describe('Given the ItemsList component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(ItemComponent, {
      propsData,
    });
  });

  describe('when the components is mounted', () => {
    it('should not break', () => {
      expect(wrapper).toBeDefined();
    });
    it('should render BButton component', () => {
      expect(wrapper.find(BButton).exists()).toBe(true);
    });
  });
  describe('when props pass', () => {
    it('should render the correct output', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });
  describe('when props isFavorite is true', () => {
    it('should render Bbutton with success variant and Unlike text', async () => {
      await wrapper.setProps({
        isFavorite: true,
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
