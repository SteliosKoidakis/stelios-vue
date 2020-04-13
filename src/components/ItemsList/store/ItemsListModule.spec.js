import axios from 'axios';
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

jest.mock('axios');

describe('Given ItemsListModule', () => {
  const {
    state,
    mutations,
    getters,
    actions,
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
    isLoaded: true,
  };
  const text = 'test';
  const searchableFields = ['title'];
  const mockInitialState = {
    items: [],
    isLoaded: false,
  };

  const commit = jest.fn();

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
  describe('given toggleFavorite mutation', () => {
    describe('when an index as a parameter', () => {
      it('should toggle the isFavorite correct', () => {
        const mockItems = [{
          title: 'test',
          isFavorite: false,
        }];
        mutations.toggleFavorite(stateWithItems, 0);
        expect(stateWithItems.items[0].isFavorite).toEqual(!mockItems[0].isFavorite);
      });
    });
    describe('when an unexpected parameter pass', () => {
      it('should return the same state items', () => {
        const itemsBefore = stateWithItems.items;
        mutations.toggleFavorite(stateWithItems, {});
        expect(stateWithItems.items).toMatchObject(itemsBefore);
        mutations.toggleFavorite(stateWithItems, []);
        expect(stateWithItems.items).toMatchObject(itemsBefore);
      });
    });
  });
  describe('given setLoadedStatus mutation', () => {
    describe('when a boolean value passes', () => {
      it('should update state correct', () => {
        mutations.setLoadedStatus(stateWithItems, true);
        expect(stateWithItems.isLoaded).toEqual(true);
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
  describe('given getItems action', () => {
    describe('when is called and axios', () => {
      it('should trigger commit with setItems and response.items on success', async () => {
        const response = {
          data: {
            items: [{ title: 'title' }],
          },
        };
        axios.get.mockImplementationOnce(() => Promise.resolve(response));

        await actions.getItems({
          commit,
        });

        expect(commit).toHaveBeenCalledWith('setItems', response.data.items);
        expect(commit).toHaveBeenNthCalledWith(2, 'setLoadedStatus', true);
      });
      it('should trigger commit with setItems and [] on error', async () => {
        axios.get.mockImplementationOnce(() => Promise.reject(new Error()));

        await actions.getItems({
          commit,
        });

        expect(commit).toHaveBeenNthCalledWith(1, 'setItems', []);
        expect(commit).toHaveBeenNthCalledWith(2, 'setLoadedStatus', false);
      });
    });
  });
  describe('given toggleFavoriteItem action', () => {
    describe('when a id pass', () => {
      it('should trigger commit with toggleFavorite and correct index', () => {
        const expectedIndex = 1;
        const id = stateWithItems.items[expectedIndex].title;
        actions.toggleFavoriteItem({
          state: stateWithItems,
          commit,
        }, id);

        expect(commit).toHaveBeenCalled();
        expect(commit).toHaveBeenCalledWith('toggleFavorite', expectedIndex);
      });
    });
  });
});
