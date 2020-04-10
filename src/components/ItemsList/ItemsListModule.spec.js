import {
  checkSearchResultByType,
  getObjectByDirection,
  sortNumber,
  sortString,
} from '@/utils';

import ItemsListModule from './ItemsListModule';

jest.mock('@/utils', () => ({
  checkSearchResultByType: jest.fn(() => []),
  getObjectByDirection: jest.fn(),
  sortString: jest.fn(),
  sortNumber: jest.fn(),
}));

describe('Given ItemsListModule', () => {
  const {
    state,
    mutations,
    getters,
  } = ItemsListModule;

  const stateWithItems = {
    items: [{
      title: 'test',
      price: '1',
    },
    {
      title: 'test1',
      price: '2',
    }],
  };
  const text = 'test';
  const searchableFields = ['title'];
  const mockInitialState = {
    items: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when we initialize the module', () => {
    it('should have the correct state', () => {
      expect(state).toEqual(mockInitialState);
    });
  });
  describe('given setItems mutation', () => {
    describe('when an array pass as a parameter', () => {
      it('should mutate correct the state', () => {
        const mockItems = [{
          title: 'test',
        }];
        mutations.setItems(state, mockItems);
        expect(state.items).toEqual(mockItems);
      });
    });
    describe('when an none array parameter pass', () => {
      it('should mutate the state with an empty array', () => {
        mutations.setItems(state, 'test');
        expect(state.items).toEqual([]);
      });
    });
  });
  describe('given getItemsByFilters getter', () => {
    describe('when a string text and an array of searchableFields pass', () => {
      it('should trigger checkSearchResultByType', () => {
        getters.getItemsByFilters(stateWithItems)({ text, searchableFields });

        expect(checkSearchResultByType).toHaveBeenCalled();
      });
      it('should trigger checkSearchResultByType for state.lenth times', () => {
        getters.getItemsByFilters(stateWithItems)({ text, searchableFields });

        expect(checkSearchResultByType).toHaveBeenCalledTimes(stateWithItems.items.length);
      });
      it('should filter the array items', () => {
        jest.spyOn(Array.prototype, 'filter');

        getters.getItemsByFilters(stateWithItems)({ text, searchableFields });

        expect(Array.prototype.filter).toHaveBeenCalled();
      });
    });
    describe('when sortBy is equal price', () => {
      it('should trigger sortNumber', () => {
        const sortBy = 'price';
        getters.getItemsByFilters(stateWithItems)({ text, searchableFields, sortBy });

        expect(sortNumber).toHaveBeenCalled();
        expect(sortNumber).toHaveBeenCalledWith(getObjectByDirection({
          isDescSortDirection: false,
          currentItem: expect.anything(),
          nextItem: expect.anything(),
        }));
      });
    });
    describe('when sortBy is not  price', () => {
      it('should trigger sortString', () => {
        const sortBy = 'email';
        getters.getItemsByFilters(stateWithItems)({
          text,
          searchableFields,
          sortBy,
          sortDirection: 'DESC',
        });

        expect(sortString).toHaveBeenCalled();
        expect(sortString).toHaveBeenCalledWith(getObjectByDirection({
          isDescSortDirection: true,
          currentItem: expect.anything(),
          nextItem: expect.anything(),
        }));
      });
    });
    describe('when we pass unexpected params', () => {
      it('should not break', () => {
        getters.getItemsByFilters(stateWithItems)({
          text: {},
          searchableFields: 1,
          sortBy: [],
          sortDirection: [undefined],
        });
      });
    });
  });
});
