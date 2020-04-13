import { shallowMount } from '@vue/test-utils';

import { debounce } from 'lodash';
import { INITIAL_PAGE } from '@/constants';
import ItemsListComponent from './ItemsListComponent';

jest.mock('lodash');

const items = [
  { title: 'My title 1' },
  { title: 'My title 2', isFavorite: true },
];

const computed = {
  getItemsByFilters: () => () => (items),
  statusIsLoaded: () => () => false,
  filteredItems: () => (items),
};
const methods = {
  toggleFavoriteItem: jest.fn(),
  getItems: jest.fn(),
  debounceInput: jest.fn(),
};

describe('Given the ItemsList component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(ItemsListComponent, {
      computed,
      methods,
    });
  });

  describe('when the components is mounted', () => {
    it('should not break', () => {
      expect(wrapper).toBeDefined();
    });
  });
  describe('given pagesSize', () => {
    describe('when it called', () => {
      it('should be qual with filteredItems.length / itemsPerPage', () => {
        const expectedResult = Math.ceil(wrapper.vm.filteredItems.length / wrapper.vm.itemsPerPage);
        expect(wrapper.vm.pagesSize).toEqual(expectedResult);
      });
    });
    describe('when filteredItems has not length', () => {
      it('should return INITIAL_PAGE', () => {
        wrapper = shallowMount(ItemsListComponent, {
          computed: {
            ...computed,
            filteredItems: () => [],
          },
          methods,
        });
        expect(wrapper.vm.pagesSize).toEqual(INITIAL_PAGE);
      });
    });
  });
  describe('given paginatedItems', () => {
    describe('when we have a list of items', () => {
      it('should return an array with <= the length of itemsPerPage', () => {
        expect(wrapper.vm.paginatedItems.length + 1).toBeLessThanOrEqual(wrapper.vm.itemsPerPage);
      });
      it('should return an array', () => {
        expect(wrapper.vm.paginatedItems).toBeInstanceOf(Array);
      });
    });
  });
  describe('given favouriteList', () => {
    describe('when we have a list of items', () => {
      it('should return the favorites only', () => {
        wrapper = shallowMount(ItemsListComponent, {
          computed: {
            ...computed,
            filteredItems: () => items,
          },
          methods,
        });
        expect(wrapper.vm.favouriteList.length).toBe(1);
      });
    });
  });
  describe('given itemsByListType', () => {
    describe('when we have pagination enabled', () => {
      it('should return the paginatedItems', async () => {
        await wrapper.setProps({
          isPaginationEnabled: true,
        });
        expect(wrapper.vm.itemsByListType).toEqual(wrapper.vm.paginatedItems);
      });
    });
    describe('when we do not have pagination enabled', () => {
      it('should return the filteredItems', async () => {
        await wrapper.setProps({
          isPaginationEnabled: false,
        });
        expect(wrapper.vm.itemsByListType).toEqual(wrapper.vm.filteredItems);
      });
    });
    describe('given hidePreviousPageButton', () => {
      describe('when current page is equal 1', () => {
        it('should return true', async () => {
          wrapper.setData({
            currentPage: 1,
          });
          expect(wrapper.vm.hidePreviousPageButton).toBe(true);
        });
      });
    });
    describe('given hideNextPageButton', () => {
      describe('when current page called', () => {
        it('should return true if is equal to pagesSize', async () => {
          wrapper.setData({
            currentPage: 1,
          });
          expect(wrapper.vm.hideNextPageButton).toBe(true);
          wrapper.setData({
            currentPage: 2,
          });
          expect(wrapper.vm.hideNextPageButton).toBe(false);
        });
      });
    });
    describe('given onClickNextPageButton', () => {
      describe('when is called', () => {
        it('should return currentPage + 1', async () => {
          wrapper.setData({
            currentPage: 2,
          });
          wrapper.vm.onClickNextPageButton();
          expect(wrapper.vm.currentPage).toEqual(3);
        });
      });
    });
    describe('given onClickPreviousPageButton method', () => {
      describe('when is called', () => {
        it('should return currentPage - 1', async () => {
          wrapper.setData({
            currentPage: 2,
          });
          wrapper.vm.onClickPreviousPageButton();
          expect(wrapper.vm.currentPage).toEqual(1);
        });
      });
    });
    describe('given debounceInput', () => {
      describe('when is called', () => {
        it('should trigger debounce function', async () => {
          await wrapper.vm.debounceInput();
          expect(debounce).toHaveBeenCalled();
        });
      });
    });
    describe('given onClickFavoriteItem', () => {
      describe('when is called', () => {
        it('should trigger toggleFavoriteItem', () => {
          wrapper.vm.onClickFavoriteItem();
          expect(methods.toggleFavoriteItem).toHaveBeenCalled();
        });
      });
    });
  });
});

// todo: add units for UI
