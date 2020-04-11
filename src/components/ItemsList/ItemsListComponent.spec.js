import { shallowMount } from '@vue/test-utils';

import { isArray } from 'lodash';

import { INITIAL_PAGE } from '@/constants';
import ItemsListComponent from './ItemsListComponent';

const items = [
  { title: 'My title 1' },
  { title: 'My title 2', isFavorite: true },
];

const computed = {
  getItemsByFilters: () => () => (items),
};
const methods = {
  toggleFavoriteItem: jest.fn(),
  getFilteredItems: jest.fn(),
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
        wrapper.setData({
          filteredItems: items,
        });
        const expectedResult = Math.ceil(wrapper.vm.filteredItems.length / wrapper.vm.itemsPerPage);
        expect(wrapper.vm.pagesSize).toEqual(expectedResult);
      });
    });
    describe('when filteredItems has not rength', () => {
      it('should return INITIAL_PAGE', () => {
        wrapper.setData({
          filteredItems: [],
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
        expect(isArray(wrapper.vm.paginatedItems)).toBe(true);
      });
    });
  });
  describe('given favouriteList', () => {
    describe('when we have a list of items', () => {
      it('should return the favorites only', () => {
        wrapper.setData({
          filteredItems: items,
        });
        expect(wrapper.vm.favouriteList.length).toBe(1);
      });
    });
  });
  describe('given finalItems', () => {
    describe('when we have pagination enabled', () => {
      it('should return the paginatedItems', async () => {
        await wrapper.setProps({
          isPaginationEnabled: true,
        });
        expect(wrapper.vm.finalItems).toEqual(wrapper.vm.paginatedItems);
      });
    });
    describe('when we do not have pagination enabled', () => {
      it('should return the filteredItems', async () => {
        await wrapper.setProps({
          isPaginationEnabled: false,
        });
        expect(wrapper.vm.finalItems).toEqual(wrapper.vm.filteredItems);
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
    describe('given searchText watcher', () => {
      describe('when searchText change', () => {
        it('should set current page equal to 1', async () => {
          wrapper.setData({
            currentPage: 2,
          });
          expect(wrapper.vm.currentPage).toEqual(2);
          await wrapper.setData({
            searchText: 'Test',
          });
          expect(wrapper.vm.currentPage).toEqual(1);
        });
        it('should trigger getFilteredItems method', async () => {
          await wrapper.setData({
            currentPage: 2,
          });
          expect(methods.getFilteredItems).toHaveBeenCalled();
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
    describe('given onClickFavoriteItem', () => {
      describe('when is called', () => {
        it('should triggert toggleFavoriteItem with getFilteredItems', () => {
          wrapper.vm.onClickFavoriteItem();
          expect(methods.toggleFavoriteItem).toHaveBeenCalled();
          expect(methods.getFilteredItems).toHaveBeenCalled();
        });
      });
    });
  });
});

// todo: add units for UI
